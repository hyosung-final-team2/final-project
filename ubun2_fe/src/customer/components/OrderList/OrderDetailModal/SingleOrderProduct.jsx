import { List } from 'flowbite-react';

const SingleOrderProduct = ({ orderProductList }) => {
  return (
    <div className='p-3'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-xl font-bold'>상품목록</h3>
      </div>
      <List unstyled className='px-8 py-6 divide-y divide-gray-200 rounded-md dark:divide-gray-700 bg-background-gray'>
        {orderProductList.map(orderProduct => (
          <List.Item key={orderProduct.orderProductId} className='flex items-start gap-6 py-4'>
            <div className='w-2/12 relativecd'>
              <div className='relative' style={{ paddingBottom: '100%' }}>
                <img src={orderProduct.productImagePath} alt='상품이미지' className='absolute inset-0 object-cover w-full h-full rounded-md' />
              </div>
            </div>
            <div className='flex flex-col flex-1 min-w-0 gap-2 ml-4'>
              <p className='text-lg font-bold text-gray-900 dark:text-white'>{orderProduct.productDescription}</p>
              <div className='flex gap-2'>
                <span className='text-sm text-gray-500 dark:text-gray-400'>{orderProduct.productName}</span>
                <span>|</span>
                <span className='text-sm text-gray-500 dark:text-gray-400'>{orderProduct.quantity} 개</span>
              </div>
              <p className='text-lg font-bold text-gray-900 dark:text-white'>{orderProduct.price} 원</p>
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default SingleOrderProduct;
