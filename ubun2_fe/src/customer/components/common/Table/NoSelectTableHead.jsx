import { Table } from 'flowbite-react';
import TableHeadCell from './TableHeadCell';

const NoSelectTableHead = ({ tableColumns, headerType, allChecked, setAllChecked, handleSort, isCheckable = true, nonSort = [] }) => {
  return (
    <Table.Head>
      {/* tableindx에 본인이 개발하는 테이블의 컬럼 넣고 export */}
      {tableColumns.map((item, idx) => {
        if (nonSort.includes(item)) {
          return <TableHeadCell key={idx} colunmName={item} nonSort={true} />;
        }
        return <TableHeadCell key={idx} colunmName={item} />;
      })}
    </Table.Head>
  );
};
export default NoSelectTableHead;
