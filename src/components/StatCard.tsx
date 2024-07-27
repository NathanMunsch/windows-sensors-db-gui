'use client';

type Props = {
    sensorName: string;
    value: number;
    highestValueAllTime: number;
    lowestValueAllTime: number;
    averageValueAllTime: number;
    unit: string;
};

export default function StatCard({ sensorName, value, highestValueAllTime, lowestValueAllTime, averageValueAllTime, unit }: Props) {
    return (
        <article>
            <a
               className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-64">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{sensorName}</h5>
                <ul>
                    <li>Value: {value} {unit}</li>
                </ul>
                <div
                    className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">All time
                </div>
                <ul>
                    <li>Highest: {highestValueAllTime} {unit}</li>
                    <li>Lowest: {lowestValueAllTime} {unit}</li>
                    <li>Average: {averageValueAllTime} {unit}</li>
                </ul>
            </a>
        </article>
    );
}
