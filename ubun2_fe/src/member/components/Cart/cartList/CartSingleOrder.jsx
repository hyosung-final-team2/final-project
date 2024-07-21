import Single from '../../../../assets/images/single.svg';
import ProductItemEditable from '../../common/productItem/ProductItemEditable';

const CartSingleOrder = ({ singleOrderProducts, selectedItems, onSelectProduct, onQuantityChange, onDelete }) => {
  const filteredProducts = singleOrderProducts.filter(product => product.orderOption === 'SINGLE');

  if (filteredProducts.length === 0) return null;

  return (
    <div className='flex flex-col w-full gap-3 bg-white'>
      <div className='flex items-center px-4'>
        <Single className='w-5 mr-2' />
        <h2 className='text-lg font-semibold'>단건배송</h2>
      </div>
      <div className='w-full border-b'></div>
      <div className='flex flex-col gap-5 pt-2'>
        {filteredProducts.map(product => (
          <ProductItemEditable
            key={product.cartProductId}
            {...product}
            isSelected={selectedItems.some(item => item.cartProductId === product.cartProductId)}
            onSelect={checked => onSelectProduct(product, checked)}
            onQuantityChange={onQuantityChange}
            onDelete={() => onDelete(product.cartProductId)}
          />
        ))}
      </div>
    </div>
  );
};

export default CartSingleOrder;
