import {create} from 'zustand';
import axios from "axios";

type StatsStore = {
    computerId: number;
    setComputerId: (computerId: number) => void;

    hardwareId: number;
    setHardwareId: (hardwareId: number) => void;

    dateId: number;
    setDateId: (dateId: number) => void;

    isReloading: boolean;

    stats: [
        {
            SensorName: string,
            MeasuredValue: number,
            Unit: string,
            HighestValueAllTime: number,
            LowestValueAllTime: number,
            AverageValueAllTime: number,
        }
    ];
    fetchStats: () => void;
};

export const statsStore = create<StatsStore>((set) => ({
    computerId: 0,
    hardwareId: 0,
    dateId: 0,
    isReloading: false,
    stats: [
        {
            SensorName: '',
            MeasuredValue: 0,
            Unit: '',
            HighestValueAllTime: 0,
            LowestValueAllTime: 0,
            AverageValueAllTime: 0,
        }
    ],

    setComputerId: (computerId: number) => {
        set({computerId: computerId});
        statsStore.getState().fetchStats();
    },

    setHardwareId: (hardwareId: number) => {
        set({hardwareId: hardwareId});
        set({isReloading: true});
        statsStore.getState().fetchStats();
    },

    setDateId: (dateId: number) => {
        set({dateId: dateId});
        statsStore.getState().fetchStats();
    },

    fetchStats: () => {
        set({isReloading: true});

        axios.get(`/api/stats/${statsStore.getState().computerId}/${statsStore.getState().hardwareId}/${statsStore.getState().dateId}`)
            .then((response) => {
                // @ts-ignore
                statsStore.getState().stats.length = 0;

                response.data.forEach((stat: any) => {
                    statsStore.getState().stats.push({
                        SensorName: stat.SensorName,
                        MeasuredValue: stat.MeasuredValue,
                        Unit: stat.Unit,
                        HighestValueAllTime: stat.HighestValueAllTime,
                        LowestValueAllTime: stat.LowestValueAllTime,
                        AverageValueAllTime: stat.AverageValueAllTime,
                    });
                }, []);

                set({isReloading: false})
            })
            .catch((error) => {
                console.error('Error fetching stats: ', error);
                window.alert('Error fetching stats: ' + error);
            });
    }
}));
