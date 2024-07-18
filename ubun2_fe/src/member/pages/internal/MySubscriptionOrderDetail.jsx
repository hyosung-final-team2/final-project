import { Select } from 'flowbite-react';
import { useEffect, useMemo, useState } from 'react';
import { ORDER_LIST_DUMMY_DATA } from '../../components/Order/orderDummyData';
import OrderStatusBadge from '../../components/common/badge/OrderStatusBadge';
import OrderStatusTextBadge from '../../components/common/badge/OrderStatusTextBadge';
import PaymentSummaryCompleted from '../../components/common/paymentSummary/PaymentSummaryCompleted';
import ProductItemReadOnly from '../../components/common/productItem/ProductItemReadOnly';
import SubscriptionProductItemEditable from '../../components/common/productItem/SubscriptionProductItemEditable';

const MySubscriptionOrderDetail = () => {
  const [orderData, setOrderData] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

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
  };

  const handleSave = () => {
    // TODO: 저장 기능
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = productId => {
    // TODO: 삭제 기능
    console.log(`Delete product with id: ${productId}`);
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
              <button onClick={handleEdit} className='px-4 py-2 text-white rounded-md bg-main'>
                수정
              </button>
            )}
            {isEditing && (
              <div>
                <button onClick={handleSave} className='px-4 py-2 mr-2 rounded-md text-badge-green bg-badge-green bg-opacity-30'>
                  저장
                </button>
                <button onClick={handleCancel} className='px-4 py-2 rounded-md text-badge-red bg-badge-red bg-opacity-30'>
                  취소
                </button>
              </div>
            )}
          </div>
          {filteredProducts.length > 0 && (
            <div className='flex items-center gap-3 mb-1 text-gray-600'>
              <h3 className='text-lg font-bold'>{filteredProducts[0].productName}</h3>
              <span>{`외 ${filteredProducts.length - 1} 개`}</span>
            </div>
          )}
          <p className='mb-4 text-sm text-gray-500'>
            {new Date(orderData.createdAt).toLocaleDateString()} <OrderStatusTextBadge status={orderData.orderStatus} />
          </p>
          {filteredProducts.map(product =>
            isEditing ? (
              <SubscriptionProductItemEditable key={product.productId} {...product} onDelete={() => handleDelete(product.productId)} />
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
