import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

interface measurement {
    SensorName: string,
    MeasuredValue: string,
    Unit: string,
    HighestValueAllTime: number,
    LowestValueAllTime: number,
    AverageValueAllTime: number,
}

export async function GET(request: Request, context: { computerId: string, hardwareId: string, dateId: string }) {
    // @ts-ignore
    const { computerId, hardwareId, dateId } = context.params;

    const measurementsDb = await prisma.measurementEntities.findMany({
        where: {
            DateMeasurementEntities: {
                ComputerEntityId: parseInt(computerId),
                Id: parseInt(dateId)
            },
            HardwareEntityId: parseInt(hardwareId),
            Unit: {
                not: ""
            }
        },
        include: {
            DateMeasurementEntities: false,
            HardwareEntities: false
        },
    });

    let measurements: measurement[] = [];
    for (const measurement of measurementsDb) {
        let measurementsForSensorNameDbAllTime = await prisma.measurementEntities.findMany({
            select: {
                MeasuredValue: true
            },
            where: {
                SensorName: measurement.SensorName,
                DateMeasurementEntities: {
                    ComputerEntityId: parseInt(computerId)
                },
                HardwareEntityId: parseInt(hardwareId),
                Unit: {
                    not: ""
                },
            },
        });

        // Calculate the highest value all time for specific sensor
        let highestValue = 0;
        for (const measurementForSensorNameDbAllTime of measurementsForSensorNameDbAllTime) {
            if (parseFloat(measurementForSensorNameDbAllTime.MeasuredValue ?? "0") > highestValue) {
                highestValue = parseFloat(measurementForSensorNameDbAllTime.MeasuredValue ?? "0");
            }
        }

        // Calculate the minimum value all time for specific sensor
        let lowestValue = highestValue;
        for (const measurementForSensorNameDbAllTime of measurementsForSensorNameDbAllTime) {
            if (parseFloat(measurementForSensorNameDbAllTime.MeasuredValue ?? "0") < lowestValue) {
                lowestValue = parseFloat(measurementForSensorNameDbAllTime.MeasuredValue ?? "0");
            }
        }

        // Calculate the average value all time for specific sensor
        let averageValue = 0;
        for (const measurementForSensorNameDbAllTime of measurementsForSensorNameDbAllTime) {
            averageValue += parseFloat(measurementForSensorNameDbAllTime.MeasuredValue ?? "0");
        }
        averageValue /= measurementsForSensorNameDbAllTime.length;

        measurements.push({
            SensorName: measurement.SensorName ?? '',
            MeasuredValue: measurement.MeasuredValue ?? '',
            Unit: measurement.Unit ?? '',
            HighestValueAllTime: highestValue,
            LowestValueAllTime: lowestValue,
            AverageValueAllTime: averageValue,
        });
    }

    return new Response(JSON.stringify(measurements), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
