import { Checkbox, Select } from 'flowbite-react';
import { useEffect, useMemo, useState } from 'react';
import { ORDER_LIST_DUMMY_DATA } from '../../components/Order/orderDummyData';
import OrderStatusBadge from '../../components/common/badge/OrderStatusBadge';
import PaymentSummaryCompleted from '../../components/common/paymentSummary/PaymentSummaryCompleted';
import ProductItemReadOnly from '../../components/common/productItem/ProductItemReadOnly';
import SubscriptionProductItemEditable from '../../components/common/productItem/SubscriptionProductItemEditable';

const MySubscriptionOrderDetail = () => {
  const [orderData, setOrderData] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const targetOrder = ORDER_LIST_DUMMY_DATA.subscriptionOrderList.find(order => order.orderId === 3);
    setOrderData(targetOrder);
    if (targetOrder) {
      const firstCycle = Math.min(...targetOrder.orderProducts.map(product => product.cycleNumber));
      setSelectedCycle(firstCycle);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    if (!orderData) return [];
    return orderData.orderProducts.filter(product => product.cycleNumber === selectedCycle);
  }, [orderData, selectedCycle]);

  const isDeliveryEditable = useMemo(() => {
    if (!filteredProducts.length) return false;
    const today = new Date();
    const deliveryDate = new Date(filteredProducts[0].deliveryDate);
    return deliveryDate > today;
  }, [filteredProducts]);

  const isAllSelected = useMemo(() => {
    return filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length;
  }, [filteredProducts, selectedProducts]);

  if (!orderData) return <div>Loading...</div>;

  const paymentInfo = {
    paymentName: orderData.paymentType === 'CARD' ? orderData.cardName : orderData.accountName,
    paymentContent: orderData.paymentType === 'CARD' ? orderData.cardNumber : orderData.accountNumber,
  };

  const totalOrderPrice = filteredProducts.reduce((sum, product) => sum + product.totalPrice, 0);

  const onCycleChange = cycleNumber => {
    setSelectedCycle(Number(cycleNumber));
    setIsEditing(false);
  };

  const maxCycle = Math.max(...orderData.orderProducts.map(product => product.cycleNumber));

  const handleEdit = () => {
    setIsEditing(true);
    setSelectedProducts([]);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedProducts([]);
  };

  const handleSelect = productId => {
    setSelectedProducts(prev => (prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]));
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.productId));
    }
  };

  const handleDelete = () => {
    // TODO: 선택된 상품 삭제 로직 구현
    console.log(`삭제될 제품 id: ${selectedProducts.join(', ')}`);
    setSelectedProducts([]);
  };

  return (
    <div className='bg-gray-100'>
      <div className='flex flex-col gap-3 p-4'>
        <div className='flex items-center justify-between py-4 text-main'>
          <h1 className='text-2xl font-bold'>주문번호 {orderData.orderId}</h1>
          <OrderStatusBadge status='SUBSCRIPTION' />
        </div>

        <div className='flex items-center justify-between'>
          <div className='mb-4'>
            <label htmlFor='cycle-select' className='block mb-2 text-sm font-medium text-gray-500'>
              * 정기주문 회차
            </label>
            <Select id='cycle-select' value={selectedCycle} onChange={e => onCycleChange(e.target.value)} className='mt-2 w-fit'>
              {[...Array(maxCycle)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1} 회차
                </option>
              ))}
            </Select>
          </div>

          <div className='flex flex-col items-end text-lg text-main'>
            <p>{`${maxCycle} 회차`}</p>
            <p>{`${orderData.createdAt} ~`}</p>
          </div>
        </div>

        <div className='px-4 py-8 mb-4 bg-white rounded-3xl'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-bold text-gray-600'>주문 내역</h2>
            {isDeliveryEditable && !isEditing && (
              <span onClick={handleEdit} className='text-gray-500 underline cursor-pointer'>
                수정
              </span>
            )}
          </div>
          {isEditing && (
            <div className='flex justify-between p-4'>
              <div className='flex items-center'>
                <Checkbox checked={isAllSelected} onChange={handleSelectAll} className='mr-2' color={'purple'} />
                <span>전체 선택</span>
              </div>
              <div className='flex gap-3 text-gray-400 underline'>
                <span onClick={handleDelete} className={`cursor-pointer ${selectedProducts.length === 0 ? 'opacity-50' : ''}`}>
                  선택 삭제
                </span>
                <span onClick={handleCancel} className='cursor-pointer'>
                  취소
                </span>
              </div>
            </div>
          )}
          {filteredProducts.map(product =>
            isEditing ? (
              <SubscriptionProductItemEditable
                key={product.productId}
                {...product}
                isSelected={selectedProducts.includes(product.productId)}
                onSelect={handleSelect}
              />
            ) : (
              <ProductItemReadOnly key={product.productId} {...product} />
            )
          )}
        </div>
        <PaymentSummaryCompleted productAmount={totalOrderPrice} discount={0} totalAmount={totalOrderPrice} paymentInfo={paymentInfo} style={'rounded-3xl'} />
      </div>
    </div>
  );
};

export default MySubscriptionOrderDetail;
