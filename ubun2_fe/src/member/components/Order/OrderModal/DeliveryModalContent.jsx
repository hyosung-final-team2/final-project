const DeliveryModalContent = ({ deliveryContent, handleDeliverySelection }) => {
  return (
    <div className='flex flex-col items-start space-y-4'>
      {deliveryContent.map(content => (
        <button key={content.value} onClick={() => handleDeliverySelection(content)} className='p-2 text-lg text-gray-500'>
          {content.text}
        </button>
      ))}
    </div>
  );
};

export default DeliveryModalContent;
