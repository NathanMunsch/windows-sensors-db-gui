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

export const computerStore = create<ComputerStore>((set) => ({
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
                computerStore.getState().computers.length = 0;

                response.data.forEach((computer: any) => {
                    computerStore.getState().computers.push({
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
