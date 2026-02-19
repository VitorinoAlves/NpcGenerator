import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { generateObject, generateImage, generateText   } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';
import fs from 'node:fs';

const app = express();
app.use(express.json());
app.use(cors());

const googleProvider = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});
const imageModel = googleProvider.image('imagen-3.0-generate-001');

const npcOutputSchema = z.object({
    name: z.string(),
    title: z.string(),
    lore: z.object({
        past: z.string(),
        motivation: z.string(),
        secret: z.string(),
    }),
    attributes: z.array(z.object({ label: z.string(), value: z.string() })),
    imagePrompt: z.string(),
    personalityTraits: z.array(z.string()),
});

app.post('/api/generate-npc', async (req, res) => {
    try {
        const formData = req.body;

        const { object } = await generateObject({
            model: googleProvider('gemini-2.5-flash'),
            schema: npcOutputSchema,
            system: `Você é um mestre de RPG veterano. 
            Sua missão é criar NPCs memoráveis e imersivos. 
            Adapte a linguagem e os atributos para o sistema: ${formData.system}.`,
            prompt: `Gere um NPC completo: 
                Nome: ${formData.name}, 
                Raça: ${formData.race}, 
                Classe: ${formData.classOrSect}, 
                Tom da Narrativa: ${formData.tone}. 
                Detalhes: ${formData.physicalDescription || 'Criativo'}
                No campo imagePrompt, escreva uma descrição visual detalhada em inglês, focando no estilo de arte 'Fantasy Digital Art' ou 'Cinematic Lighting'..`,
        });

        return res.json(object);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao invocar o oráculo." });
    }
});

app.post('/api/generate-image', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "O prompt é obrigatório." });
        }

        const { image } = await generateText({
            model: googleProvider('gemini-2.5-flash-image'),
            prompt: prompt
        });

        // O SDK retorna a imagem em formato base64 ou uint8Array
        return res.json({ 
            image: image.base64, 
            mimeType: "image/png" 
        });

    } catch (error) {
        console.error("Erro ao gerar imagem:", error);
        res.status(500).json({ error: "O oráculo visual falhou." });
    }
});

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));