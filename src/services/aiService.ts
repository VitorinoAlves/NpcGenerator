import type { NPCFormData } from '../schemas/npcFormSchema';

export async function generateNPCData(formData: NPCFormData) {
    const response = await fetch('http://localhost:3001/api/generate-npc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('Falha na comunicação com o servidor');
    }

    return response.json();
}