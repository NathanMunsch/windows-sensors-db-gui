import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type PinnedStore = {
    statPinned: string[];
    getStatPinned: () => string[];
    addStatPinned: (stat: string) => void;
    removeStatPinned: (stat: string) => void;
    toggleStatPinned: (stat: string) => void;
    isStatPinned: (stat: string) => boolean;
};

export const usePinnedStore = create<PinnedStore>()(
    persist(
        (set, get) => ({
            statPinned: [],
            getStatPinned: () => {
                return get().statPinned;
            },
            addStatPinned: (stat: string) => {
                if (!get().statPinned.includes(stat)) {
                    set((state) => ({
                        statPinned: [...state.statPinned, stat],
                    }));
                }
            },
            removeStatPinned: (stat: string) => {
                set((state) => ({
                    statPinned: state.statPinned.filter((pinedStat) => pinedStat !== stat),
                }));
            },
            toggleStatPinned: (stat: string) => {
                if (get().statPinned.includes(stat)) {
                    get().removeStatPinned(stat);
                } else {
                    get().addStatPinned(stat);
                }
            },
            clearStatPinned: () => {
                set({statPinned: []});
            },
            isStatPinned: (stat: string) => {
                return get().statPinned.includes(stat);
            },
        }),
        {
            name: 'pinned-store',
        }
    )
);
