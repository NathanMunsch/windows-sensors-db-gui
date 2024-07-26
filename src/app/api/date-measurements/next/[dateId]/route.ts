import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, context: { dateId: number}) {

    // @ts-ignore
    const { dateId } = context.params;

    let nextDateMeasurement = await prisma.dateMeasurementEntities.findFirst({
        where: {
            Id: {
                gt: parseInt(dateId)
            }
        },
        orderBy: {
            Id: 'asc'
        }
    });

    if (nextDateMeasurement == null) {
        nextDateMeasurement = await prisma.dateMeasurementEntities.findFirstOrThrow({
            orderBy: {
                Id: 'desc'
            }
        });
    }

    return new Response(JSON.stringify(nextDateMeasurement), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}