const AddressModalContent = ({ addressContent, handleAddressSelection }) => {
  return (
    <div className='flex flex-col items-start space-y-4'>
      {addressContent.map(content => (
        <button key={content.addressId} onClick={() => handleAddressSelection(content)} className='w-full p-2 text-lg text-gray-500'>
          <div className='flex flex-col items-start justify-start gap-3 p-3 border-2 border-gray-100 rounded-lg text-start'>
            <div className='flex items-center justify-between w-full gap-5'>
              <p className='text-xl font-bold text-main'>{content.addressNickname}</p>
              {content.defaultStatus && <span className='p-4 text-sm font-bold rounded-md bg-main bg-opacity-10'>기본 배송지</span>}
            </div>
            <p>{content.recipientPhone}</p>
            <p>{content.address}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AddressModalContent;
