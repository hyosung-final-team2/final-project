import {useGetAllCategories} from "../../../api/Product/ProductList/ProductInsertModal/queris.js";

const ProductCategory = ({ product, onlyInfo = false, title, handleInputChange }) => {
    const {data: categoryList } = useGetAllCategories()
    const categories = categoryList?.data?.data
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
          value={product?.categoryName || ''}
          onChange={e => handleInputChange(e)}
          disabled={onlyInfo}
        >
            <option value='' disabled >카테고리를 선택해주세요</option>
            {categories?.map((category) => {
                return <option key={category.categoryId} value={category.categoryName}>{category.categoryName}</option>
            })}
        </select>
      </div>
    </div>
  );
};

export default ProductCategory;
