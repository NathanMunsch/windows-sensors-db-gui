import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const latestDateMeasurement = await prisma.dateMeasurementEntities.findFirstOrThrow({
        orderBy: {
            Date: 'desc'
        },
    });

    if (latestDateMeasurement == null) {
        return new Response(JSON.stringify({}), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    }

    return new Response(JSON.stringify(latestDateMeasurement), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}