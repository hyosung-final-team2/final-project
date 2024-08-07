import Single from '../../../../assets/images/single.svg';
import ProductItemReadOnly from '../../common/productItem/ProductItemReadOnly';

const SingleOrder = ({ singleOrderProducts }) => {
  return (
    <div className='flex flex-col w-full gap-3 bg-white'>
      <div className='flex items-center p-4 pb-2 border-b'>
        <Single className='w-5 mr-2' />
        <h2 className='text-lg font-semibold '>단건배송</h2>
      </div>
      <div className='flex flex-col gap-5 p-4'>
        {singleOrderProducts.map(product => (
          <ProductItemReadOnly key={product.productId} {...product} />
        ))}
      </div>
    </div>
  );
};

export default SingleOrder;
