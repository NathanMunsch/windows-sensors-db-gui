import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const computers = await prisma.computerEntities.findMany();
    return new Response(JSON.stringify(computers), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}