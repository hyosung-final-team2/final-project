import { useNavigate } from 'react-router-dom';
import { useGetMyAddresses } from '../../api/Address/queries';
import useAddressStore from '../../store/address/AddressStore';
import useOrderDataStore from '../../store/order/orderDataStore';
import AddressItem from '../../components/Address/AddressItem';
import BottomButton from '../../components/common/button/BottomButton';
import { useLocation } from 'react-router-dom';

const ChooseAddress = ({ title }) => {
  const navigate = useNavigate();
  const { memberId } = useAddressStore(state => ({ memberId: state.memberId }));
  const { resetAddressData } = useAddressStore();
  const { data: addresses } = useGetMyAddresses(memberId);
  const { updateOrderData } = useOrderDataStore();
  const location = useLocation();
  const isFromMyPage = location.state?.isFromMyPage;

  const addressList = addresses?.data?.data || [];
  const buttonStyle = 'bg-main text-white';

  const { setSelectedAddressId } = useOrderDataStore();

  const isAddressEmpty = addressList.length === 0;
  const handleAddressSelect = addressId => {
    setSelectedAddressId(addressId);
    updateOrderData({ addressId });
    navigate('/member/app/order');
  };

  const handleEdit = address => {
    resetAddressData();
    navigate(`/member/app/addresses/register`, {
      state: {
        isRegister: false,
        recipientName: address.recipientName,
        address: address.address,
        recipientPhone: address.recipientPhone,
        addressNickname: address.addressNickname,
        defaultStatus: address.defaultStatus,
        addressId: address.addressId,
        isFromMyPage: isFromMyPage,
      },
    });
  };

  const handleRegister = () => {
    resetAddressData();
    navigate('/member/app/addresses/register', {
      state: {
        isRegister: true,
        recipientName: '',
        address: '',
        recipientPhone: '',
        addressNickname: '',
        defaultStatus: '',
        addressId: '',
        isFromMyPage: isFromMyPage,
      },
    });
  };

  const handleOnclickBottomButton = () => {
    navigate('/member/app/addresses/register', {
      state: {
        isRegister: true,
        isFromMyPage: isFromMyPage,
      },
    });
  };

  return (
    <div className='relative flex flex-col h-full bg-white border'>
      <div className='flex-grow overflow-auto'>
        <div className='p-4 m-3'>
          <div className='my-4 text-2xl font-extrabold'>{title}상품을 어디로 받을까요?</div>
          {isAddressEmpty ? (
            <div className='flex-grow flex items-center justify-center my-24'>
              <p className='text-gray-500 text-lg font-bold'>등록된 주소가 없어요</p>
            </div>
          ) : (
            addressList.map((address, index) => (
              <AddressItem
                key={index}
                recipientName={address.recipientName}
                memberAddress={address.address}
                recipientPhone={address.recipientPhone}
                addressNickname={address.addressNickname}
                defaultStatus={address.defaultStatus}
                handleEdit={() => handleEdit(address)}
                handleSelect={() => handleAddressSelect(address.addressId)}
              />
            ))
          )}
        </div>

        {isAddressEmpty ? (
          <BottomButton buttonText='주소 등록하기' buttonStyle={buttonStyle} buttonFunc={handleOnclickBottomButton} />
        ) : (
          <div className='flex justify-center pt-4 pb-4 mt-4 border-t'>
            <button className='font-bold text-purple-600' onClick={handleRegister}>
              새로운 주소 +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseAddress;
