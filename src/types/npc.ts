export type Race = 'Humano' | 'Elfo' | 'Anão' | 'Orc' | 'Tiefling';
export type Class = 'Guerreiro' | 'Mago' | 'Ladino' | 'Clérigo' | 'Bardo';

export interface NPC {
    id: string;
    name: string;
    race: string;
    charClass: string;
    level: number;
    stats: string;
    lore: string;
    appearance: string;
    imageUrl?: string;
}