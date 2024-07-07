const ProductCategory = () => {
  return (
    <div className='bg-gray-50 p-4 rounded-lg'>
      <div className='mb-2 text-lg font-bold'>카테고리</div>
      <div className='mt-4'>
        <label className='block mb-2 text-sm font-medium text-gray-900'>카테고리</label>
        <select className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-transparent'>
          <option value='식품'>식품</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </div>
  );
};

export default ProductCategory;
