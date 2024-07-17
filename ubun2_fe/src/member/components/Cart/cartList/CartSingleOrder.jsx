import Single from '../../../../assets/images/single.svg';
import ProductItemEditable from '../../common/productItem/ProductItemEditable';

const CartSingleOrder = ({ singleOrderProducts, selectedItems, onSelectProduct, onQuantityChange, onDelete }) => {
  return (
    <div className='flex flex-col w-full gap-3 bg-white'>
      <div className='flex items-center px-4'>
        <Single className='w-5 mr-2' />
        <h2 className='text-lg font-semibold'>단건배송</h2>
      </div>
      <div className='w-full border-b'></div>
      <div className='flex flex-col gap-5 pt-2'>
        {singleOrderProducts.map(product => (
          <ProductItemEditable
            key={product.productId}
            {...product}
            isSelected={selectedItems.some(item => item.productId === product.productId)}
            onSelect={checked => onSelectProduct(product, checked, 'singleOrderProducts')}
            onQuantityChange={newQuantity => onQuantityChange(product.productId, newQuantity)}
            onDelete={() => onDelete(product.productId)}
          />
        ))}
      </div>
    </div>
  );
};

export default CartSingleOrder;
