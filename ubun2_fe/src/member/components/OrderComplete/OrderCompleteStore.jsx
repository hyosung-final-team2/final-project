import Single from '../../../assets/images/single.svg';
import Subscription from '../../../assets/images/subscription.svg';
import { getCycleText } from '../Cart/cycleContent';
import ProductItemReadOnly from '../common/productItem/ProductItemReadOnly';

const OrderCompleteStore = ({ store }) => {
  const { businessName, orderType, products, intervalDays } = store;

  return (
    <div className='flex flex-col gap-2 py-3 my-4 mb-2 bg-white border-2 border-gray-100 rounded-lg'>
      <div className='flex justify-between w-full px-4 py-2'>
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
      <div className='w-full border-b'></div>
      <div className='flex flex-col w-full gap-8 px-4'>
        <div className='flex flex-col w-full gap-3 bg-white'>
          <div className='flex items-end justify-end gap-3 text-gray-500'>{orderType === '정기 주문' && intervalDays && getCycleText(intervalDays)}</div>
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
