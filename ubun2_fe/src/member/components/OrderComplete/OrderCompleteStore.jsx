import Single from '../../../assets/images/single.svg';
import Subscription from '../../../assets/images/subscription.svg';
import ProductItemReadOnly from '../common/productItem/ProductItemReadOnly';

const OrderCompleteStore = ({ store }) => {
  const { businessName, orderType, products } = store;

  return (
    <div className='flex flex-col gap-2 px-4 py-3 mb-3 bg-white'>
      <div className='flex justify-between w-full py-2 mt-2'>
        <h2 className='pb-2 text-2xl font-semibold text-main'>{businessName}</h2>
        {orderType === '정기 주문' ? (
          <div className='flex'>
            <div className='flex items-center gap-1 p-1 px-2 text-xs bg-orange-200 rounded-3xl'>
              <Subscription />
              <span>정기 주문</span>
            </div>
          </div>
        ) : (
          <div className='flex'>
            <div className='flex items-center gap-1 p-1 px-2 text-xs bg-blue-200 rounded-3xl'>
              <Single />
              <span>단건 주문</span>
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-col w-full gap-8 '>
        <div className='flex flex-col w-full gap-3 bg-white'>
          <div className='flex items-center pb-2 border-b'>
            <div className='flex gap-3 text-gray-500'></div>
          </div>
          <div className='flex flex-col gap-5'>
            {products.map(product => (
              <ProductItemReadOnly key={product.productId} {...product} isComplete={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCompleteStore;
