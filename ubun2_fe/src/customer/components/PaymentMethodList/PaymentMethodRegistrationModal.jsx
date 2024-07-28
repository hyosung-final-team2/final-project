import { Modal } from 'flowbite-react';
import { customModalTheme } from '../common/Modal/ModalStyle';
import MemberInfo from '../common/Info/MemberInfo';
import { useGetMemberPayments } from '../../api/PaymentMethod/Modal/queris';
import useAddressModalStore from '../../store/Address/addressModalStore';
import { useEffect } from 'react';
import PaymentInfo from './PaymentInfo';
import MemberPaymentTable from './MemberPaymentTable/MemberPaymentTable';
import useAddressStore from '../../store/Address/useAddressStore';

const PaymentMethodRegistrationModal = ({ isOpen, setOpenModal }) => {
  const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';
  const { selectedMember, setSelectedMember } = useAddressModalStore();
  const { setSelectedMemberId } = useAddressStore();

  const { data: memberPayments, refetch: refetchPayments } = useGetMemberPayments(selectedMember?.memberId);

  useEffect(() => {
    if (selectedMember?.memberId) {
      refetchPayments();
    }
  }, [selectedMember, refetchPayments]);

  const paymentLists = memberPayments?.data?.data || [];

  const handleOnClose = () => {
    setOpenModal(false);
    setSelectedMemberId(null);
    setSelectedMember(null);
  };

  const handleConfirm = () => {
    setOpenModal(false);
    setSelectedMemberId(null);
    setSelectedMember(null);
  };

  return (
    <Modal dismissible show={isOpen} onClose={handleOnClose} size='5xl' theme={customModalTheme}>
      <Modal.Header>
        <div className='text-3xl font-bold'>결제수단 등록</div>
      </Modal.Header>
      <Modal.Body>
        <MemberInfo title='회원정보' searchable={true} />
        {selectedMember && <PaymentInfo />}
        {selectedMember && <MemberPaymentTable payments={paymentLists} title={`${selectedMember.name}님의 결제수단`} />}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleConfirm} className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}>
          확인
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentMethodRegistrationModal;
