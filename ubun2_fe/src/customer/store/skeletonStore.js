import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSkeletonStore = create(
    persist(
        set => ({
            skeletonData: [],
            skeletonSortData:[],
            skeletonTotalPage: null,
            setSkeletonData: (data) => set({ skeletonData: data }),
            setSkeletonSortData: (data) => set({ skeletonSortData: data }),
            setSkeletonTotalPage: (data) => set({ skeletonTotalPage: data }),
            resetSkeletonData: () => set({ skeletonData: [] }),
        }),
        {
            name: 'skeleton-storage',
        }
    )
);

export default useSkeletonStore;