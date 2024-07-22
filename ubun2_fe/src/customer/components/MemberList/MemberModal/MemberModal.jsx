import MemberInfo from './MemberInfo';
import MemberAddressTable from './MemberAddressTable/MemberAddressTable';
import MemberPaymentTable from './MemberPaymenetTable/MemberPaymentTable';
import { Modal } from 'flowbite-react';
import { memo } from 'react';

import { customModalTheme } from './modalStyle';
import { useDeleteMember, useGetMemberDetail } from '../../../api/Customer/MemberList/MemberModal/queris.js';

const MemberModal = ({
  isOpen,
  setOpenModal,
  title,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  selectedMemberDetail,
}) => {
  const { data: memberDetail } = useGetMemberDetail(selectedMemberDetail.memberId, selectedMemberDetail.pending);
  const member = memberDetail?.data?.data;

  const MemberInfoData = {
    memberName: member?.memberName || '',
    memberEmail: member?.memberEmail || '',
    memberPhone: member?.memberPhone || '',
    memberCreatedAt: member?.createdAt !== null ? member?.createdAt || '' : '-',
  };

  const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  const { mutate: deleteMutate } = useDeleteMember(selectedMemberDetail.memberId, selectedMemberDetail.pending, selectedMemberDetail.currentPage);

  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => setOpenModal(false)} theme={customModalTheme} size='6xl'>
        <Modal.Header>
          <div className='text-3xl font-bold'>{title}</div>
        </Modal.Header>
        <Modal.Body>
          <div className='space-y-4 flex-2'>
            <MemberInfo member={MemberInfoData} onlyInfo={true} title='회원정보' />
            <MemberAddressTable memberAddresses={member?.addresses} />
            <MemberPaymentTable memberPaymentMethods={member?.paymentMethods} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`${commonButtonStyles} bg-white text-gray-600 hover:text-main hover:bg-slate-50`}
            onClick={onPrimaryClick || (() => setOpenModal(false))}
          >
            <div>{primaryButtonText || '등록'}</div>
          </button>
          <button
            className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}
            onClick={
              onSecondaryClick ||
              (() => {
                deleteMutate();
                setOpenModal(false);
              })
            }
          >
            {secondaryButtonText || '취소'}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(MemberModal);
