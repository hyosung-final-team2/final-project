import {Modal} from 'flowbite-react';
import {customModalTheme} from '../../common/Modal/ModalStyle';
import {useState, memo, useEffect} from 'react';

import PaymentInfoSection from './PaymentInfoSection/PaymentInfoSection';
import AddressInfoSection from './AddressInfoSection/AddressInfoSection';
import MemberInfo from '../MemberInfo.jsx';
import {useDeleteMember, useGetMemberDetail} from "../../../api/Customer/MemberList/MemberModal/queris.js";

const MemberInsertModal = ({isOpen, setOpenModal, selectedMemberDetail}) => {
    const commonButtonStyles = 'px-8 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

    const INITIAL_MEMBER_OBJ = {
        memberName: '', // NOT NULL
        memberPhone: '', // NOT NULL
        memberEmail: '', // NOT NULL
        addresses: [],
        paymentMethods: {
            cardList: [],
            accountList: [],
        },
    };

    const {data: memberDetail} = useGetMemberDetail(selectedMemberDetail.memberId, selectedMemberDetail.pending);
    const member = memberDetail?.data?.data;

    const MemberInfoData = {
        memberName: member?.memberName || '',
        memberEmail: member?.memberEmail || '',
        memberPhone: member?.memberPhone || '',
        memberCreatedAt: member?.createdAt !== null ? member?.createdAt || '' : '-',
    };


    const {mutate: deleteMutate} = useDeleteMember(selectedMemberDetail.memberId, selectedMemberDetail.pending, selectedMemberDetail.currentPage);

    const [isAllValuePossible, setIsAllValuePossible] = useState(false);
    const [memberRegisterObj, setMemberRegisterObj] = useState(INITIAL_MEMBER_OBJ);

    const updateFormValue = ({updateType, value}) => {
        setMemberRegisterObj({...memberRegisterObj, [updateType]: value});
    };

    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {

    },[])

    return (
        <Modal
            dismissible
            show={isOpen}
            theme={customModalTheme}
            onClose={() => {
                setIsUpdate(false)
                setOpenModal(false);
            }}
            size='4xl'
        >
            <Modal.Header>
                <div className='text-3xl font-bold'>{isUpdate ? "회원 수정" : "회원 상세"}</div>
            </Modal.Header>

            <Modal.Body>
                <MemberInfo MemberInfoData={MemberInfoData} isUpdate={isUpdate} onlyInfo={true} searchable={false} title='회원정보' isPending={selectedMemberDetail.pending}/>

                { !selectedMemberDetail.pending ?
                    <>
                        {/* 회원 결제수단 정보 */}
                        <PaymentInfoSection memberPaymentMethods={member?.paymentMethods} isUpdate={isUpdate}/>

                        {/* 회원 주소지 정보 */}
                        <AddressInfoSection memberAddresses={member?.addresses} isUpdate={isUpdate}/>
                    </>
                    :
                   null

                }

            </Modal.Body>
            <Modal.Footer>
                {
                    !isUpdate ? <>
                        <button
                            onClick={() => setIsUpdate(true)}
                            className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}>수정
                        </button>
                        <button
                            onClick={() => {
                                deleteMutate(selectedMemberDetail.memberId, selectedMemberDetail.pending)
                                setIsUpdate(false)
                                setOpenModal(false)
                            }}
                            className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}>삭제
                        </button>
                    </> : <>
                      <button
                          className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}>저장
                      </button>
                      <button
                          onClick={() => setIsUpdate(false)}
                          className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}>취소
                      </button>
                    </>
                }
            </Modal.Footer>
        </Modal>
    );
};

export default memo(MemberInsertModal);
