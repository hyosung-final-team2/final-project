import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyAddresses } from '../../../api/Address/queries';
import useOrderDataStore from '../../../store/order/orderDataStore';

const OrderDeliveryInfo = ({ selectedDelivery, handleDeliveryModal, setIsOrderButtonDisabled }) => {
  const navigate = useNavigate();
  const { data: addresses } = useGetMyAddresses();
  const { selectedAddressId, updateOrderData } = useOrderDataStore();
  const [defaultAddress, setDefaultAddress] = useState(null);

  useEffect(() => {
    if (addresses?.data?.data) {
      const defaultAddr = addresses?.data?.data.find(address => address.defaultStatus);
      if (defaultAddr) {
        updateOrderData({ addressId: defaultAddr.addressId });
        setDefaultAddress(defaultAddr);
        setIsOrderButtonDisabled(false);
      }
    }
  }, [addresses, updateOrderData]);

  const selectedAddress = addresses?.data?.data.find(address => address.addressId === selectedAddressId) || defaultAddress;

  const handleAddressNavigation = () => {
    navigate('/member/app/addresses', { state: { fromOrder: true } });
  };

  return (
    <div className='flex flex-col gap-5 p-6 bg-white'>
      <div className='flex items-center w-full gap-3 mb-4 font-bold'>
        <div onClick={handleAddressNavigation} className='inline-flex p-2 border-none rounded-md text-main bg-main bg-opacity-5'>
          <input
            type='input'
            value={selectedAddress?.addressNickname || '주소를 선택해주세요'}
            className='min-w-0 bg-transparent cursor-pointer max-w-[10dvw]'
            readOnly
          />
          <ChevronDownIcon className='w-5' />
        </div>
        <p>으로 받기</p>
      </div>

      {selectedAddress && (
        <div className='flex items-center justify-between gap-3 text-gray-500'>
          <div className='w-4/5 mb-4'>
            <p className='font-bold'>{selectedAddress.recipientName}</p>
            <p>{selectedAddress.recipientPhone}</p>
            <p className='text-sm text-gray-600'>{selectedAddress.address}</p>
          </div>

          <div>
            <button color='dark' className='w-full px-4 py-2 text-white rounded-md bg-main' onClick={handleAddressNavigation}>
              <span className='text-sm'>수정</span>
            </button>
          </div>
        </div>
      )}

      <div onClick={handleDeliveryModal} className='flex w-full gap-3 p-3 text-gray-500 bg-gray-100 border-none rounded-xl'>
        <input
          type='input'
          value={selectedDelivery?.text || '배송 요청사항을 선택해주세요'}
          className='w-full bg-gray-100 cursor-pointer'
          placeholder='배송 시 요청사항'
          readOnly
        />
        <ChevronDownIcon className='w-5' />
      </div>
    </div>
  );
};

export default OrderDeliveryInfo;
