import { Radio } from 'flowbite-react';

const ProductInfo = () => {
  return (
    <div className='bg-gray-50 p-4 rounded-lg'>
      <div className='mb-2 text-lg font-bold'>상품 정보</div>
      <div className='mt-4 flex flex-col gap-3'>
        <div>
          <label className='block text-sm font-medium text-gray-900'>상품명</label>
          <input
            type='text'
            className='bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2 mb-4 border-transparent'
            placeholder='상품명을 입력하세요'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-900'>상품 소개</label>
          <textarea
            className='bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 border-transparent'
            placeholder='상품 소개를 입력하세요'
            rows='4'
          ></textarea>
        </div>

        <div className='flex flex-col mb-4 text-sm'>
          <h3 className='block mb-2 text-sm font-medium text-gray-900'>게시 여부</h3>
          <div className='flex items-center space-x-4'>
            <Radio id='cms' name='paymentMethod' value='CMS 결제' onChange={() => setPaymentMethod('CMS 결제')} />
            <label className='text-custom-font-gray' htmlFor='cms'>
              게시
            </label>
            <Radio id='card' name='paymentMethod' value='카드 결제' defaultChecked onChange={() => setPaymentMethod('카드 결제')} />
            <label htmlFor='card'>미게시</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
