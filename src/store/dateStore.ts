import {create} from 'zustand';
import axios from 'axios';

type DateStore = {
    dateId: number;
    dateText: string;
    formatedDateText: string;
    fetchNextDate: () => void;
    fetchPreviousDate: () => void;
    fetchLatestDate: () => void;
};

export const useDateStore = create<DateStore>((set, get) => ({
    dateId: 0,
    dateText: '',
    formatedDateText: '',

    fetchNextDate: () => {
        axios.get(`/api/date-measurements/next/${get().dateId}`)
            .then((response) => {
                set({ dateId: response.data.Id });
                set({ dateText: response.data.Date });
                set({ formatedDateText: formateDate(response.data.Date) });
            })
            .catch((error) => {
                console.error('Error fetching next date:', error);
            });
    },
    fetchPreviousDate: () => {
        axios.get(`/api/date-measurements/previous/${get().dateId}`)
            .then((response) => {
                set({ dateId: response.data.Id });
                set({ dateText: response.data.Date });
                set({ formatedDateText: formateDate(response.data.Date) });
            })
            .catch((error) => {
                console.error('Error fetching previous date:', error);
            });
    },
    fetchLatestDate: () => {
        axios.get('/api/date-measurements/latest')
            .then((response) => {
                set({ dateId: response.data.Id });
                set({ dateText: response.data.Date });
                set({ formatedDateText: formateDate(response.data.Date) });
            })
            .catch((error) => {
                console.error('Error fetching latest date:', error);
            });
    },
}));

const formateDate = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
