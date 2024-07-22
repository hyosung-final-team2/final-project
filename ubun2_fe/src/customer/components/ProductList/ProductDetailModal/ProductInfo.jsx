import { Radio } from 'flowbite-react';


const ProductInfo = ({product, onlyInfo = false, title ,handleInputChange} ) => {

  return (
      <div className='bg-gray-50 p-4 rounded-lg'>
        <div className='mb-2 text-lg font-bold'>{title}</div>
        <div className='mt-4 flex flex-col gap-3'>
          <div>
            <label className='block text-sm font-medium text-gray-900'>상품명</label>
            <input
                type='text'
                name="productName"
                value={product?.productName}
                onChange={(e)=>handleInputChange(e)}
                className={`
        text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 block w-full p-2 mb-4 
        ${onlyInfo ? 'bg-gray-100 border-transparent' : 'bg-white border-gray-300'}
    `}
                placeholder='상품명을 입력하세요'
                disabled={onlyInfo}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-900'>상품 소개</label>
            <textarea
                name="productDescription"
                className={`
        text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 block w-full p-2 mb-4 
        ${onlyInfo ? 'bg-gray-100 border-transparent' : 'bg-white border-gray-300'}
    `}                value={product?.productDescription}
                onChange={(e)=>(handleInputChange(e))}
                placeholder='상품 소개를 입력하세요'
                rows='4'
                disabled={onlyInfo}
            ></textarea>
          </div>

          <div className='flex flex-col mb-4 text-sm'>
            <h3 className='block mb-2 text-sm font-medium text-gray-900'>게시 여부</h3>
            <div className='flex items-center space-x-4'>
              <Radio
                  id='publish'
                  name='productStatus'
                  disabled={onlyInfo}
                   value="true"
                  checked={product?.productStatus === "true"}
                  onChange={(e)=>(handleInputChange(e))}
              />
              <label className='text-custom-font-gray' htmlFor='publish'>
                게시
              </label>
              <Radio
                  id='unpublish'
                  name='productStatus'
                  value="false"
                  disabled={onlyInfo}
                  checked={product?.productStatus === "false"}
                  onChange={(e)=>handleInputChange(e)}
              />
              <label className='text-custom-font-gray' htmlFor='unpublish'>미게시</label>
            </div>
        </div>
      </div>
      </div>
  );
};

export default ProductInfo;
