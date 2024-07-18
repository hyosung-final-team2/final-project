import { useEffect, useState } from 'react';
import { ORDER_LIST_DUMMY_DATA } from '../../components/Order/orderDummyData';
import OrderStatusBadge from '../../components/common/badge/OrderStatusBadge';
import OrderStatusTextBadge from '../../components/common/badge/OrderStatusTextBadge';
import PaymentSummaryCompleted from '../../components/common/paymentSummary/PaymentSummaryCompleted';
import ProductItemReadOnly from '../../components/common/productItem/ProductItemReadOnly';

const MySingleOrderDetail = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // orderId가 1인 주문 데이터 찾는다는 가정
    const targetOrder = ORDER_LIST_DUMMY_DATA.orderList.find(order => order.orderId === 1);
    setOrderData(targetOrder);
  }, []);

  if (!orderData) return <div>Loading...</div>;

  const paymentInfo = {
    paymentName: orderData.paymentType === 'CARD' ? orderData.cardName : orderData.accountName,
    paymentContent: orderData.paymentType === 'CARD' ? orderData.cardNumber : orderData.accountNumber,
  };

  const totalOrderPrice = orderData.orderProducts.reduce((sum, product) => sum + product.totalPrice, 0);

  return (
    <div className='bg-gray-100 '>
      <div className='flex flex-col gap-3 p-4'>
        <div className='flex items-center justify-between py-4 text-main'>
          <h1 className='text-2xl font-bold'>주문번호 {orderData.orderId}</h1>
          <OrderStatusBadge status='SINGLE' />
        </div>
        <div className='px-4 py-8 mb-4 bg-white rounded-3xl'>
          <h2 className='mb-4 text-xl font-bold text-gray-600'>주문 내역</h2>
          <div className='flex items-center gap-3 mb-1 text-gray-600'>
            <h3 className='text-lg font-bold'>{orderData.orderProducts[0].productName}</h3>
            <span>{`외 ${orderData.orderProducts.length} 개`}</span>
          </div>
          <p className='mb-4 text-sm text-gray-500'>
            {new Date(orderData.createdAt).toLocaleDateString()} <OrderStatusTextBadge status={orderData.orderStatus} />
          </p>
          {orderData.orderProducts.map(product => (
            <ProductItemReadOnly key={product.productId} {...product} />
          ))}
        </div>
        <PaymentSummaryCompleted productAmount={totalOrderPrice} discount={0} totalAmount={totalOrderPrice} paymentInfo={paymentInfo} style={'rounded-3xl'} />
      </div>
    </div>
  );
};

export default MySingleOrderDetail;
