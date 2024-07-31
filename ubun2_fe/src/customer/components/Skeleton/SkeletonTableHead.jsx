import { Checkbox, Table } from 'flowbite-react';
import SkeletonTableHeadCell from './SkeletonTableHeadCell.jsx';

const SkeletonTableHead = ({ tableColumns, nonSort = [] }) => {
  return (
    <Table.Head>
      <Table.HeadCell className='bg-gray-100'>
        <Checkbox className='text-gray-400' />
      </Table.HeadCell>
      {/* tableindx에 본인이 개발하는 테이블의 컬럼 넣고 export */}
      {tableColumns.map((item, idx) => {
        if (nonSort.includes(item)) {
          return <SkeletonTableHeadCell key={idx} colunmName={item} nonSort={true} />;
        }
        return <SkeletonTableHeadCell key={idx} colunmName={item} />;
      })}
    </Table.Head>
  );
};

export default SkeletonTableHead;
