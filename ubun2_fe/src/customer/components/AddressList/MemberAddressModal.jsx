import { Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { customModalTheme } from '../common/Modal/ModalStyle';
import MemberInfo from '../common/Info/MemberInfo';
import MemberAddressTable from './MemberAddressTable/MemberAddressTable';
import MemberAddressEditModal from './MemberAddressEditModal';
import AddressInput from '../common/Input/AddressInput';
import useAddressStore from '../../store/Address/useAddressStore';
import { useGetAddressDetail } from '../../api/Address/AddressModal/queris';

const MemberAddressModal = ({ isOpen, setOpenModal, addressId, setAddressId }) => {
  const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  const { isEditMode, setIsEditMode, selectedMemberId } = useAddressStore();
  const [isUpdate, setIsUpdate] = useState(false);

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

  const { data: detail, isLoading } = useGetAddressDetail(addressId);

  const memberInfo = detail?.data?.data;

  const member = {
    name: memberInfo?.memberName || '',
    email: memberInfo?.memberEmail || '',
    phone: memberInfo?.memberPhone || '',
    createdAt: memberInfo?.registrationDate !== null ? memberInfo?.registrationDate || '' : '-',
  };

  useEffect(() => {
    if (!isOpen) {
      // 모달이 닫힐 때 실행
      setIsEditMode(false);
      setAddressId(null);
    }
  }, [isOpen, setIsEditMode, setAddressId]);

  return (
    <>
      <Modal
        dismissible
        show={isOpen}
        onClose={() => {
          setIsUpdate(false), setOpenModal(false);
        }}
        size='5xl'
        theme={customModalTheme}
      >
        {!isEditMode ? (
          <>
            <Modal.Header>
              <div className='text-3xl font-bold'>{isUpdate ? '주소지 수정' : '회원 상세'}</div>
            </Modal.Header>
            <Modal.Body>
              <div className='space-y-4 flex-2'>
                <MemberInfo member={member} searchable={true} title='회원정보' isUpdate={isUpdate} />
                {isUpdate && <AddressInput infos={initialInfos} title='주소 추가' isUpdate={isUpdate} />}
                <MemberAddressTable memberAddresses={memberInfo?.addresses} title='홍길동님의 주소 목록' />
              </div>
            </Modal.Body>
          </>
        ) : (
          <MemberAddressEditModal />
        )}

        <Modal.Footer>
          {!isUpdate ? (
            <>
              <button onClick={() => setIsUpdate(true)} className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}>
                수정
              </button>
              <button
                onClick={() => {
                  setIsUpdate(false);
                  setOpenModal(false);
                }}
                className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}
              >
                삭제
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsUpdate(false)} className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}>
                확인
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MemberAddressModal;
