import QuantityButton from '../common/button/QuantityButton.jsx';

const SelectQuantityModal = ({ productName, discountedPrice, productQuantity, setProductQuantity, clickCartBtn, stockQuantity }) => {
  const handleQuantityChange = (_, newQuantity) => {
    setProductQuantity(newQuantity);
  };

  return (
    <div className='px-4'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <div className='text-lg text-gray-600'>{productName}</div>
          <div className='text-gray-500'>{discountedPrice?.toLocaleString()}원</div>
        </div>
        <div>
          <QuantityButton initialQuantity={productQuantity} onQuantityChange={handleQuantityChange} cartProductId={null} maxQuantity={stockQuantity} />
        </div>
      </div>
      <hr />
      <div>
        <div className='mt-4 text-lg font-bold'>총 {(discountedPrice * productQuantity)?.toLocaleString()}원</div>
        <div className='mt-4 text-main' onClick={() => clickCartBtn()}>
          장바구니에 추가 <span className='ml-1 font-bold'> {'>'} </span>
        </div>
      </div>
    </div>
  );
};

export default SelectQuantityModal;
