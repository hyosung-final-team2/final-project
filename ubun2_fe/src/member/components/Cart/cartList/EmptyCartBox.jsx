import { useNavigate } from 'react-router-dom';

const EmptyCartBox = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center h-full px-4 py-20 text-center'>
      <h2 className='mb-4 text-2xl font-bold'>장바구니에 담긴 상품이 없어요</h2>
      <p className='mb-6 text-gray-600'>원하는 상품을 담아보세요</p>
      <button onClick={() => navigate('/member/app/home')} className='px-6 py-3 text-white rounded-full bg-main'>
        상점 보러 가기
      </button>
    </div>
  );
};

export default EmptyCartBox;
