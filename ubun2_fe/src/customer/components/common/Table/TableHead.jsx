import { Table, Checkbox } from 'flowbite-react';
import TableHeadCell from './TableHeadCell';

const TableHead = ({ tableColumns, headerType, allChecked, setAllChecked, handleSort, isCheckable = true }) => {
  const handleCheckboxChange = () => {
    setAllChecked(!allChecked);
  };

  return isCheckable ? (
    <Table.Head>
      <Table.HeadCell className='bg-gray-100'>
        <Checkbox className='text-gray-400' checked={allChecked} onChange={handleCheckboxChange} />
      </Table.HeadCell>
      {/* tableindx에 본인이 개발하는 테이블의 컬럼 넣고 export */}
      {tableColumns.map((item, idx) => {
        return <TableHeadCell key={idx} colunmName={item} handleSort={handleSort} headerType={headerType} />;
      })}
    </Table.Head>
  ) : (
    <Table.Head>
      {/* tableindx에 본인이 개발하는 테이블의 컬럼 넣고 export */}
      {tableColumns.map((item, idx) => {
        return <TableHeadCell key={idx} colunmName={item} />;
      })}
    </Table.Head>
  );
};
export default TableHead;
