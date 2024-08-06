import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import { useNavigate } from 'react-router-dom';
import OrderStatusBadge from '../../common/badge/OrderStatusBadge';
import OrderItemList from '../../common/productItem/OrderItemList';

const OrderList = ({ order }) => {
  const navigate = useNavigate();

  const handleMoveOrderDetail = () => {
    navigate(`/member/app/mypage/${order.subscription ? `subscription-order/` : `single-order/`}${order.orderId}`);
  };

  const products = order.subscription ? order.subscriptionOrderProducts : order.orderProducts;
  const firstProduct = products && products.length > 0 ? products[0] : null;

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // 주문 상태를 결정하는 함수
  const getOrderStatus = () => {
    if (order.orderStatus === 'DENIED') {
      if (firstProduct) {
        const productStatus = order.subscription ? firstProduct.subscriptionOrderStatus : firstProduct.orderProductStatus;

        return productStatus === 'REJECTED' ? 'REJECTED' : 'DENIED';
      }
    }
    return order.orderStatus;
  };

  const orderStatus = getOrderStatus();

  return (
    <div className='mb-2 border-2 border-gray-100 rounded-lg'>
      <div className='flex items-start justify-between w-full px-4 py-4 border-b'>
        <span className='text-lg font-bold'>{`${formatDate(order.createdAt)}`}</span>
        <div className='flex gap-1 font-bold' onClick={handleMoveOrderDetail}>
          <span className='text-main'>주문번호 {order.orderId}</span>
          <ChevronRightIcon className='w-5 text-main' />
        </div>
      </div>
      <div className='flex items-center justify-between px-4 py-4 text-gray-500'>
        <div className='flex items-center justify-center gap-1 text-center'>
          <span className='text-lg font-bold w-fit'>{firstProduct ? firstProduct.productName : '상품 정보 없음'}</span>
          <span>{products.length - 1 ? `외 ${products.length - 1}개` : ''}</span>
        </div>
        <OrderStatusBadge status={orderStatus} customSize={'text-xs'} />
      </div>
      <div className='flex flex-col '>
        {firstProduct && (
          <OrderItemList
            productImagePath={firstProduct.productImagePath || ''}
            productName={firstProduct.productName || ''}
            quantity={firstProduct.quantity}
            productImageOriginalName={firstProduct.productImageOriginalName || ''}
            totalPrice={order.totalOrderPrice}
            orderStatus={orderStatus}
          />
        )}
      </div>
    </div>
  );
};

export default OrderList;
