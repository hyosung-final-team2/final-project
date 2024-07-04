import { Modal } from 'flowbite-react';
import { customModalTheme } from '../../common/Modal/modalStyle';
import { useState, memo } from 'react';

import useMemberInsertStatusStore from '../../../store/MemberInsertModal/memberInsertStatus';
import PaymentInfoSection from './PaymentInfoSection/PaymentInfoSection';
import AddressInfoSection from './AddressInfoSection/AddressInfoSection';
import MemberInfo from '../../common/Info/MemberInfo';

const MemberInsertModal = ({ isOpen, setOpenModal }) => {
  const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  const { isNewMember, setIsNewMember } = useMemberInsertStatusStore(state => ({
    isNewMember: state.isNewMember, // true : 등록  - false : 수정
    setIsNewMember: state.setIsNewMember,
  }));

  const INITIAL_MEMBER_OBJ = {
    memberName: '', // NOT NULL
    memberPhone: '', // NOT NULL
    memberEmailFirst: '', // NOT NULL
    memberEmailSecond: '', // NOT NULL
    memberPayment: {
      cardList: [],
      accountList: [],
    },
    memberAddressList: [],
  };

  const [isAllValuePossible, setIsAllValuePossible] = useState(false);
  const [memberRegisterObj, setMemberRegisterObj] = useState(INITIAL_MEMBER_OBJ);
  console.log(memberRegisterObj);

  const updateFormValue = ({ updateType, value }) => {
    setMemberRegisterObj({ ...memberRegisterObj, [updateType]: value });
  };

  return (
    <Modal
      dismissible
      show={isOpen}
      theme={customModalTheme}
      onClose={() => {
        setOpenModal(false);
      }}
      size='4xl'
    >
      <Modal.Header>
        <div className='text-3xl font-bold'>회원 등록</div>
      </Modal.Header>

      <Modal.Body>
        <MemberInfo onlyInfo={false} searchable={false} title='회원정보' />

        {/* 회원 결제수단 정보 */}
        <PaymentInfoSection />

        {/* 회원 주소지 정보 */}
        <AddressInfoSection />
      </Modal.Body>
      <Modal.Footer>
        <button className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}>등록</button>
        <button className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}>취소</button>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(MemberInsertModal);
