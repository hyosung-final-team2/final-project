import MinusIcon from '@heroicons/react/24/outline/MinusIcon';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import { useEffect, useState } from 'react';

const QuantityButton = ({ initialQuantity = 1, onQuantityChange, cartProductId }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(cartProductId, newQuantity);
    }
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(cartProductId, newQuantity);
  };

  return (
    <div className='flex items-center'>
      <button
        onClick={decreaseQuantity}
        className='flex items-center justify-center text-gray-600 bg-gray-200 w-7 h-7 rounded-l-md focus:outline-none focus:bg-gray-300'
      >
        <MinusIcon className='w-3' />
      </button>
      <div className='flex items-center justify-center w-8 text-center bg-white border-t border-b border-gray-200 h-7'>{quantity}</div>
      <button
        onClick={increaseQuantity}
        className='flex items-center justify-center text-gray-600 bg-gray-200 w-7 h-7 rounded-r-md focus:outline-none focus:bg-gray-300'
      >
        <PlusIcon className='w-3' />
      </button>
    </div>
  );
};

export default QuantityButton;
