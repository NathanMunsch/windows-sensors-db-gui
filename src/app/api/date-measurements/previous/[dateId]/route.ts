import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, context: { dateId: number}) {

    // @ts-ignore
    const { dateId } = context.params;

    let previousDateMeasurement = await prisma.dateMeasurementEntities.findFirst({
        where: {
            Id: {
                lt: parseInt(dateId)
            }
        },
        orderBy: {
            Id: 'desc'
        }
    });

    if (previousDateMeasurement == null) {
        previousDateMeasurement = await prisma.dateMeasurementEntities.findFirstOrThrow({
            orderBy: {
                Id: 'asc'
            }
        });
    }

    return new Response(JSON.stringify(previousDateMeasurement), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}