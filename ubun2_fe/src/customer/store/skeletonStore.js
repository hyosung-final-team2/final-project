import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSkeletonStore = create(
    persist(
        set => ({
            skeletonData: [],
            skeletonSortData:[],
            skeletonTotalPage: null,
            skeletonSearchCategory: null,
            skeletonSearchKeyword: null,
            setSkeletonData: (data) => set({ skeletonData: data }),
            setSkeletonSortData: (data) => set({ skeletonSortData: data }),
            setSkeletonTotalPage: (data) => set({ skeletonTotalPage: data }),
            setSkeletonSearchCategory: (data) => set({ skeletonSearchCategory: data }),
            setSkeletonSearchKeyword: (data) => set({ skeletonSearchKeyword: data }),
            resetSkeletonData: () => set({ skeletonData: [] }),
        }),
        {
            name: 'skeleton-storage',
        }
    )
);

export default useSkeletonStore;