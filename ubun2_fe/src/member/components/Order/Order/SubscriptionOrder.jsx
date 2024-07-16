import Subscription from '../../../../assets/images/subscription.svg';
import ProductItemReadOnly from '../../common/productItem/ProductItemReadOnly';

const SubscriptionOrder = ({ regularOrderProducts }) => {
  return (
    <div className='flex flex-col w-full gap-3 bg-white'>
      <div className='flex justify-between px-4 pb-2 border-b'>
        <div className='flex items-center'>
          <Subscription className='w-5 mr-2' />
          <h2 className='text-lg font-semibold'>정기배송</h2>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        {regularOrderProducts.map(product => (
          <ProductItemReadOnly key={product.productId} {...product} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionOrder;
