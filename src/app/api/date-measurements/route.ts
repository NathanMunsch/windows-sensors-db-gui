import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const dateMeasurements = await prisma.dateMeasurementEntities.findMany();
    return new Response(JSON.stringify(dateMeasurements), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}