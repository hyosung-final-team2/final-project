import { persist } from 'zustand/middleware';
import { create } from 'zustand';

const initialState = {
  sort: [],
  searchCategory: null,
  searchKeyword: null,
};

const usePaymentMethodTableStore = create(
  persist(
    set => ({
      ...initialState,
      totalElements: null,
      setSearchCategory: state => set({ searchCategory: state }),
      setSearchKeyword: state => set({ searchKeyword: state }),
      setTotalElements: state => set({ totalElements: state }),

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
      name: 'paymentMethodTableStore-storage',
    }
  )
);

// 스토어 초기화 함수
export const resetPaymentMethodTableStore = () => {
  usePaymentMethodTableStore.setState(initialState);
  // 로컬 스토리지에서도 데이터 삭제
  localStorage.removeItem('payment-method-table-storage');
};

export default usePaymentMethodTableStore;
