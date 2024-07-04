import { Table } from 'flowbite-react';

const MemberPaymentTableRow = ({ paymentNickname, paymentMethod, paymentInstitution, paymentNumber }) => {
  return (
    <Table.Row className='bg-white'>
      <Table.Cell>{paymentNickname}</Table.Cell>
      <Table.Cell>{paymentMethod}</Table.Cell>
      <Table.Cell>{paymentInstitution}</Table.Cell>
      <Table.Cell>{paymentNumber}</Table.Cell>
    </Table.Row>
  );
};
export default MemberPaymentTableRow;
