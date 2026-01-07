import { Hono } from 'hono';
import { db } from '../../db';
import { applications, users } from '../../db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const app = new Hono();

// List Applications
app.get('/', async (c) => {
    const status = c.req.query('status');

    let query = db.select().from(applications);

    if (status) {
        query = query.where(eq(applications.status, status)) as any;
    }

    const results = await query.orderBy(desc(applications.createdAt));

    return c.json({ data: results });
});

// Get Application Detail
app.get('/:id', async (c) => {
    const id = c.req.param('id');
    const [application] = await db.select().from(applications).where(eq(applications.id, id));

    if (!application) {
        return c.json({ error: 'Application not found' }, 404);
    }

    return c.json({ data: application });
});

// Approve Application (Create User)
app.post('/:id/approve', async (c) => {
    const id = c.req.param('id');
    const [application] = await db.select().from(applications).where(eq(applications.id, id));

    if (!application) {
        return c.json({ error: 'Application not found' }, 404);
    }

    if (application.status === 'approved') {
        return c.json({ error: 'Already approved' }, 400);
    }

    // Transaction: Create User -> Update Application Status
    try {
        const result = await db.transaction(async (tx) => {
            // 1. Create User
            const [newUser] = await tx.insert(users).values({
                email: application.email,
                passwordHash: application.passwordHash,
                name: application.businessInfo?.representativeName || 'Unknown', // Fallback
                phone: application.phone,
                memberType: application.memberType,
                company: application.businessInfo?.companyName,
                position: application.businessInfo?.position,
                bio: application.founderInfo?.selfIntroduction,
                // Map other fields as needed
                canProvide: application.canProvide,
                lookingFor: application.lookingFor,
                tier: 'standard', // Default tier
            }).returning();

            // 2. Update Application
            await tx.update(applications)
                .set({
                    status: 'approved',
                    reviewedAt: new Date(),
                    // reviewedBy: ... (add admin ID if available in context)
                })
                .where(eq(applications.id, id));

            return newUser;
        });

        return c.json({ success: true, data: result });
    } catch (error) {
        console.error('Approval error:', error);
        return c.json({ error: 'Failed to approve application' }, 500);
    }
});

// Reject Application
app.post('/:id/reject', async (c) => {
    const id = c.req.param('id');
    const { reason } = await c.req.json().catch(() => ({ reason: null }));

    try {
        await db.update(applications)
            .set({
                status: 'rejected',
                rejectionReason: reason,
                reviewedAt: new Date(),
            })
            .where(eq(applications.id, id));

        return c.json({ success: true });
    } catch (error) {
        return c.json({ error: 'Failed to reject application' }, 500);
    }
});

export default app;
