import { Table } from 'flowbite-react';
const MemberPaymentTableRow = ({ paymentType, cardCompanyName, bankName, cardNumber, accountNumber }) => {
  const isAccount = paymentType === 'ACCOUNT';
  return (
    <>
      <Table.Row className='bg-white'>
        <Table.Cell>{isAccount ? '계좌' : '카드'}</Table.Cell>
        <Table.Cell>{isAccount ? bankName : cardCompanyName}</Table.Cell>
        <Table.Cell>{isAccount ? accountNumber : cardNumber}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default MemberPaymentTableRow;
