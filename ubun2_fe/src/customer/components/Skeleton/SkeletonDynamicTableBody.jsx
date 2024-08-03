import { Table } from 'flowbite-react';

const SkeletonDynamicTableBody = ({ TableRowComponent, skeletonData, PAGE_SIZE, colNum }) => {
  const paddedDataList = [...skeletonData];
  while (paddedDataList.length < PAGE_SIZE) {
    paddedDataList.push({
      ['skeletonId']: `empty-${paddedDataList.length}`,
      isEmpty: true,
    });
  }

  return (
    <Table.Body className='divide-y'>
      {paddedDataList?.map((data, idx) => {
        return (
          // 본인이 개발하는 TableRow 형식에 맞는 컴포넌트를 Props로 내려서 사용
          <TableRowComponent key={idx} {...data} isEmpty={data.isEmpty} colNum={colNum} />
        );
      })}
    </Table.Body>
  );
};

export default SkeletonDynamicTableBody;
