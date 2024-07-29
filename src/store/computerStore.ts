import {create} from 'zustand';
import axios from 'axios';

type ComputerStore = {
    computers: [
        {
            Id: number,
            Name: string,
        }
    ];
    fetchComputers: () => void;
};

export const useComputerStore = create<ComputerStore>((set) => ({
    computers: [
        {
            Id: 0,
            Name: '',
        }
    ],

    fetchComputers: () => {
        axios.get('/api/computers')
            .then((response) => {
                // @ts-ignore
                useComputerStore.getState().computers.length = 0;

                response.data.forEach((computer: any) => {
                    useComputerStore.getState().computers.push({
                        Id: computer.Id,
                        Name: computer.Name,
                    });
                }, []);
            })
            .catch((error) => {
                console.error('Error fetching computers:', error);
            });
    },
}));
