import type { NPCFormData } from '../schemas/npcFormSchema';

const API_BASE_URL = 'http://localhost:3001/api';

export async function generateNPCData(formData: NPCFormData) {
    const response = await fetch(`${API_BASE_URL}/generate-npc`, {
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

export async function generateNPCImage(imagePrompt: string) {
    const response = await fetch(`${API_BASE_URL}/generate-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imagePrompt }),
    });

    if (!response.ok) throw new Error('Falha ao gerar imagem do NPC');
    const data = await response.json();
    return data.url; // Retorna a string Base64 ou URL
}

