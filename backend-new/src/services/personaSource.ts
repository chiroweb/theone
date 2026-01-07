import fs from 'fs/promises';
import path from 'path';
import { INSIGHT_ANALYST_PERSONA as DEFAULT_PERSONA } from '../config/persona';

const DATA_DIR = path.join(process.cwd(), 'data');
const PERSONA_FILE = path.join(DATA_DIR, 'persona.json');

export async function getPersona(): Promise<string> {
    try {
        const data = await fs.readFile(PERSONA_FILE, 'utf-8');
        const json = JSON.parse(data);
        return json.persona || DEFAULT_PERSONA;
    } catch (error) {
        return DEFAULT_PERSONA;
    }
}

export async function updatePersona(newPersona: string): Promise<void> {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(PERSONA_FILE, JSON.stringify({ persona: newPersona }, null, 2), 'utf-8');
    } catch (error) {
        console.error('Failed to save persona:', error);
        throw error;
    }
}
