import { Table } from 'flowbite-react';

const MemberAddressTableHead = () => {
  return (
    <>
      <Table.Head>
        <Table.HeadCell className='bg-gray-100'>
          우편번호
        </Table.HeadCell>
        <Table.HeadCell className='bg-gray-100'>
          주소(시, 도)
        </Table.HeadCell>
        <Table.HeadCell className='bg-gray-100'>
          주소(시,군,구)
        </Table.HeadCell>
        <Table.HeadCell className='bg-gray-100'>
          상세주소
        </Table.HeadCell>
      </Table.Head>
    </>
  );
};

export default MemberAddressTableHead;
