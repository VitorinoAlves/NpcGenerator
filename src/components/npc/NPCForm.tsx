import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield, Sparkles, User, BookType, Ghost, Search } from "lucide-react";
import { npcFormSchema, type NPCFormData } from "../../schemas/npcFormSchema";
import { generateNPCData } from "../../services/aiService";

export function NPCForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<NPCFormData>({
        resolver: zodResolver(npcFormSchema),
    });

    const onSubmit = async (data: NPCFormData) => {
        console.log("Dados enviados para a IA:", data);
        try{
            const npcResult = await generateNPCData(data);

            // 2. Salva o resultado no estado global (Zustand) para exibir no Card
            // useNPCStore.getState().setCurrentNPC(npcResult);

            console.log("NPC Gerado com Sucesso:", npcResult);
        } catch (error) {
            console.error("Erro ao gerar NPC:", error);
            alert("O oráculo falhou. Tente novamente!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 p-5 max-w-lg mx-auto w-full bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800 shadow-2xl"
        >
            <header className="mb-2">
                <h2 className="text-2xl font-bold text-amber-500 flex items-center gap-2">
                    <Sparkles size={24} className="animate-pulse" /> Gerador Universal de NPCs
                </h2>
                <p className="text-slate-400 text-sm">
                    Preencha os dados para a IA forjar o seu personagem.
                </p>
            </header>

            {/* Grid para inputs menores em Desktop / Coluna única em Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Nome
                    </label>
                    <div className="relative">
                        <input
                            {...register("name")}
                            placeholder="Ex: Alistair"
                            className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-white transition-all"
                        />
                        <User
                            className="absolute left-3 top-3.5 text-slate-500"
                            size={18}
                        />
                    </div>
                    {errors.name && (<span className="text-red-400 text-xs">{errors.name.message}</span>)}
                </div>

                {/* Sistema de RPG */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Sistema de RPG
                    </label>
                    <div className="relative">
                        <input
                            {...register("system")}
                            placeholder="Ex: D&D 5e, Tormenta20"
                            className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-white transition-all"
                        />
                        <BookType
                            className="absolute left-3 top-3.5 text-slate-500"
                            size={18}
                        />
                    </div>
                    {errors.system && (<span className="text-red-400 text-xs">{errors.system.message}</span>)}
                </div>
            </div>

            {/* Raça e Classe/Secto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Raça
                    </label>
                    <input
                        {...register("race")}
                        placeholder="Ex: Tiefling, Ciborgue"
                        className="w-full bg-slate-800/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-white"
                    />
                    {errors.race && (<span className="text-red-400 text-xs">{errors.race.message}</span>)}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Classe ou Secto
                    </label>
                    <input
                        {...register("classOrSect")}
                        placeholder="Ex: Paladino, Tremere"
                        className="w-full bg-slate-800/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-white"
                    />
                    {errors.classOrSect && (<span className="text-red-400 text-xs">{errors.classOrSect.message}</span>)}
                </div>
            </div>

            {/* Tom da História */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Tom da História
                </label>
                <div className="relative">
                    <input
                        {...register("tone")}
                        placeholder="Ex: Horror Cósmico, Comédia Pastelão"
                        className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-white"
                    />
                    <Ghost className="absolute left-3 top-3.5 text-slate-500" size={18} />
                </div>
                {errors.tone && (<span className="text-red-400 text-xs">{errors.tone.message}</span>)}
            </div>

            {/* Descrição Física (Opcional) */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Descrição Física (Opcional)
                </label>
                <textarea
                    {...register("physicalDescription")}
                    placeholder="Ex: Cicatriz no olho, usa roupas luxuosas, cheira a enxofre..."
                    className="bg-slate-800/50 border border-slate-700 text-white p-3 rounded-xl h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black py-4 rounded-xl transition-all active:scale-95 disabled:opacity-50 mt-2 flex items-center justify-center gap-2 shadow-xl"
                >
                <Search size={20} />
                {isSubmitting ? "CONVOCANDO IA..." : "FORJAR NPC"}
            </button>
        </form>
    );
}
