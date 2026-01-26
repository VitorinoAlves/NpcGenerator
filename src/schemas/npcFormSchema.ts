import { z } from "zod";

export const npcFormSchema = z.object ({
    name: z.string().optional(),
    system: z.string().min(2, "Informe o sistema (ex: D&D, Vampiro, Call of Cthulhu)"),
    tone: z.string().min(3, "Descreva o tom (ex: Sombrio, Épico, Investigativo)"),
    race: z.string().min(2, "Informe a raça ou espécie"),
    classOrSect: z.string().min(2, "Informe a classe, ocupação ou seita"),
    physicalDescription: z.string().optional(),
});

export type NPCFormData = z.infer<typeof npcFormSchema>;