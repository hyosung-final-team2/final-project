import { Table } from 'flowbite-react';

const MemberPaymentTableHead = () => {
  return (
    <>
      <Table.Head>
        <Table.HeadCell className='bg-gray-100'>
          별칭 <span className='text-gray-400'>↓</span>
        </Table.HeadCell>
        <Table.HeadCell className='bg-gray-100'>
          결제수단 <span className='text-gray-400'>↓</span>
        </Table.HeadCell>
        <Table.HeadCell className='bg-gray-100'>
          카드사(은행) <span className='text-gray-400'>↓</span>
        </Table.HeadCell>
        <Table.HeadCell className='bg-gray-100'>
          카드(계좌)번호 <span className='text-gray-400'>↓</span>
        </Table.HeadCell>
      </Table.Head>
    </>
  );
};
export default MemberPaymentTableHead;
