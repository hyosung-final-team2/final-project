import { Checkbox } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { CART_DUMMY_DATA, cycleContent } from '../../components/Cart/cartDummyData';
import CartStore from '../../components/Cart/cartList/CartStore';
import BottomButton from '../../components/common/button/BottomButton';
import PaymentSummaryPre from '../../components/common/paymentSummary/PaymentSummaryPre';
import SlideUpModal from '../../components/common/SlideUpModal';
import useModalStore from '../../store/modalStore';

const Cart = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [cartItems, setCartItems] = useState(CART_DUMMY_DATA);
  const [selectedItems, setSelectedItems] = useState({});
  const { modalState, setModalState } = useModalStore();

  useEffect(() => {
    const initialSelectedItems = {};
    cartItems.forEach(store => {
      initialSelectedItems[store.customerId] = {
        singleOrderProducts: {},
        regularOrderProducts: {},
      };
      store.singleOrderProducts.forEach(product => {
        initialSelectedItems[store.customerId].singleOrderProducts[product.productId] = false;
      });
      store.regularOrderProducts.forEach(product => {
        initialSelectedItems[store.customerId].regularOrderProducts[product.productId] = false;
      });
    });
    setSelectedItems(initialSelectedItems);
  }, [cartItems]);

  // 모두 선택하는 함수
  const handleSelectAll = checked => {
    const newSelectedItems = {};
    cartItems.forEach(store => {
      newSelectedItems[store.customerId] = {
        singleOrderProducts: {},
        regularOrderProducts: {},
      };
      store.singleOrderProducts.forEach(product => {
        newSelectedItems[store.customerId].singleOrderProducts[product.productId] = checked;
      });
      store.regularOrderProducts.forEach(product => {
        newSelectedItems[store.customerId].regularOrderProducts[product.productId] = checked;
      });
    });
    setSelectedItems(newSelectedItems);
  };

  const handleSelectProduct = (storeId, productId, orderType, checked) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [storeId]: {
        ...prevState[storeId],
        [orderType]: {
          ...prevState[storeId]?.[orderType],
          [productId]: checked,
        },
      },
    }));
  };

  // 제품 수량 변경 함수
  const handleQuantityChange = (storeId, productId, orderType, newQuantity) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(store =>
        store.customerId === storeId
          ? {
              ...store,
              [orderType]: store[orderType].map(product => (product.productId === productId ? { ...product, quantity: newQuantity } : product)),
            }
          : store
      )
    );
  };

  // 제품 삭제
  const handleDelete = (storeId, productId, orderType) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(store =>
        store.customerId === storeId
          ? {
              ...store,
              [orderType]: store[orderType].filter(product => product.productId !== productId),
            }
          : store
      )
    );
    setSelectedItems(prevState => ({
      ...prevState,
      [storeId]: {
        ...prevState[storeId],
        [orderType]: {
          ...prevState[storeId]?.[orderType],
          [productId]: undefined,
        },
      },
    }));
  };

  // 장바구니 합계
  const calculateTotals = () => {
    let productAmount = 0;
    let discount = 0;
    let totalAmount = 0;
    let selectedCount = 0;

    cartItems.forEach(store => {
      ['singleOrderProducts', 'regularOrderProducts'].forEach(orderType => {
        store[orderType].forEach(product => {
          if (selectedItems[store.customerId]?.[orderType]?.[product.productId]) {
            selectedCount++;
            const discountRate = product.productDiscount / 100;
            const discountedPrice = product.productPrice * (1 - discountRate);
            productAmount += product.productPrice * product.quantity;
            discount += (product.productPrice - discountedPrice) * product.quantity;
            totalAmount += discountedPrice * product.quantity;
          }
        });
      });
    });

    return {
      productAmount,
      discount,
      totalAmount: Math.round(totalAmount),
      selectedCount,
    };
  };

  // 구독 주기 선택하기
  const handleSubscriptionPeriodSelect = storeId => {
    setSelectedStore(storeId);
    setModalState(true);
  };

  // 구독 주기 설정
  const handlePeriodSelection = period => {
    setSelectedPeriod(period);
    setModalState(false);
    console.log(`Store ${selectedStore}의 구독 주기가 ${period}로 설정되었습니다.`);
  };

  const handleOrder = () => {
    const orderData = cartItems
      .map(store => ({
        customerId: store.customerId,
        singleOrderProducts: store.singleOrderProducts
          .filter(product => selectedItems[store.customerId]?.singleOrderProducts?.[product.productId])
          .map(product => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        regularOrderProducts: store.regularOrderProducts
          .filter(product => selectedItems[store.customerId]?.regularOrderProducts?.[product.productId])
          .map(product => ({
            productId: product.productId,
            quantity: product.quantity,
            subscriptionPeriod: selectedPeriod,
          })),
      }))
      .filter(store => store.singleOrderProducts.length > 0 || store.regularOrderProducts.length > 0);

    console.log('주문 데이터:', orderData); // TODO: API 호출
  };

  const totals = calculateTotals();

  return (
    <>
      <div className='flex flex-col w-full h-full'>
        <div className='flex items-center gap-3 p-4 mb-2 bg-white'>
          <Checkbox
            color='purple'
            onChange={e => handleSelectAll(e.target.checked)}
            checked={Object.values(selectedItems).every(
              store => Object.values(store?.singleOrderProducts || {}).every(Boolean) && Object.values(store?.regularOrderProducts || {}).every(Boolean)
            )}
          />
          <span>모두 선택</span>
        </div>

        <div className='flex-1'>
          {cartItems.map(store => (
            <CartStore
              key={store.customerId}
              store={store}
              selectedItems={selectedItems[store.customerId]}
              onSelectProduct={handleSelectProduct}
              onQuantityChange={handleQuantityChange}
              onDelete={handleDelete}
              onSubscriptionPeriodSelect={handleSubscriptionPeriodSelect}
            />
          ))}
          <PaymentSummaryPre productAmount={totals.productAmount} discount={totals.discount} totalAmount={totals.totalAmount} />
        </div>

        <div className='flex w-full py-4 bg-white border-t-[14px] px-3'>
          <div className='flex items-end justify-between w-5/6 gap-2 py-4 mr-3 text-xl'>
            <span className='text-sm font-semibold'>{`${totals.selectedCount}개 선택`}</span>
            <span className='font-bold text-main'>{`${totals.totalAmount.toLocaleString()}원`}</span>
          </div>
          <BottomButton buttonText='구매하기' buttonStyle='bg-main text-white' buttonFunc={handleOrder} />
        </div>
      </div>

      <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} headerText='배송 주기 선택' isButton={false}>
        <div className='flex flex-col items-start space-y-4'>
          {cycleContent.map(content => (
            <button key={content.value} onClick={() => handlePeriodSelection(content.value)} className='p-2 text-lg text-gray-500'>
              {content.text}
            </button>
          ))}
        </div>
      </SlideUpModal>
    </>
  );
};

export default Cart;
