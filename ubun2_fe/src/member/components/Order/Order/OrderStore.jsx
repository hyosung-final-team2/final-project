import SingleOrder from './SingleOrder';
import SubscriptionOrder from './SubscriptionOrder';

const OrderStore = ({ store }) => {
  return (
    <div className='p-4 py-3 mt-2 mb-2 bg-white'>
      <div className='flex items-center w-full px-4 py-2'>
        <h2 className='pb-2 text-xl font-semibold text-main'>{store.businessName}</h2>
      </div>
      <div className='flex flex-col w-full gap-8 p-4'>
        {store.singleOrderProducts && store.singleOrderProducts.length > 0 && <SingleOrder singleOrderProducts={store.singleOrderProducts} />}
        {store.regularOrderProducts && store.regularOrderProducts.length > 0 && <SubscriptionOrder regularOrderProducts={store.regularOrderProducts} />}
      </div>
    </div>
  );
};

export default OrderStore;
