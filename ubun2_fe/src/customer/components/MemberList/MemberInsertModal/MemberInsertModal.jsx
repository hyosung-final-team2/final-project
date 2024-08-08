import { Modal } from 'flowbite-react';
import { customModalTheme } from '../../common/Modal/ModalStyle';
import { useState, memo, useEffect } from 'react';

import PaymentInfoSection from './PaymentInfoSection/PaymentInfoSection';
import AddressInfoSection from './AddressInfoSection/AddressInfoSection';
import MemberInfo from '../MemberInfo.jsx';
import { useDeleteMember, useGetMemberDetail, useUpdateMember } from '../../../api/Customer/MemberList/MemberModal/queris.js';
import useMemberUpdateStore from '../../../store/MemberInsertModal/memberUpdateStore.js';
import { useSendPersonalAlarmMember } from '../../../api/notification/queris.js';

const MemberInsertModal = ({ isOpen, setOpenModal, selectedMemberDetail, currentPage }) => {
  const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  const {
    deletedPaymentMethods,
    deletedAddresses,
    setIsUpdateGlobal,
    addDeletedPaymentMethod,
    addDeletedAddresses,
    resetDeletedPaymentMethods,
    resetDeletedAddresses,
  } = useMemberUpdateStore(state => ({
    isUpdateGlobal: state.isUpdateGlobal,
    setIsUpdateGlobal: state.setIsUpdateGlobal,
    deletedPaymentMethods: state.deletedPaymentMethods,
    deletedAddresses: state.deletedAddresses,
    addDeletedPaymentMethod: state.addDeletedPaymentMethod,
    addDeletedAddresses: state.addDeletedAddresses,
    resetDeletedPaymentMethods: state.resetDeletedPaymentMethods,
    resetDeletedAddresses: state.resetDeletedAddresses,
  }));

  const { data: memberDetail } = useGetMemberDetail(selectedMemberDetail.memberId, selectedMemberDetail.pending);
  const member = memberDetail?.data?.data;
  // ============================================================

  // 회원 정보 수정

  const INITIAL_MEMBER_OBJ = {
    memberName: '', // NOT NULL
    memberPhone: '', // NOT NULL
    memberEmail: '', // NOT NULL
    memberCreatedAt: member?.createdAt || '-',
    addresses: [],
    paymentMethods: [],
  };

  const [memberData, setMemberData] = useState(INITIAL_MEMBER_OBJ); // 변경용 데이터
  const [initialData, setInitialData] = useState(INITIAL_MEMBER_OBJ); // 복원용 데이터

  useEffect(() => {
    if (isOpen && !selectedMemberDetail.pending) {
      const newData = {
        memberName: member?.memberName || '',
        memberEmail: member?.memberEmail || '',
        memberPhone: member?.memberPhone || '',
        memberCreatedAt: member?.createdAt || '-',
        addresses: member?.addresses || [],
        paymentMethods: member?.paymentMethods || [],
      };
      setMemberData(newData);
      setInitialData(newData);
    } else if (isOpen && selectedMemberDetail.pending) {
      setPendingMemberData(INITIAL_MEMBER_OBJ);
    }
  }, [isOpen, selectedMemberDetail, member]);

  const handlePaymentMethodAdd = paymentMethod => {
    setMemberData(prevState => ({
      ...prevState,
      paymentMethods: [...prevState.paymentMethods, paymentMethod],
    }));
  };

  const handlePaymentMethodDelete = paymentMethod => {
    if (!paymentMethod.paymentMethodId) {
      setMemberData(prevState => ({
        ...prevState,
        paymentMethods: prevState.paymentMethods.filter(pm =>
          paymentMethod.paymentMethodType === 'CARD' ? pm.cardNumber !== paymentMethod.paymentNumber : pm.accountNumber !== paymentMethod.paymentNumber
        ),
      }));
    } else {
      addDeletedPaymentMethod({
        paymentMethodId: paymentMethod.paymentMethodId,
        accountNumber: null,
        bankName: null,
        cardCompanyName: null,
        cardNumber: null,
      });
      setMemberData(prevState => ({
        ...prevState,
        paymentMethods: prevState.paymentMethods.filter(pm => pm.paymentMethodId !== paymentMethod.paymentMethodId),
      }));
    }
  };

  const handleAddressAdd = address => {
    setMemberData(prevState => ({
      ...prevState,
      addresses: [...prevState.addresses, address],
    }));
  };

  const handleAddressDelete = Address => {
    if (!Address.addressId) {
      setMemberData(prevState => ({
        ...prevState,
        addresses: prevState.addresses.filter(ad => ad.address !== Address.noneSplitAddress),
      }));
    } else {
      addDeletedAddresses({
        addressId: Address.addressId,
        address: null,
      });
      setMemberData(prevState => ({
        ...prevState,
        addresses: prevState.addresses.filter(ad => ad.addressId !== Address.addressId),
      }));
    }
  };

  // ============================================================

  // 가입대기 회원 정보 수정

  const INITIAL_PENDING_MEMBER_OBJ = {
    memberName: '',
    memberEmail: '',
    memberPhone: '',
    memberCreatedAt: '-',
  };

  const [pendingMemberData, setPendingMemberData] = useState(INITIAL_PENDING_MEMBER_OBJ);

  useEffect(() => {
    if (isOpen && selectedMemberDetail.pending) {
      setPendingMemberData({
        memberName: member?.memberName || '',
        memberEmail: member?.memberEmail || '',
        memberPhone: member?.memberPhone || '',
        memberCreatedAt: member?.createdAt || '-',
      });
    } else if (isOpen && !selectedMemberDetail.pending) {
      setPendingMemberData(INITIAL_PENDING_MEMBER_OBJ);
    }
  }, [isOpen, selectedMemberDetail, member]);

  // =============================================================

  const { mutate: updateMutate } = useUpdateMember(currentPage);

  const handleInputChange = (field, value) => {
    if (selectedMemberDetail.pending) {
      setPendingMemberData(prevState => ({
        ...prevState,
        [field]: value,
      }));
    } else {
      setMemberData(prevState => ({
        ...prevState,
        [field]: value,
      }));
    }
  };

  const handleUpdateMember = () => {
    if (selectedMemberDetail.pending) {
      // 가입 대기 회원 정보 수정
      const { memberCreatedAt, ...requestData } = pendingMemberData;
      const pendingRequestData = Object.fromEntries(
        Object.entries(requestData).map(([key, value]) => [`pending${key.charAt(0).toUpperCase() + key.slice(1)}`, value])
      );
      updateMutate({ memberId: selectedMemberDetail.memberId, isPending: selectedMemberDetail.pending, requestData: pendingRequestData });
    } else {
      const updatedPaymentMethods = [...memberData.paymentMethods, ...deletedPaymentMethods];
      const updatedAddresses = [...memberData.addresses, ...deletedAddresses];
      const updatedMemberData = { ...memberData, paymentMethods: updatedPaymentMethods, addresses: updatedAddresses };
      updateMutate({ memberId: selectedMemberDetail.memberId, isPending: selectedMemberDetail.pending, requestData: updatedMemberData });
    }
  };

  const { mutate: deleteMutate } = useDeleteMember(selectedMemberDetail.memberId, selectedMemberDetail.pending, selectedMemberDetail.currentPage);

  const [isUpdate, setIsUpdate] = useState(false);

  const { mutate: deleteMemberMutate } = useSendPersonalAlarmMember(pendingMemberData?.memberName);

  return (
    <Modal
      dismissible
      show={isOpen}
      theme={customModalTheme}
      onClose={() => {
        setIsUpdate(false);
        resetDeletedPaymentMethods();
        resetDeletedAddresses();
        setIsUpdateGlobal(false);
        setOpenModal(false);
      }}
      size='4xl'
    >
      <Modal.Header>
        <div className='text-3xl font-bold'>{isUpdate ? '회원 수정' : '회원 상세'}</div>
      </Modal.Header>

      <Modal.Body>
        {/*<MemberInfo MemberInfoData={MemberInfoData} isUpdate={isUpdate} onlyInfo={true} searchable={false} title='회원정보' isPending={selectedMemberDetail.pending}/>*/}

        <MemberInfo
          MemberInfoData={selectedMemberDetail.pending ? pendingMemberData : memberData}
          isUpdate={isUpdate}
          onlyInfo={true}
          searchable={false}
          title='회원정보'
          isPending={selectedMemberDetail.pending}
          handleInputChange={handleInputChange}
        />

        {!selectedMemberDetail.pending ? (
          <>
            {/* 회원 결제수단 정보 */}
            <PaymentInfoSection
              memberPaymentMethods={memberData?.paymentMethods}
              isUpdate={isUpdate}
              handlePaymentMethodAdd={handlePaymentMethodAdd}
              handlePaymentMethodDelete={handlePaymentMethodDelete}
            />

            {/* 회원 주소지 정보 */}
            <AddressInfoSection
              memberAddresses={memberData?.addresses}
              isUpdate={isUpdate}
              handleAddressAdd={handleAddressAdd}
              handleAddressDelete={handleAddressDelete}
            />
          </>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        {!isUpdate ? (
          <>
            <button
              onClick={() => {
                setIsUpdate(true);
                setIsUpdateGlobal(true);
              }}
              className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}
            >
              수정
            </button>
            <button
              onClick={() => {
                deleteMutate(selectedMemberDetail.memberId, selectedMemberDetail.pending);
                deleteMemberMutate();
                setIsUpdate(false);
                setIsUpdateGlobal(false);
                setOpenModal(false);
              }}
              className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}
            >
              삭제
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                handleUpdateMember();
                setIsUpdate(false);
                setIsUpdateGlobal(false);
                resetDeletedPaymentMethods();
                resetDeletedAddresses();
              }}
              className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}
            >
              저장
            </button>
            <button
              onClick={() => {
                setIsUpdate(false);
                setIsUpdateGlobal(false);
                resetDeletedPaymentMethods();
                resetDeletedAddresses();
                setMemberData(initialData);
              }}
              className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}
            >
              취소
            </button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default memo(MemberInsertModal);
