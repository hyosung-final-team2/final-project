const ProductSaleInfo = () => {
  return (
    <div className='bg-gray-50 p-4 rounded-lg'>
      <div className='mb-2 text-lg font-bold'>가격 및 재고</div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900'>가격</label>
          <input
            type='text'
            className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 border-transparent'
            placeholder='10000원 (할인가: 9000원)'
          />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900'>재고</label>
          <input
            type='text'
            className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 border-transparent'
            placeholder='재고'
          />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900'>할인</label>
          <input
            type='text'
            className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 border-transparent'
            placeholder='10%'
          />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900'>배송 종류</label>
          <select className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 border-transparent'>
            <option value='정기배송'>정기배송</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductSaleInfo;
