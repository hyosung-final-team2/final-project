import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  sort: [],
  searchCategory: null,
  searchKeyword: null,
};

const usePendingOrderTableStore = create(
  persist(
    set => ({
      ...initialState,
      setSearchCategory: state => set({ searchCategory: state }),
      setSearchKeyword: state => set({ searchKeyword: state }),

      // sort 배열 업데이트하는 메서드
      updateSort: (column, sortType) =>
        set(state => {
          const sortString = `${column},${sortType}`;
          const sortIndex = state.sort.findIndex(item => item.startsWith(`${column},`));

          if (sortIndex !== -1) {
            const newSort = [...state.sort];
            newSort[sortIndex] = sortString;
            return { sort: newSort };
          } else {
            return { sort: [...state.sort, sortString] };
          }
        }),

      // reset 누르면 다 비움
      resetData: () => set({ ...initialState }),

      // 삼각형 다시 검은색으로 돌리는 용
      isReset: false,
      toggleIsReset: () => set(state => ({ isReset: !state.isReset })),
    }),
    {
      name: 'pendingOrderTable-storage',
    }
  )
);

export default usePendingOrderTableStore;
