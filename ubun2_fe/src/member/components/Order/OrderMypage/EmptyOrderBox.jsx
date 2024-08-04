import { useNavigate } from 'react-router-dom';

const EmptyOrderBox = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center h-full px-4 text-center'>
      <h2 className='mb-4 text-xl font-bold'>주문 목록이 없어요</h2>
      <p className='mb-6 text-gray-600'>원하는 상품을 주문해보세요</p>
      <button onClick={() => navigate('/member/app/home')} className='px-6 py-3 text-white rounded-full bg-main'>
        상점 보러 가기
      </button>
    </div>
  );
};

export default EmptyOrderBox;
