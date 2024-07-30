import { Modal } from 'flowbite-react';
import { customModalTheme } from '../common/Modal/ModalStyle';
import MemberInfo from '../common/Info/MemberInfo';
import AddressInput from '../common/Input/AddressInput';
import MemberAddressTable from './MemberAddressTable/MemberAddressTable';
import { useGetMemberAddresses } from '../../api/Address/AddressTable/queris';
import useAddressModalStore from '../../store/Address/addressModalStore';
import { useEffect } from 'react';
import useAddressStore from '../../store/Address/useAddressStore';

const AddressRegistrationModal = ({ isOpen, setOpenModal }) => {
  const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';
  const { selectedMember, setSelectedMember } = useAddressModalStore();
  const { setSelectedMemberId } = useAddressStore();

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

  const handleOnClose = () => {
    setOpenModal(false);
    setSelectedMember(null);
  };

  const handleOnConfirm = () => {
    setOpenModal(false);
    setSelectedMember(null);
    setSelectedMemberId(null);
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
        <button onClick={handleOnConfirm} className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}>
          확인
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressRegistrationModal;
