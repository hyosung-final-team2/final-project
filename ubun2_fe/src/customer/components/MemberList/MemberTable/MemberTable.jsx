import MemberTableFeature from './MemberTableFeature';
import MemberModal from '../MemberModal/MemberModal';

import TablePagination from '../../common/Pagination/TablePagination';
import { customTableTheme } from '../../common/Table/tableStyle';
import { Table } from 'flowbite-react';
import TableHead from '../../common/Table/TableHead';
import TableBody from '../../common/Table/TableBody';
import { tableColumn } from '../../common/Table/tableIndex';
import MemberTableRow from './MemberTableRow';

import { useState } from 'react';

const MemberTable = ({ users }) => {
  const [openMemberDetailModal, setOpenMemberDetailModal] = useState(false);

  const [selectedMembers, setSelectedMembers] = useState([]); // 체크된 멤버 ID
  const [searchTerm, setSearchTerm] = useState(''); // 검색된 단어
  const [searchCategory, setSearchCategory] = useState(''); // 검색할 카테고리 (드롭다운)

  console.log(selectedMembers);

  const handleAllChecked = checked => {
    if (checked) {
      setSelectedMembers(users.map(user => user.id));
    } else {
      setSelectedMembers([]);
    }
  };

  const handleRowChecked = memberId => {
    setSelectedMembers(prev => (prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]));
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
      <MemberTableFeature tableColumns={tableColumn.member} onSearch={handleSearch} />

      {/* 테이블 */}
      <div className='shadow-md px-4'>
        <Table hoverable theme={customTableTheme}>
          <TableHead tableColumns={tableColumn.member} allChecked={selectedMembers.length === users.length} setAllChecked={handleAllChecked} />
          <TableBody
            users={users}
            TableRowComponent={MemberTableRow}
            selectedMembers={selectedMembers}
            handleRowChecked={handleRowChecked}
            setOpenModal={setOpenMemberDetailModal}
          />
        </Table>
      </div>
      {/* 페이지네이션 */}
      <TablePagination totalPages={3} containerStyle='bg-white py-4' />

      {/* 회원 조회 모달 */}
      <MemberModal
        isOpen={openMemberDetailModal}
        setOpenModal={setOpenMemberDetailModal}
        title='회원 상세'
        primaryButtonText='수정'
        secondaryButtonText='삭제'
      />
    </div>
  );
};

export default MemberTable;
