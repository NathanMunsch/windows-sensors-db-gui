'use client';

import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import {statsStore} from "@/store/statsStore";

export default function Home() {

    const {
        stats
    } = statsStore();

    return (
        <main>
            <Header />
            <br />
            <section className="grid grid-cols-[repeat(auto-fit,_16.666666%)] m-auto justify-center gap-2">
                {stats.map((stat, index) => (
                    <StatCard key={index}
                              sensorName={stat.SensorName}
                              value={stat.MeasuredValue}
                              highestValueAllTime={stat.HighestValueAllTime}
                              lowestValueAllTime={stat.LowestValueAllTime}
                              averageValueAllTime={stat.AverageValueAllTime}
                              unit={stat.Unit}
                    />
                ))}
            </section>
        </main>
    );
}
