// import MemberTableFeature from "../MemberTable/MemberTableFeature.jsx";
import {tableColumn} from "../common/Table/tableIndex.js";
import {Table} from "flowbite-react";
import {customTableTheme} from "../common/Table/tableStyle.js";

import TablePagination from "../common/Pagination/TablePagination.jsx";
import SkeletonTableHead from "./SkeletonTableHead.jsx";
import SkeletonDynamicTableBody from "./SkeletonDynamicTableBody.jsx";
import useSkeletonStore from "../../store/skeletonStore.js";

const SkeletonTable = ({SkeletonTableFeature, TableRowComponent, tableColumns}) => {

    const {skeletonData, skeletonTotalPage} = useSkeletonStore()
    console.log(skeletonData)

    return (
        <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>

            <SkeletonTableFeature/>

            {/* 테이블 */}
            <div className='px-4 shadow-md'>
                <Table theme={customTableTheme}>
                    <SkeletonTableHead tableColumns={tableColumns}/>

                    <SkeletonDynamicTableBody TableRowComponent={TableRowComponent} skeletonData={skeletonData}/>
                </Table>
            </div>
            {/* 페이지네이션 */}
            <TablePagination totalPages={skeletonTotalPage} containerStyle='bg-white py-4' />
        </div>
    );
}

export default SkeletonTable;