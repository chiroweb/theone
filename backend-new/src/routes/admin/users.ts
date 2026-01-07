import { Hono } from 'hono';
import { db } from '../../db';
import { users } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';

const app = new Hono();

// List Users
app.get('/', async (c) => {
    const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));
    return c.json({ data: allUsers });
});

// Get User Detail
app.get('/:id', async (c) => {
    const id = c.req.param('id');
    const [user] = await db.select().from(users).where(eq(users.id, id));

    if (!user) {
        return c.json({ error: 'User not found' }, 404);
    }

    return c.json({ data: user });
});

// Update User Tier
app.patch('/:id/tier', async (c) => {
    const id = c.req.param('id');
    const { tier } = await c.req.json();

    if (!['standard', 'premium', 'platinum'].includes(tier)) {
        return c.json({ error: 'Invalid tier' }, 400);
    }

    await db.update(users)
        .set({ tier, updatedAt: new Date() })
        .where(eq(users.id, id));

    return c.json({ success: true });
});

export default app;
