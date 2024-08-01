import { Table } from 'flowbite-react';
import TablePagination from '../../common/Pagination/TablePagination';
import { customTableTheme } from '../../common/Table/tableStyle';
import TableHead from '../../common/Table/TableHead';
import { tableColumn } from '../../common/Table/tableIndex';
import MemberTableFeature from './MemberTableFeature';
import MemberTableRow from './MemberTableRow';
import ExcelModal from '../ExcelModal/ExcelModal';
import DynamicTableBody from '../../common/Table/DynamicTableBody.jsx';

import {useEffect, useRef, useState} from 'react';
import {useDeleteSelectedMember, useGetMembers} from '../../../api/Customer/MemberList/MemberTable/queris.js';
import { useQueryClient } from '@tanstack/react-query';
import { getMembers } from '../../../api/Customer/MemberList/MemberTable/memberTable.js';
import {useGetMemberDetail} from '../../../api/Customer/MemberList/MemberModal/queris.js';
import MemberInsertModal from "../MemberInsertModal/MemberInsertModal.jsx";
import MemberRegisterModal from "../MemberRegisterModal/MemberRegisterModal.jsx";
import useMemberTableStore from "../../../store/MemberTable/memberTableStore.js";
import SkeletonTable from "../../Skeleton/SkeletonTable.jsx";
import useSkeletonStore from "../../../store/skeletonStore.js";
import SkeletonMemberTableFeature from "../Skeleton/SkeletonMemberTableFeature.jsx";
import SkeletonMemberTableRow from "../Skeleton/SkeletonMemberTableRow.jsx";
import NoDataTable from "../../common/Table/NoDataTable.jsx";

const MemberTable = () => {

  const [openExcelModal, setOpenExcelModal] = useState(false);
  const [openInsertModal, setOpenInsertModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const [selectedMembers, setSelectedMembers] = useState([]); // 체크된 멤버
  const [selectedMemberDetail, setSelectedMemberDetail] = useState({ memberId: null, pending: null, currentPage: null }); // 선택된 멤버 ID - 모달 오픈 시

  const { sort, updateSort } = useMemberTableStore()
  const {searchCategory, setSearchCategory} = useMemberTableStore() // 검색할 카테고리 (드롭다운)
  const {searchKeyword, setSearchKeyword} = useMemberTableStore() // 검색된 단어
  const { setTotalElements } = useMemberTableStore()
  const { resetData } = useMemberTableStore()

  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 8
  const { data: members,refetch: refetchMembers , isLoading } = useGetMembers(currentPage, PAGE_SIZE, sort, searchCategory, searchKeyword);

  const totalPages = members?.data?.data?.totalPages;
  const totalElementsFromPage = members?.data?.data?.totalElements;
  const memberList = members?.data?.data?.content || [];

  const { data, refetch } = useGetMemberDetail(selectedMemberDetail.memberId, selectedMemberDetail.pending);
  const { mutate:selectedMemberDeleteMutate } = useDeleteSelectedMember(selectedMembers, currentPage,sort, searchCategory, searchKeyword);

  const dropdownRef = useRef(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['member', nextPage, sort, searchCategory, searchKeyword],
        queryFn: () => getMembers(nextPage,PAGE_SIZE, sort, searchCategory, searchKeyword),
      });
    }
  }, [currentPage, queryClient, searchCategory, searchKeyword, sort, totalPages]);

  useEffect(() => {
    setSelectedMembers([])
  }, [currentPage,memberList]);

  //  이 부분 추가
  useEffect(() => {
    if (totalElementsFromPage !== undefined) {
      setTotalElements(totalElementsFromPage);
    }
  }, [totalElementsFromPage, setTotalElements]);

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
    await setOpenInsertModal(true)
  };

  const handleSearch = (term, category) => {
    setSearchKeyword(term);
    setSearchCategory(category);
    if (term.trim() === '' || category === '카테고리') return;
    // 변경 부분
    refetchMembers()
    setCurrentPage(1)
  };

  const handleSort = async (column,sortType) => {
    await updateSort(column,sortType);
    refetchMembers()
    setCurrentPage(1)
  }

  const handleRegisterSuccess = () => {
    const newTotalPages = Math.ceil((members.data.data.totalElements + 1) / PAGE_SIZE); //  받고싶은 데이터 양 , 페이지네이션 불러오는 함수도 size 해당 변수로 넣어줘야함
    if (currentPage === newTotalPages) {
      refetchMembers();
    } else {
      setCurrentPage(newTotalPages);
    }
  };

  const NoDataTableButtonFunc = () => {
    setOpenRegisterModal(true)
  }

  const handleDropdownButtonClick = () => {
    if (dropdownRef.current) {
      dropdownRef.current.click();
    }
  };

  const {toggleIsReset} = useMemberTableStore();
  const handleDataReset = async () => {
    await toggleIsReset()
    await resetData()
    await refetchMembers()
    await setCurrentPage(1)
  }

  useEffect(() => {
    return () => {
      resetData()
    }
  },[])

  // isLoading 시, skeletonTable
  const { setSkeletonData, setSkeletonTotalPage, setSkeletonSortData, setSkeletonSearchCategory, setSkeletonSearchKeyword, setSkeletonTotalElements, skeletonTotalElement } = useSkeletonStore()

  useEffect(() => {
    if (!isLoading) {
      setSkeletonData(memberList);
      setSkeletonTotalPage(totalPages)
      setSkeletonSortData(sort)
      setSkeletonSearchCategory(searchCategory);
      setSkeletonSearchKeyword(searchKeyword);
      if (skeletonTotalElement !== totalElementsFromPage) {
        setSkeletonTotalElements(totalElementsFromPage)
      }
    }
  }, [memberList, totalPages, sort,searchKeyword,searchCategory, setSkeletonTotalPage, setSkeletonSortData, setSkeletonData, setSkeletonSearchCategory, setSkeletonSearchKeyword, isLoading]);

  if (isLoading) {
    // 각자의 TableFeature, TableRow, TaleColumn 만 넣어주면 공통으로 동작
    return <SkeletonTable SkeletonTableFeature={SkeletonMemberTableFeature} TableRowComponent={SkeletonMemberTableRow} tableColumns={tableColumn.member.list}/>
  }

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      {/* 각종 기능 버튼 : 검색  등 */}
      <MemberTableFeature tableColumns={tableColumn.member.search}
                          onSearch={handleSearch}
                          setExcelModal={setOpenExcelModal}
                          setOpenRegisterModal={setOpenRegisterModal}
                          selectedMembers={selectedMembers}
                          handleDataReset={handleDataReset}
                          selectedMemberDeleteMutate={selectedMemberDeleteMutate}
                          dropdownRef={dropdownRef}
      />

      {/* 테이블 */}
      <div className='px-4'>
        <Table hoverable theme={customTableTheme}>
          <TableHead tableColumns={tableColumn.member.list} headerType="member" allChecked={selectedMembers.length === memberList?.length} setAllChecked={handleAllChecked} handleSort={handleSort}/>
          {
            memberList.length > 0 ? (
                <DynamicTableBody
                    dataList={memberList}
                    TableRowComponent={MemberTableRow}
                    dynamicKey='memberEmail'
                    dynamicId='memberId'
                    selectedMembers={selectedMembers}
                    handleRowChecked={handleRowChecked}
                    setOpenModal={handleRowClick}
                    currentPage={currentPage}
                />
            ) : (
                <NoDataTable text={searchCategory && searchKeyword ? "검색 결과가 없습니다!" : "등록된 회원이 없습니다."}
                             buttonText={searchCategory && searchKeyword ? "다시 검색하기":"회원 등록하기"}
                             buttonFunc={searchCategory && searchKeyword ? handleDropdownButtonClick : NoDataTableButtonFunc}
                             colNum={tableColumn.member.list.length}
                />
            )
          }

        </Table>
      </div>
      {/* 페이지네이션 */}
      {isLoading === false && memberList.length > 0 ? (
          <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />
          ) : <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4 invisible' />
      }

      {/* 엑셀 조회 모달 */}
      {openExcelModal && <ExcelModal isOpen={openExcelModal} setOpenModal={setOpenExcelModal} /> }

    {/* 회원 조회 & 수정 모달 */}
      {openInsertModal && <MemberInsertModal isOpen={openInsertModal} setOpenModal={setOpenInsertModal} selectedMemberDetail={selectedMemberDetail} setCurrentPage={setCurrentPage} currentPage={currentPage} setSelectedMemberDetail={setSelectedMemberDetail}/>}

    {/*  회원 등록 모달*/}
      {openRegisterModal && <MemberRegisterModal isOpen={openRegisterModal} setOpenModal={setOpenRegisterModal} handleRegisterSuccess={handleRegisterSuccess}/>}
    </div>
  );
};

export default MemberTable;
