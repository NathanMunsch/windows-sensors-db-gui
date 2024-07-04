import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const hardware = await prisma.hardwareEntities.findMany();
    return new Response(JSON.stringify(hardware), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}