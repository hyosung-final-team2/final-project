import MemberModal from '../MemberModal/MemberModal';
import { Table } from 'flowbite-react';
import TablePagination from '../../common/Pagination/TablePagination';
import { customTableTheme } from '../../common/Table/tableStyle';
import TableHead from '../../common/Table/TableHead';
import { tableColumn } from '../../common/Table/tableIndex';
import MemberTableFeature from './MemberTableFeature';
import MemberTableRow from './MemberTableRow';
import ExcelModal from '../ExcelModal/ExcelModal';
import DynamicTableBody from '../../common/Table/DynamicTableBody.jsx';

import { useEffect, useState } from 'react';
import { useGetMembers } from '../../../api/Customer/MemberList/MemberTable/queris.js';
import { useQueryClient } from '@tanstack/react-query';
import { getMembers } from '../../../api/Customer/MemberList/MemberTable/memberTable.js';
import { useGetMemberDetail } from '../../../api/Customer/MemberList/MemberModal/queris.js';
import MemberInsertModal from "../MemberInsertModal/MemberInsertModal.jsx";
import MemberRegisterModal from "../MemberRegisterModal/MemberRegisterModal.jsx";

const MemberTable = () => {

  const [openMemberDetailModal, setOpenMemberDetailModal] = useState(false);
  const [openExcelModal, setOpenExcelModal] = useState(false);
  const [openInsertModal, setOpenInsertModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const [selectedMembers, setSelectedMembers] = useState([]); // 체크된 멤버
  console.log(selectedMembers)

  const [selectedMemberDetail, setSelectedMemberDetail] = useState({ memberId: null, pending: null, currentPage: null }); // 선택된 멤버 ID - 모달 오픈 시
  const [searchTerm, setSearchTerm] = useState(''); // 검색된 단어
  const [searchCategory, setSearchCategory] = useState(''); // 검색할 카테고리 (드롭다운)

  const [currentPage, setCurrentPage] = useState(1);
  const { data: members } = useGetMembers(currentPage);

  const totalPages = members?.data?.data?.totalPages ?? 5;
  const memberList = members?.data?.data?.content || [];

  const { data, refetch } = useGetMemberDetail(selectedMemberDetail.memberId, selectedMemberDetail.pending);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['member', nextPage],
        queryFn: () => getMembers(nextPage),
      });
    }
  }, [currentPage, queryClient, totalPages]);

  const handleAllChecked = checked => {
    if (checked) {
      setSelectedMembers(memberList.map(member => ({ memberId: member.memberId, pending: member.pending, memberName:member.memberName , memberPhone:member.memberPhone.split("-").join("") })));
    } else {
      setSelectedMembers([]);
    }
  };

  const handleRowChecked = (id, pending, memberName, memberPhone) => {
    setSelectedMembers(prev => {
      const isSelected = prev.find(member => member.memberId === id);
      if (isSelected) {
        return prev.filter(member => member.memberId !== id);
      } else {
        return [...prev, { memberId: id, pending,memberName,memberPhone:memberPhone.split("-").join("")}];
      }
    });
  };

  const handleRowClick = async (memberId, pending, page) => {
    await setSelectedMemberDetail({ memberId: memberId, pending: pending, currentPage: page });
    await refetch();
    // await setOpenMemberDetailModal(true);
    await setOpenInsertModal(true)
  };

  const handleSearch = (term, category) => {
    setSearchTerm(term);
    setSearchCategory(category);
    if (term.trim() === '' || category === '카테고리') return;

    // TODO: 검색 API 호출
    console.log(`${category} : ${term}`);
  };

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      {/* 각종 기능 버튼 : 검색, 정렬 등 */}
      <MemberTableFeature tableColumns={tableColumn.member} onSearch={handleSearch} setExcelModal={setOpenExcelModal} setOpenRegisterModal={setOpenRegisterModal} selectedMembers={selectedMembers}/>

      {/* 테이블 */}
      <div className='px-4 shadow-md'>
        <Table hoverable theme={customTableTheme}>
          <TableHead tableColumns={tableColumn.member} allChecked={selectedMembers.length === memberList?.length} setAllChecked={handleAllChecked} />

          <DynamicTableBody
            dataList={memberList}
            TableRowComponent={MemberTableRow}
            dynamicKey='memberEmail'
            dynamicId='memberId'
            selectedMembers={selectedMembers}
            handleRowChecked={handleRowChecked}
            // setOpenModal={setOpenMemberDetailModal}
            setOpenModal={handleRowClick} // 변경된 부분: handleRowClick 사용
            currentPage={currentPage}
          />
        </Table>
      </div>
      {/* 페이지네이션 */}
      <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />

      {/* 회원 조회 모달 */}
      <MemberModal
        isOpen={openMemberDetailModal}
        setOpenModal={setOpenMemberDetailModal}
        title='회원 상세'
        primaryButtonText='수정'
        secondaryButtonText='삭제'
        selectedMemberDetail={selectedMemberDetail}
      />

      {/* 엑셀 조회 모달 */}
      <ExcelModal isOpen={openExcelModal} setOpenModal={setOpenExcelModal} />

    {/* 회원 조회 & 수정 모달 */}
      <MemberInsertModal isOpen={openInsertModal} setOpenModal={setOpenInsertModal} selectedMemberDetail={selectedMemberDetail} currentPage={currentPage}/>

    {/*  회원 등록 모달*/}
      <MemberRegisterModal isOpen={openRegisterModal} setOpenModal={setOpenRegisterModal} />
    </div>
  );
};

export default MemberTable;
