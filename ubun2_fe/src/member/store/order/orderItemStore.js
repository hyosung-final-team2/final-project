import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CART_DUMMY_DATA } from '../../components/Cart/cartDummyData';

const useOrderItemsStore = create(
  persist(
    (set, get) => ({
      cartData: CART_DUMMY_DATA,
      selectedItems: {
        ...CART_DUMMY_DATA,
        itemContent: [],
      },

      setCartData: newCartData => set({ cartData: newCartData }),

      isStoreAllSelected: storeId => {
        const { selectedItems, cartData } = get();
        const selectedStore = selectedItems.itemContent.find(s => s.customerId === storeId);
        const cartStore = cartData.itemContent.find(s => s.customerId === storeId);

        if (!selectedStore || !cartStore) return false;

        const isSingleSelected = cartStore.singleOrderProducts.every(product => selectedStore.singleOrderProducts.some(p => p.productId === product.productId));
        const isRegularSelected = cartStore.regularOrderProducts.every(product =>
          selectedStore.regularOrderProducts.some(p => p.productId === product.productId)
        );

        return isSingleSelected && isRegularSelected;
      },

      isProductSelected: (storeId, productId, orderType) => {
        const { selectedItems } = get();
        const selectedStore = selectedItems.itemContent.find(s => s.customerId === storeId);
        if (!selectedStore) return false;

        return selectedStore[orderType].some(p => p.productId === productId);
      },

      handleSelectAllStore: (storeId, checked) => {
        set(state => {
          const store = state.cartData.itemContent.find(s => s.customerId === storeId);
          if (!store) return state;

          const newSelectedItems = [...state.selectedItems.itemContent];
          const storeIndex = newSelectedItems.findIndex(s => s.customerId === storeId);

          if (checked) {
            if (storeIndex === -1) {
              newSelectedItems.push({
                ...store,
                singleOrderProducts: [...store.singleOrderProducts],
                regularOrderProducts: [...store.regularOrderProducts],
              });
            } else {
              newSelectedItems[storeIndex] = {
                ...store,
                singleOrderProducts: [...store.singleOrderProducts],
                regularOrderProducts: [...store.regularOrderProducts],
              };
            }
          } else {
            if (storeIndex !== -1) {
              newSelectedItems.splice(storeIndex, 1);
            }
          }

          return { selectedItems: { ...state.selectedItems, itemContent: newSelectedItems } };
        });
      },

      handleSelectProduct: (storeId, product, orderType, checked) => {
        set(state => {
          const newSelectedItems = [...state.selectedItems.itemContent];
          const storeIndex = newSelectedItems.findIndex(store => store.customerId === storeId);

          if (checked) {
            if (storeIndex === -1) {
              const store = state.cartData.itemContent.find(store => store.customerId === storeId);
              const newStore = {
                ...store,
                singleOrderProducts: orderType === 'singleOrderProducts' ? [product] : [],
                regularOrderProducts: orderType === 'regularOrderProducts' ? [product] : [],
              };
              newSelectedItems.push(newStore);
            } else {
              newSelectedItems[storeIndex] = {
                ...newSelectedItems[storeIndex],
                [orderType]: [...newSelectedItems[storeIndex][orderType], product],
              };
            }
          } else {
            if (storeIndex !== -1) {
              newSelectedItems[storeIndex] = {
                ...newSelectedItems[storeIndex],
                [orderType]: newSelectedItems[storeIndex][orderType].filter(p => p.productId !== product.productId),
              };
              if (newSelectedItems[storeIndex].singleOrderProducts.length === 0 && newSelectedItems[storeIndex].regularOrderProducts.length === 0) {
                newSelectedItems.splice(storeIndex, 1);
              }
            }
          }

          return { selectedItems: { ...state.selectedItems, itemContent: newSelectedItems } };
        });
      },

      // 상품 삭제 함수
      handleDeleteProduct: (storeId, productId, orderType) => {
        set(state => {
          // cartData에서 상품 삭제
          const newCartData = {
            ...state.cartData,
            itemContent: state.cartData.itemContent.map(store => {
              if (store.customerId === storeId) {
                return {
                  ...store,
                  [orderType]: store[orderType].filter(product => product.productId !== productId),
                };
              }
              return store;
            }),
          };

          // selectedItems에서도 상품 삭제
          const newSelectedItems = state.selectedItems.itemContent
            .map(store => {
              if (store.customerId === storeId) {
                return {
                  ...store,
                  [orderType]: store[orderType].filter(product => product.productId !== productId),
                };
              }
              return store;
            })
            .filter(store => store.singleOrderProducts.length > 0 || store.regularOrderProducts.length > 0);

          return { cartData: newCartData, selectedItems: { ...state.selectedItems, itemContent: newSelectedItems } };
        });
      },

      // 상품 수량 업데이트 함수
      updateProductQuantity: (storeId, productId, orderType, newQuantity) => {
        set(state => {
          // cartData의 상품 수량 업데이트
          const newCartData = {
            ...state.cartData,
            itemContent: state.cartData.itemContent.map(store => {
              if (store.customerId === storeId) {
                return {
                  ...store,
                  [orderType]: store[orderType].map(product => (product.productId === productId ? { ...product, quantity: newQuantity } : product)),
                };
              }
              return store;
            }),
          };

          // selectedItems의 상품 수량 업데이트
          const newSelectedItems = state.selectedItems.itemContent.map(store => {
            if (store.customerId === storeId) {
              return {
                ...store,
                [orderType]: store[orderType].map(product => (product.productId === productId ? { ...product, quantity: newQuantity } : product)),
              };
            }
            return store;
          });

          return { cartData: newCartData, selectedItems: { ...state.selectedItems, itemContent: newSelectedItems } };
        });
      },

      // 주소 정보 업데이트 함수
      updateAddress: newAddress => {
        set(state => ({
          cartData: { ...state.cartData, ...newAddress },
          selectedItems: { ...state.selectedItems, ...newAddress },
        }));
      },

      // 결제 정보 업데이트 함수
      updatePaymentInfo: newPaymentInfo => {
        set(state => ({
          cartData: { ...state.cartData, ...newPaymentInfo },
          selectedItems: { ...state.selectedItems, ...newPaymentInfo },
        }));
      },

      // 선택된 상품 초기화 함수 (이미 선택된 항목이 있으면 초기화하지 않음)
      initializeSelectedItems: () => {
        set(state => {
          if (state.selectedItems.itemContent.length > 0) {
            return state;
          }
          return {
            selectedItems: {
              ...CART_DUMMY_DATA,
              itemContent: [],
            },
          };
        });
      },

      // 총액 계산 함수
      calculateTotals: () => {
        const { selectedItems } = get();
        let productAmount = 0;
        let discount = 0;
        let totalAmount = 0;
        let selectedCount = 0;

        selectedItems.itemContent.forEach(store => {
          ['singleOrderProducts', 'regularOrderProducts'].forEach(orderType => {
            store[orderType].forEach(product => {
              selectedCount++;
              const discountRate = product.productDiscount / 100;
              const discountedPrice = product.productPrice * (1 - discountRate);
              productAmount += product.productPrice * product.quantity;
              discount += (product.productPrice - discountedPrice) * product.quantity;
              totalAmount += discountedPrice * product.quantity;
            });
          });
        });

        return {
          productAmount,
          discount,
          totalAmount: Math.round(totalAmount),
          selectedCount,
        };
      },
    }),
    {
      name: 'cart-storage',
      partialize: state => ({ selectedItems: state.selectedItems, cartData: state.cartData }),
    }
  )
);

export default useOrderItemsStore;
