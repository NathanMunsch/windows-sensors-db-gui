import { create } from 'zustand';
import axios from 'axios';

type HardwareStore = {
    hardware: [
        {
            Id: number,
            Name: string,
        }
    ];
    fetchHardware: () => void;
};

export const hardwareStore = create<HardwareStore>((set) => ({
    hardware: [
        {
            Id: 0,
            Name: '',
        }
    ],

    fetchHardware: () => {
        axios.get('/api/hardware')
            .then((response) => {
                // @ts-ignore
                hardwareStore.getState().hardware.length = 0;

                response.data.forEach((hardware: any) => {
                    hardwareStore.getState().hardware.push({
                        Id: hardware.Id,
                        Name: hardware.Name,
                    });
                }, []);
            })
            .catch((error) => {
                console.error('Error fetching hardware:', error);
            });
    },
}));
