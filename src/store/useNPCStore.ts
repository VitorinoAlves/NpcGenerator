import { create } from 'zustand';

interface NPCStore {
    // Dados do NPC
    currentNPC: any | null;
    npcImage: string | null;
    // Estados de Carregamento
    isLoading: boolean;           // Para a geração do texto (Gemini)
    isGeneratingImage: boolean;   // Para a geração da imagem (Nano Banana)
    // Ações
    setCurrentNPC: (npc: any) => void;
    setNPCImage: (url: string | null) => void;
    setIsLoading: (loading: boolean) => void;
    setGeneratingImage: (loading: boolean) => void;
    resetStore: () => void; // Útil para quando quiser criar um novo do zero
}

export const useNPCStore = create<NPCStore>((set) => ({
    currentNPC: null,
    npcImage: null,
    isLoading: false,
    isGeneratingImage: false,

    // Define o NPC e limpa o loading de texto
    setCurrentNPC: (npc) => set({ 
        currentNPC: npc, 
        isLoading: false,
        npcImage: null // Limpa a imagem do NPC anterior ao gerar um novo
    }),

    // Define a imagem e limpa o loading de imagem
    setNPCImage: (url) => set({ 
        npcImage: url, 
        isGeneratingImage: false 
    }),

    setIsLoading: (loading) => set({ isLoading: loading }),

    setGeneratingImage: (loading) => set({ isGeneratingImage: loading }),

    // Reseta todo o estado (útil para o botão "Criar Outro")
    resetStore: () => set({ 
        currentNPC: null, 
        npcImage: null, 
        isLoading: false, 
        isGeneratingImage: false 
    }),
}));