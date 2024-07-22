import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import { useNavigate } from 'react-router-dom';
import ProductItemReadOnly from '../../common/productItem/ProductItemReadOnly';

const OrderList = ({ order }) => {
  const navigate = useNavigate();
  const statusText =
    order.orderStatus === 'PENDING' ? (
      <span className='font-bold text-purple-500'>승인 대기</span>
    ) : order.orderStatus === 'APPROVE' ? (
      <span className='font-bold text-blue-500'>승인</span>
    ) : (
      <span className='font-bold text-red-500'>승인 취소</span>
    );

  const handleMoveOrderDetail = () => {
    navigate(`/mypage/order/${order.orderId}`);
  };
  return (
    <div className='p-2 py-4 mb-4 bg-white rounded-lg'>
      <div className='flex items-start justify-between'>
        <div className='flex gap-1'>
          <span className='font-bold w-fit'>{order.orderProducts[0].productName}</span>
          <span>{`외 ${order.orderProducts.length}개`}</span>
        </div>
        <div className='flex gap-1' onClick={handleMoveOrderDetail}>
          <span className='text-main'>주문번호 {order.orderId}</span>
          <ChevronRightIcon className='w-5 text-main' />
        </div>
      </div>
      <div className='flex gap-3 '>
        <span>{order.createdAt}</span>
        {statusText}
      </div>
      <div className='flex flex-col mt-4'>
        <ProductItemReadOnly {...order.orderProducts[0]} />
      </div>
    </div>
  );
};

export default OrderList;
