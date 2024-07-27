import { Modal } from 'flowbite-react';
import { customModalTheme } from '../common/Modal/ModalStyle';
import { useRegisterAddress } from '../../api/Address/AddressModal/queris';
import MemberInfo from '../common/Info/MemberInfo';
import AddressInput from '../common/Input/AddressInput';
import MemberAddressTable from './MemberAddressTable/MemberAddressTable';
import { useGetMemberAddresses } from '../../api/Address/AddressTable/queris';
import useAddressModalStore from '../../store/Address/addressModalStore';
import { useEffect } from 'react';

const AddressRegistrationModal = ({ isOpen, setOpenModal }) => {
  const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';
  const { selectedMember, setSelectedMember } = useAddressModalStore();

  const { mutate: registerMutate } = useRegisterAddress();
  const { data: memberAddresses, refetch: refetchAddresses } = useGetMemberAddresses(selectedMember?.memberId);

  useEffect(() => {
    if (selectedMember?.memberId) {
      refetchAddresses();
    }
  }, [selectedMember, refetchAddresses]);

  const addressList = memberAddresses?.data?.data || [];

  const initialInfos = [
    {
      placeholder: '우편번호',
      value: '',
      label: '우편번호',
    },
    {
      placeholder: '도로명주소',
      value: '',
      label: '도로명주소',
    },
    {
      placeholder: '상세주소',
      value: '',
      label: '상세주소',
    },
  ];

  const handleSubmit = addressData => {
    registerMutate(addressData);
    setOpenModal(false);
  };

  const handleOnClose = () => {
    setOpenModal(false);
    setSelectedMember(null);
  };

  return (
    <Modal dismissible show={isOpen} onClose={handleOnClose} size='5xl' theme={customModalTheme}>
      <Modal.Header>
        <div className='text-3xl font-bold'>주소 등록</div>
      </Modal.Header>
      <Modal.Body>
        <MemberInfo title='회원정보' searchable={true} />
        {selectedMember && <AddressInput infos={initialInfos} title='주소 추가' />}
        {selectedMember && <MemberAddressTable memberAddresses={addressList} title={`${selectedMember.name}님의 주소 목록`} />}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleSubmit} className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}>
          등록
        </button>
        <button onClick={() => setOpenModal(false)} className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}>
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressRegistrationModal;
