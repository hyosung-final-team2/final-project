const ProductCategory = ({ product, onlyInfo = false, title, handleInputChange }) => {
  return (
    <div className='bg-gray-50 p-4 rounded-lg'>
      <div className='mb-2 text-lg font-bold'>{title}</div>
      <div className='mt-4'>
        <label className='block mb-2 text-sm font-medium text-gray-900'>카테고리</label>
        <select
          className={`
        text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 block w-full p-2 mb-4 
        ${onlyInfo ? 'bg-gray-100 border-transparent' : 'bg-white border-gray-300'}
    `}
          name='categoryName'
          value={product?.categoryName}
          onChange={e => handleInputChange(e)}
          disabled={onlyInfo}
        >
          <option value='과일'>과일</option>
          <option value='유제품'>유제품</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </div>
  );
};

export default ProductCategory;
