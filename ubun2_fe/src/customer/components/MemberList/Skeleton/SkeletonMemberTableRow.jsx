import {Checkbox, Table} from "flowbite-react";
import StatusBadge from "../../common/Badge/StatusBadge.jsx";
import {formatDate} from "../../../utils/dateFormat.js";
import useMemberTableStore from "../../../store/MemberTable/memberTableStore.js";

const SkeletonMemberTableRow = ({ memberEmail, memberName, memberPhone, createdAt, pending}) => {
    const { sort } = useMemberTableStore();

    const getColorForColumn = (column) => {
        if (column === 'isPending') {
            return '';
        }
        const sortItem = sort.find(item => item.startsWith(`${column},`));
        if (sortItem) {
            return sortItem.endsWith('DESC') ? 'font-bold' : 'font-bold';
        }
        return '';
    };


    return (
        <>
            {/*<Table.Row className='skeleton' >*/}
            <Table.Row className='bg-white'>
                <Table.Cell style={{width:"5%"}}>
                    <Checkbox />
                </Table.Cell>
                <Table.Cell className={getColorForColumn('memberEmail')} style={{ width: "20%" }}>{memberEmail}</Table.Cell>
                <Table.Cell className={getColorForColumn('memberName')} style={{ width: "15%" }}>{memberName}</Table.Cell>
                <Table.Cell className={getColorForColumn('memberPhone')} style={{ width: "20%" }}>{memberPhone}</Table.Cell>
                <Table.Cell className={getColorForColumn('createdAt')} style={{ width: "20%" }}>{createdAt ? formatDate(createdAt) : null}</Table.Cell>
                <Table.Cell style={{width:"20%"}}>{!pending ? <StatusBadge status={'COMPLETED'} /> : <StatusBadge status={'PENDING'} />}</Table.Cell>
            </Table.Row>
        </>
    );
}
export default SkeletonMemberTableRow;