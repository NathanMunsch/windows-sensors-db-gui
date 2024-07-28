'use client';

import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import {useStatsStore} from "@/store/statsStore";
import {usePinnedStore} from "@/store/pinnedStore";
import Separator from "@/components/Separator";

export default function Home() {
    const {
        stats
    } = useStatsStore();

    const {
        isStatPinned
    } = usePinnedStore();

    return (
        <main>
            <Header />
            <br />
            <Separator text={"Pinned"} />
            <section className="grid grid-cols-[repeat(auto-fit,_16.666666%)] m-auto justify-center gap-2">
                {stats.map((stat, index) => (
                    isStatPinned(stat.SensorName) &&
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
            <Separator text={"All"} />
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
                    )
                )}
            </section>
        </main>
    );
}
