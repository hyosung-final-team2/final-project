import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useOrderItemsStore = create(
  persist(
    (set, get) => ({
      // 초기 상태 정의
      cartData: [], // 장바구니 데이터
      selectedItems: [], // 선택된 아이템들
      updatedQuantities: {}, // 수량 변경 추적용 상태관리
      totals: { productAmount: 0, discount: 0, totalAmount: 0, selectedCount: 0 }, // totals 관리

      // 장바구니 데이터를 설정하는 함수
      setCartData: newCartData => {
        set(state => {
          const newSelectedItems = state.selectedItems
            .map(selectedStore => {
              const updatedStore = newCartData.find(s => s.customerId === selectedStore.customerId);
              if (updatedStore) {
                return {
                  ...selectedStore,
                  cartProducts: selectedStore.cartProducts
                    .filter(product => updatedStore.cartProducts.some(p => p.cartProductId === product.cartProductId))
                    .map(product => {
                      const updatedProduct = updatedStore.cartProducts.find(p => p.cartProductId === product.cartProductId);
                      return updatedProduct ? { ...updatedProduct, intervalDays: product.intervalDays } : product;
                    }),
                };
              }
              return selectedStore;
            })
            .filter(store => store.cartProducts.length > 0);

          const newState = {
            ...state,
            cartData: newCartData,
            selectedItems: newSelectedItems,
          };
          return { ...newState, totals: calculateTotals(newState) };
        });
      },

      // 스토어의 모든 제품이 선택되었는지 확인하는 함수
      isStoreAllSelected: customerId => {
        const { selectedItems, cartData } = get();
        const cartStore = cartData.find(s => s.customerId === customerId);
        if (!cartStore) return false;

        const selectedProducts = selectedItems.filter(s => s.customerId === customerId).flatMap(s => s.cartProducts);

        return cartStore.cartProducts.every(product => selectedProducts.some(p => p.cartProductId === product.cartProductId));
      },

      // 특정 제품이 선택되었는지 확인하는 함수
      isProductSelected: (customerId, cartProductId) => {
        const { selectedItems } = get();
        const selectedStore = selectedItems.find(s => s.customerId === customerId);
        if (!selectedStore) return false;

        // selectedStore의 제품 목록에 cartProductId가 포함되어 있는지 확인
        return selectedStore.cartProducts.some(p => p.cartProductId === cartProductId);
      },

      // 스토어의 모든 제품을 선택하거나 선택 해제하는 함수
      handleSelectAllStore: (customerId, checked, selectableProducts) => {
        set(state => {
          const store = state.cartData.find(s => s.customerId === customerId);
          if (!store) return state;

          let newSelectedItems = state.selectedItems.filter(s => s.customerId !== customerId);

          if (checked) {
            const existingSelectedStore = state.selectedItems.find(s => s.customerId === customerId);
            const singleProducts = selectableProducts.filter(p => p.orderOption === 'SINGLE');
            const subscriptionProducts = selectableProducts.filter(p => p.orderOption === 'SUBSCRIPTION');

            if (singleProducts.length > 0) {
              const existingSingleProducts = existingSelectedStore?.cartProducts.filter(p => p.orderOption === 'SINGLE') || [];
              newSelectedItems.push({
                customerId,
                businessName: store.businessName,
                intervalDays: undefined,
                cartProducts: [
                  ...existingSingleProducts,
                  ...singleProducts.filter(p => !existingSingleProducts.some(ep => ep.cartProductId === p.cartProductId)),
                ],
              });
            }

            if (subscriptionProducts.length > 0) {
              const existingSubscriptionProducts = existingSelectedStore?.cartProducts.filter(p => p.orderOption === 'SUBSCRIPTION') || [];
              newSelectedItems.push({
                customerId,
                businessName: store.businessName,
                intervalDays: existingSelectedStore?.intervalDays || 0,
                cartProducts: [
                  ...existingSubscriptionProducts,
                  ...subscriptionProducts.filter(p => !existingSubscriptionProducts.some(ep => ep.cartProductId === p.cartProductId)),
                ].map(p => ({
                  ...p,
                  intervalDays: p.intervalDays || existingSelectedStore?.intervalDays || 0,
                })),
              });
            }
          }

          const newState = { ...state, selectedItems: newSelectedItems };
          return { ...newState, totals: calculateTotals(newState) };
        });
      },

      // 특정 제품을 선택하거나 선택 해제하는 함수
      handleSelectProduct: (customerId, product, checked) => {
        if (product.stockQuantity === 0) return; // 재고가 0인 경우 선택 불가

        set(state => {
          let newSelectedItems = [...state.selectedItems];
          const storeIndex = newSelectedItems.findIndex(
            store =>
              store.customerId === customerId && (product.orderOption === 'SUBSCRIPTION' ? store.intervalDays !== undefined : store.intervalDays === undefined)
          );

          if (checked) {
            if (storeIndex === -1) {
              newSelectedItems.push({
                customerId,
                businessName: state.cartData.find(s => s.customerId === customerId)?.businessName,
                intervalDays: product.orderOption === 'SUBSCRIPTION' ? product.intervalDays || 0 : undefined,
                cartProducts: [product],
              });
            } else {
              newSelectedItems[storeIndex] = {
                ...newSelectedItems[storeIndex],
                cartProducts: [...newSelectedItems[storeIndex].cartProducts, product],
              };
            }
          } else {
            if (storeIndex !== -1) {
              newSelectedItems[storeIndex] = {
                ...newSelectedItems[storeIndex],
                cartProducts: newSelectedItems[storeIndex].cartProducts.filter(p => p.cartProductId !== product.cartProductId),
              };
              if (newSelectedItems[storeIndex].cartProducts.length === 0) {
                newSelectedItems.splice(storeIndex, 1);
              }
            }
          }

          const newState = { ...state, selectedItems: newSelectedItems };
          return { ...newState, totals: calculateTotals(newState) };
        });
      },

      // 제품의 수량을 업데이트하는 함수
      updateProductQuantity: (customerId, cartProductId, newQuantity) => {
        set(state => {
          // cartData 업데이트
          const newCartData = state.cartData.map(store => {
            if (store.customerId === customerId) {
              return {
                ...store,
                cartProducts: store.cartProducts.map(product => (product.cartProductId === cartProductId ? { ...product, quantity: newQuantity } : product)),
              };
            }
            return store;
          });

          // selectedItems 업데이트
          const newSelectedItems = state.selectedItems.map(store => {
            if (store.customerId === customerId) {
              return {
                ...store,
                cartProducts: store.cartProducts.map(product => (product.cartProductId === cartProductId ? { ...product, quantity: newQuantity } : product)),
              };
            }
            return store;
          });

          const updatedQuantities = {
            ...state.updatedQuantities,
            [`${customerId}-${cartProductId}`]: newQuantity,
          };

          const newState = {
            ...state,
            cartData: newCartData,
            selectedItems: newSelectedItems,
            updatedQuantities,
          };

          return { ...newState, totals: calculateTotals(newState) };
        });
      },

      // 특정 제품을 제거하는 함수
      removeProducts: productIds => {
        set(state => {
          const newCartData = state.cartData.map(store => ({
            ...store,
            cartProducts: store.cartProducts.filter(product => !productIds.includes(product.cartProductId)),
          }));

          const newSelectedItems = state.selectedItems
            .map(store => ({
              ...store,
              cartProducts: store.cartProducts.filter(product => !productIds.includes(product.cartProductId)),
            }))
            .filter(store => store.cartProducts.length > 0);

          const newState = {
            ...state,
            cartData: newCartData,
            selectedItems: newSelectedItems,
          };

          return { ...newState, totals: calculateTotals(newState) };
        });
      },

      // 스토어가 비어있으면 제거하는 함수
      removeStoreIfEmpty: customerId => {
        set(state => {
          const newCartData = state.cartData.filter(store => store.customerId !== customerId || store.cartProducts.length > 0);
          const newSelectedItems = state.selectedItems.filter(store => store.customerId !== customerId || store.cartProducts.length > 0);

          const newState = {
            ...state,
            cartData: newCartData,
            selectedItems: newSelectedItems,
          };

          return { ...newState, totals: calculateTotals(newState) };
        });
      },

      // 장바구니를 비우는 함수
      clearCart: () =>
        set({
          cartData: [],
          selectedItems: [],
          updatedQuantities: {},
          totals: { productAmount: 0, discount: 0, totalAmount: 0, selectedCount: 0 },
        }),

      // 업데이트된 장바구니 데이터를 반환하는 함수
      getUpdatedCartData: () => {
        const { cartData, updatedQuantities } = get();
        const updatedCartData = cartData.map(store => ({
          customerId: store.customerId,
          cartId: store.cartProducts[0].cartId,
          cartProducts: store.cartProducts.map(product => ({
            cartProductId: product.cartProductId,
            quantity: updatedQuantities[`${store.customerId}-${product.cartProductId}`] || product.quantity,
          })),
        }));
        return updatedCartData;
      },

      // 구독 주기를 설정하는 함수
      setSubscriptionPeriod: (customerId, intervalDays) => {
        set(state => {
          const newSelectedItems = state.selectedItems.map(store => {
            if (store.customerId === customerId && store.intervalDays !== undefined) {
              return {
                ...store,
                intervalDays: intervalDays,
                cartProducts: store.cartProducts.map(product => ({
                  ...product,
                  intervalDays: intervalDays,
                })),
              };
            }
            return store;
          });

          const newState = { ...state, selectedItems: newSelectedItems };
          return { ...newState, totals: calculateTotals(newState) };
        });
      },
    }),
    {
      name: 'order-items-storage',
    }
  )
);

// 총합을 계산하는 함수 (스토어 외부로 이동)
const calculateTotals = state => {
  let productAmount = 0;
  let discountedAmount = 0;
  let selectedCartProductsCount = 0;

  state.selectedItems.forEach(store => {
    selectedCartProductsCount += store.cartProducts.length;
    store.cartProducts.forEach(product => {
      const price = product.productPrice || 0;
      const discountRate = (product.productDiscount || 0) / 100;
      const quantity = product.quantity || 0;

      const originalSubtotal = price * quantity;
      const discountedPrice = Math.round((price * (1 - discountRate)) / 10) * 10;
      const discountedSubtotal = discountedPrice * quantity;

      productAmount += originalSubtotal;
      discountedAmount += discountedSubtotal;
    });
  });

  const discount = productAmount - discountedAmount;

  return {
    productAmount: Math.round(productAmount),
    discount: Math.round(discount),
    totalAmount: Math.round(discountedAmount),
    selectedCartProductsCount,
  };
};

export default useOrderItemsStore;
