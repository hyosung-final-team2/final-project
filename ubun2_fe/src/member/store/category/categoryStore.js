import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCategoryStore = create(
    persist(
        set => ({
            category: null,
            setCategory: state => set({ category: state }),
        }),
        {
            name: 'category-storage',
        }
    )
);

export default useCategoryStore;
