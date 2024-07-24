import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import { useNavigate } from 'react-router-dom';
import ProductItemReadOnly from '../../common/productItem/ProductItemReadOnly';

const OrderList = ({ order }) => {
  const navigate = useNavigate();
  const statusText =
    order.orderStatus === 'PENDING' ? (
      <span className='font-bold text-purple-500'>승인 대기</span>
    ) : order.orderStatus === 'APPROVED' ? (
      <span className='font-bold text-blue-500'>승인</span>
    ) : order.orderStatus === 'DENIED' ? (
      <span className='font-bold text-red-500'>주문 취소</span>
    ) : (
      <span className='font-bold text-gray-500'>상태 미정</span>
    );

  const handleMoveOrderDetail = () => {
    navigate(
      `/member/app/mypage/${
        order.subscription ? `subscription-order/${order?.subscriptionOrderProducts[0].customerId}` : `single-order/${order?.orderProducts[0].customerId}`
      }/${order.orderId}`
    );
  };

  const products = order.subscription ? order.subscriptionOrderProducts : order.orderProducts;
  const firstProduct = products && products.length > 0 ? products[0] : null;

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className='p-2 py-4 mb-2 bg-white rounded-lg'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center justify-center gap-1 text-center'>
          <span className='text-lg font-bold w-fit'>{firstProduct ? firstProduct.productName : '상품 정보 없음'}</span>
          <span>{products.length - 1 ? `외 ${products.length - 1}개` : ''}</span>
        </div>
        <div className='flex gap-1 font-bold' onClick={handleMoveOrderDetail}>
          <span className='text-main'>주문번호 {order.orderId}</span>
          <ChevronRightIcon className='w-5 text-main' />
        </div>
      </div>
      <div className='flex gap-3 mt-1 text-gray-500'>
        <span>{formatDate(order.createdAt)}</span>
        {statusText}
      </div>
      <div className='flex flex-col mt-4'>
        {firstProduct && (
          <ProductItemReadOnly
            productImagePath={firstProduct.productImagePath || ''}
            productDescription={firstProduct.productDescription || ''}
            productName={firstProduct.productName}
            productPrice={firstProduct.price}
            productDiscount={0} // 리스트에서는 할인 정보 생략
            quantity={firstProduct.quantity}
            productImageOriginalName={firstProduct.productImageOriginalName || ''}
          />
        )}
      </div>
    </div>
  );
};

export default OrderList;
