import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import axios from 'axios';

type Stat = {
    SensorName: string;
    MeasuredValue: number;
    Unit: string;
    HighestValueAllTime: number;
    LowestValueAllTime: number;
    AverageValueAllTime: number;
};

type StatsStore = {
    computerId: number;
    setComputerId: (computerId: number) => void;

    hardwareId: number;
    setHardwareId: (hardwareId: number) => void;

    dateId: number;
    setDateId: (dateId: number) => void;

    isReloading: boolean;

    stats: Stat[];
    fetchStats: () => void;
};

export const useStatsStore = create<StatsStore>()(
    persist(
        (set, get) => ({
            computerId: 0,
            hardwareId: 0,
            dateId: 0,
            isReloading: false,
            stats: [],

            setComputerId: (computerId: number) => {
                set({ computerId });
                get().fetchStats();
            },

            setHardwareId: (hardwareId: number) => {
                set({ hardwareId, isReloading: true });
                get().fetchStats();
            },

            setDateId: (dateId: number) => {
                set({ dateId });
                get().fetchStats();
            },

            fetchStats: () => {
                set({ isReloading: true });

                const { computerId, hardwareId, dateId } = get();

                axios
                    .get(`/api/stats/${computerId}/${hardwareId}/${dateId}`)
                    .then((response) => {
                        const stats = response.data.map((stat: any) => ({
                            SensorName: stat.SensorName,
                            MeasuredValue: stat.MeasuredValue,
                            Unit: stat.Unit,
                            HighestValueAllTime: stat.HighestValueAllTime,
                            LowestValueAllTime: stat.LowestValueAllTime,
                            AverageValueAllTime: stat.AverageValueAllTime,
                        }));

                        set({ stats, isReloading: false });
                    })
                    .catch((error) => {
                        console.error('Error fetching stats: ', error);
                        window.alert('Error fetching stats: ' + error);
                        set({ isReloading: false });
                    });
            },
        }),
        {
            name: 'stats-store',
        }
    )
);
