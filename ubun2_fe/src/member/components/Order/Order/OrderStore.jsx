import SingleOrder from './SingleOrder';
import SubscriptionOrder from './SubscriptionOrder';

const OrderStore = ({ store }) => {
  const singleOrderProducts = store.cartProducts.filter(product => product.orderOption === 'SINGLE');
  const regularOrderProducts = store.cartProducts.filter(product => product.orderOption === 'SUBSCRIPTION');

  return (
    <div className='p-4 py-3 mt-2 mb-2 bg-white'>
      <div className='flex items-center w-full px-4 py-2'>
        <h2 className='pb-2 text-xl font-semibold text-main'>{store.businessName}</h2>
      </div>
      <div className='flex flex-col w-full gap-8 p-4'>
        {singleOrderProducts.length > 0 && <SingleOrder singleOrderProducts={singleOrderProducts} />}
        {regularOrderProducts.length > 0 && <SubscriptionOrder regularOrderProducts={regularOrderProducts} />}
      </div>
    </div>
  );
};

export default OrderStore;
