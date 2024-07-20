import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useOrderItemsStore = create(
  persist(
    (set, get) => ({
      cartData: null,
      selectedItems: [],

      setCartData: newCartData => set({ cartData: newCartData }),

      isStoreAllSelected: customerId => {
        const { selectedItems, cartData } = get();
        const selectedStore = selectedItems.find(s => s.customerId === customerId);
        const cartStore = cartData.find(s => s.customerId === customerId);

        if (!selectedStore || !cartStore) return false;

        return cartStore.cartProducts.every(product => selectedStore.cartProducts.some(p => p.cartProductId === product.cartProductId));
      },

      isProductSelected: (customerId, cartProductId) => {
        const { selectedItems } = get();
        const selectedStore = selectedItems.find(s => s.customerId === customerId);
        if (!selectedStore) return false;

        return selectedStore.cartProducts.some(p => p.cartProductId === cartProductId);
      },

      handleSelectAllStore: (customerId, checked) => {
        set(state => {
          const store = state.cartData.find(s => s.customerId === customerId);
          if (!store) return state;

          const newSelectedItems = [...state.selectedItems];
          const storeIndex = newSelectedItems.findIndex(s => s.customerId === customerId);

          if (checked) {
            if (storeIndex === -1) {
              newSelectedItems.push({
                ...store,
                cartProducts: [...store.cartProducts],
              });
            } else {
              newSelectedItems[storeIndex] = {
                ...store,
                cartProducts: [...store.cartProducts],
              };
            }
          } else {
            if (storeIndex !== -1) {
              newSelectedItems.splice(storeIndex, 1);
            }
          }

          return { selectedItems: newSelectedItems };
        });
      },

      handleSelectProduct: (customerId, product, checked) => {
        set(state => {
          const newSelectedItems = [...state.selectedItems];
          const storeIndex = newSelectedItems.findIndex(store => store.customerId === customerId);

          if (checked) {
            if (storeIndex === -1) {
              const store = state.cartData.find(store => store.customerId === customerId);
              const newStore = {
                ...store,
                cartProducts: [product],
              };
              newSelectedItems.push(newStore);
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

          return { selectedItems: newSelectedItems };
        });
      },

      updateProductQuantity: (customerId, cartProductId, newQuantity) => {
        set(state => ({
          cartData: state.cartData.map(store =>
            store.customerId === customerId
              ? {
                  ...store,
                  cartProducts: store.cartProducts.map(product => (product.cartProductId === cartProductId ? { ...product, quantity: newQuantity } : product)),
                }
              : store
          ),
          selectedItems: state.selectedItems.map(store =>
            store.customerId === customerId
              ? {
                  ...store,
                  cartProducts: store.cartProducts.map(product => (product.cartProductId === cartProductId ? { ...product, quantity: newQuantity } : product)),
                }
              : store
          ),
        }));
      },

      removeProducts: productIds => {
        set(state => ({
          cartData: state.cartData
            .map(store => ({
              ...store,
              cartProducts: store.cartProducts.filter(product => !productIds.includes(product.productId)),
            }))
            .filter(store => store.cartProducts.length > 0),
          selectedItems: state.selectedItems
            .map(store => ({
              ...store,
              cartProducts: store.cartProducts.filter(product => !productIds.includes(product.productId)),
            }))
            .filter(store => store.cartProducts.length > 0),
        }));
      },

      clearCart: () => {
        set({ cartData: null, selectedItems: [] });
        localStorage.removeItem('cart-storage');
      },

      removeStoreIfEmpty: customerId => {
        set(state => ({
          cartData: state.cartData.filter(store => store.customerId !== customerId || store.cartProducts.length > 0),
          selectedItems: state.selectedItems.filter(store => store.customerId !== customerId || store.cartProducts.length > 0),
        }));
      },

      calculateTotals: () => {
        const { selectedItems } = get();
        let productAmount = 0;
        let discount = 0;
        let totalAmount = 0;
        let selectedCount = 0;

        selectedItems.forEach(store => {
          store.cartProducts.forEach(product => {
            selectedCount++;
            productAmount += product.productPrice * product.quantity;
            discount += product.productDiscount * product.quantity;
            totalAmount += (product.productPrice - product.productDiscount) * product.quantity;
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
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ selectedItems: state.selectedItems }),
    }
  )
);

export default useOrderItemsStore;
