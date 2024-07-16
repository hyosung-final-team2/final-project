import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';

const OrderDeliveryInfo = ({ selectedAddress, selectedDelivery, handleAddressModal, handleDeliveryModal }) => {
  return (
    <div className='flex flex-col gap-5 p-6 bg-white'>
      <div className='flex items-center gap-3 mb-4 font-bold'>
        <div onClick={handleAddressModal} className='flex p-2 border-none rounded-md text-main bg-main bg-opacity-10'>
          <input type='input' value={selectedAddress.addressNickname} className='bg-transparent cursor-pointer bg-opacity-10 w-fit' readOnly />
          <ChevronDownIcon className='w-5' />
        </div>

        <p>으로 받기</p>
      </div>

      <div className='flex items-center justify-between gap-3 text-gray-500'>
        <div className='w-4/5 mb-4'>
          <p className='font-bold'>{selectedAddress.recipientName}</p>
          <p>{selectedAddress.recipientPhone}</p>
          <p className='text-sm text-gray-600'>{selectedAddress.address}</p>
        </div>

        <div>
          <button color='dark' className='w-full px-4 py-2 text-white rounded-md bg-main'>
            <span className='text-sm'>수정</span>
          </button>
        </div>
      </div>
      <div onClick={handleDeliveryModal} className='flex w-full gap-3 p-3 text-gray-500 bg-gray-100 border-none rounded-xl'>
        <input type='input' value={selectedDelivery.text} className='w-full bg-gray-100 cursor-pointer' placeholder='배송 시 요청사항' readOnly />
        <ChevronDownIcon className='w-5' />
      </div>
    </div>
  );
};

export default OrderDeliveryInfo;
