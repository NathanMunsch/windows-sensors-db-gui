'use client';

import Separator from "@/components/Separator";
import {pinnedStore} from "@/store/pinnedStore";

type Props = {
    sensorName: string;
    value: number;
    highestValueAllTime: number;
    lowestValueAllTime: number;
    averageValueAllTime: number;
    unit: string;
};

export default function StatCard({ sensorName, value, highestValueAllTime, lowestValueAllTime, averageValueAllTime, unit }: Props) {

    const {
        toggleStatPinned
    } = pinnedStore();

    return (
        <article>
            <a
                onClick={() => {
                    toggleStatPinned(sensorName);
                }}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-64">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{sensorName}</h5>
                <ul>
                    <li>Value: {value} {unit}</li>
                </ul>
                <Separator text="All Time" />
                <ul>
                    <li>Highest: {highestValueAllTime} {unit}</li>
                    <li>Lowest: {lowestValueAllTime} {unit}</li>
                    <li>Average: {averageValueAllTime} {unit}</li>
                </ul>
            </a>
        </article>
    );
}
