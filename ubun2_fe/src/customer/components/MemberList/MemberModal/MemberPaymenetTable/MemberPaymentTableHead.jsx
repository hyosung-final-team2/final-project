import { Table } from 'flowbite-react';

const MemberPaymentTableHead = () => {
  return (
    <>
      <Table.Head>
        <Table.HeadCell className='bg-gray-100'>
          번호
        </Table.HeadCell>
        <Table.HeadCell className='bg-gray-100'>
          결제수단
        </Table.HeadCell>
        <Table.HeadCell className='bg-gray-100'>
          카드사(은행)
        </Table.HeadCell>
        <Table.HeadCell className='bg-gray-100'>
          카드(계좌)번호
        </Table.HeadCell>
      </Table.Head>
    </>
  );
};
export default MemberPaymentTableHead;
