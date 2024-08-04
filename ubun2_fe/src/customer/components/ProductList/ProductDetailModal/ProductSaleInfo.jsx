const ProductSaleInfo = ({ product, onlyInfo = false, title, handleInputChange }) => {
  return (
    <div className='bg-gray-50 p-4 rounded-lg'>
      <div className='mb-2 text-lg font-bold'>{title}</div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900'>가격</label>
          <input
            type='text'
            name='productPrice'
            value={onlyInfo? `${product?.productPrice.toLocaleString()}원`: product?.productPrice?.toLocaleString()}
            onChange={e => handleInputChange(e)}
            disabled={onlyInfo}
            className={`
        text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 block w-full p-2 mb-4 
        ${onlyInfo ? 'bg-gray-100 border-transparent' : 'bg-white border-gray-300'}
    `}
            placeholder='ex) 10000원'
          />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900'>재고</label>
          <input
            type='text'
            name='stockQuantity'
            value={onlyInfo? `${product?.stockQuantity}개`: product?.stockQuantity}
            onChange={e => handleInputChange(e)}
            disabled={onlyInfo}
            className={`
        text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 block w-full p-2 mb-4 
        ${onlyInfo ? 'bg-gray-100 border-transparent' : 'bg-white border-gray-300'}
    `}
            placeholder='ex) 1개'
          />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900'>할인</label>
          <input
            type='text'
            name='productDiscount'
            value={onlyInfo?`${product?.productDiscount}%`:product?.productDiscount}
            onChange={e => handleInputChange(e)}
            disabled={onlyInfo}
            className={`
        text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 block w-full p-2 mb-4 
        ${onlyInfo ? 'bg-gray-100 border-transparent' : 'bg-white border-gray-300'}
    `}
            placeholder='ex) 10%'
          />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900'>배송 종류</label>
          <select
            className={`
        text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 block w-full p-2 mb-4 
        ${onlyInfo ? 'bg-gray-100 border-transparent' : 'bg-white border-gray-300'}
    `}
            value={product?.orderOption|| ''}
            name='orderOption'
            onChange={e => handleInputChange(e)}
            disabled={onlyInfo}
          >
              <option value='' disabled>배송 주기를 선택해주세요.</option>
            <option value='SUBSCRIPTION'>정기배송</option>
            <option value='SINGLE'>단건배송</option>
            <option value='BOTH'>단건&정기</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductSaleInfo;
