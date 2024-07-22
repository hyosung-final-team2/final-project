import { create, createStore } from 'zustand';
import { persist } from 'zustand/middleware';

const useCurrentLocationStore = create(
  persist(
    set => ({
      currentLocation: 'home',
      setCurrentLocation: location => set({ currentLocation: location }),
    }),
    {
      name: 'navigation-storage',
    }
  )
);

export default useCurrentLocationStore;
