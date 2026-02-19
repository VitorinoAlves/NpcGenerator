import { useState } from 'react';
import { useNPCStore } from '../../store/useNPCStore';
import { Shield, BookOpen, Brain, Sparkles, Copy, Share2, Image as ImageIcon, Loader2} from 'lucide-react';
import { generateNPCImage } from '../../services/aiService';

export function NPCCard() {
  const { 
    currentNPC, 
    isLoading, 
    npcImage, 
    isGeneratingImage, 
    setNPCImage, 
    setGeneratingImage 
  } = useNPCStore();
  const [activeTab, setActiveTab] = useState<'lore' | 'stats'>('lore');

  const handleGenerateImage = async () => {
    if (!currentNPC?.imagePrompt) return;

    try {
      setGeneratingImage(true);
      
      const imageUrl = await generateNPCImage(currentNPC.imagePrompt);
      setNPCImage(imageUrl);
    } catch (error) {
      console.error("Erro ao invocar o oráculo visual:", error);
      alert("Falha ao gerar o retrato. Tente novamente.");
    } finally {
      setGeneratingImage(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto animate-pulse bg-slate-800 h-[500px] rounded-3xl mt-6 border border-slate-700" />
    );
  }

  if (!currentNPC) return null;

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 border border-amber-900/30 rounded-3xl overflow-hidden shadow-2xl mt-6 transition-all">
      
      {/* 1. Header com Imagem ou Botão de Geração */}
      <div className="relative h-72 bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800">
        {npcImage ? (
          <img 
            src={npcImage} 
            alt="NPC Portrait" 
            className="w-full h-full object-cover animate-in fade-in duration-1000" 
          />
        ) : (
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            {isGeneratingImage ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="text-amber-500 animate-spin" size={40} />
                <p className="text-amber-500 font-bold text-xs tracking-[0.2em] animate-pulse">
                  DESENHANDO RETRATO...
                </p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-amber-500/5 flex items-center justify-center border border-amber-500/20">
                  <ImageIcon className="text-amber-500/40" size={32} />
                </div>
                <button
                  onClick={handleGenerateImage}
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-slate-950 px-6 py-2.5 rounded-full font-black text-xs transition-all active:scale-95 shadow-lg shadow-amber-900/20"
                >
                  <Sparkles size={16} /> GERAR IMAGEM
                </button>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider">
                  Usa o Nano Banana para visualizar o NPC
                </p>
              </>
            )}
          </div>
        )}

        {/* Overlay com Nome e Título (Sempre visível sobre a imagem/fundo) */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent">
          <h2 className="text-3xl font-black text-white leading-tight">{currentNPC.name}</h2>
          <p className="text-amber-500 font-medium italic text-sm">{currentNPC.title}</p>
        </div>
      </div>

      {/* 2. Seleção de Abas (Mobile Friendly) */}
      <div className="flex border-b border-slate-800">
        <button 
          onClick={() => setActiveTab('lore')}
          className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'lore' ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-500/5' : 'text-slate-500'}`}
        >
          <BookOpen size={18} /> HISTÓRIA
        </button>
        <button 
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'stats' ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-500/5' : 'text-slate-500'}`}
        >
          <Shield size={18} /> ATRIBUTOS
        </button>
      </div>

      {/* 3. Conteúdo das Abas */}
      <div className="p-6 min-h-[300px]">
        {activeTab === 'lore' ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Passado</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{currentNPC.lore.past}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Motivação</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{currentNPC.lore.motivation}</p>
            </div>
            <div className="p-3 bg-red-900/10 border border-red-900/20 rounded-lg">
              <h4 className="text-xs font-bold text-red-500 uppercase mb-1 flex items-center gap-1">
                <Brain size={12} /> Segredo Obscuro
              </h4>
              <p className="text-red-200/80 text-sm italic">"{currentNPC.lore.secret}"</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2">
            {currentNPC.attributes.map((attr: any, i: number) => (
              <div key={i} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-center">
                <span className="block text-[10px] text-slate-500 uppercase font-bold">{attr.label}</span>
                <span className="text-xl font-black text-amber-500">{attr.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Footer de Ações */}
      <div className="p-4 bg-slate-950/50 flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-3 rounded-xl transition-colors">
          <Copy size={16} /> COPIAR
        </button>
        <button className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
}