import {Table} from "flowbite-react";

const SkeletonDynamicTableBody = ({ TableRowComponent, skeletonData }) => {


    return (
        <Table.Body className='divide-y'>
            {skeletonData?.map((data,idx) => {
                return (
                    // 본인이 개발하는 TableRow 형식에 맞는 컴포넌트를 Props로 내려서 사용
                        <TableRowComponent
                            key={idx}
                            {...data}
                        />
                );
            })}
        </Table.Body>
    )
}

export default SkeletonDynamicTableBody