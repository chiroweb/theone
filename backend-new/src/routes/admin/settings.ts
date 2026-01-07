import { Hono } from 'hono';
import { getPersona, updatePersona } from '../../services/personaSource';

const settingsRouter = new Hono();

// Get Current Persona
settingsRouter.get('/persona', async (c) => {
    const persona = await getPersona();
    return c.json({ persona });
});

// Update Persona
settingsRouter.post('/persona', async (c) => {
    try {
        const body = await c.req.json();
        const { persona } = body;

        if (!persona || typeof persona !== 'string') {
            return c.json({ error: 'Invalid persona content' }, 400);
        }

        await updatePersona(persona);
        return c.json({ success: true, persona });
    } catch (error) {
        return c.json({ error: 'Failed to update persona' }, 500);
    }
});

export default settingsRouter;
