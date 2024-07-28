import {Checkbox, Table} from "flowbite-react";
import StatusBadge from "../../common/Badge/StatusBadge.jsx";
import {formatDate} from "../../../utils/dateFormat.js";

const SkeletonMemberTableRow = ({ memberEmail, memberName, memberPhone, createdAt, pending}) => {
    return (
        <>
            {/*<Table.Row className='skeleton' >*/}
            <Table.Row className='bg-white'>
                <Table.Cell style={{width:"5%"}}>
                    <Checkbox />
                </Table.Cell>
                <Table.Cell style={{width:"20%"}}>{memberEmail}</Table.Cell>
                <Table.Cell style={{width:"15%"}}>{memberName}</Table.Cell>
                <Table.Cell style={{width:"20%"}}>{memberPhone}</Table.Cell>
                <Table.Cell style={{width:"20%"}}>{createdAt ? formatDate(createdAt) : null}</Table.Cell>
                <Table.Cell style={{width:"20%"}}>{!pending ? <StatusBadge status={'COMPLETED'} /> : <StatusBadge status={'PENDING'} />}</Table.Cell>
            </Table.Row>
        </>
    );
}
export default SkeletonMemberTableRow;