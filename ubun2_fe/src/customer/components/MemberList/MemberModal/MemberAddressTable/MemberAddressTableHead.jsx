import { Table } from 'flowbite-react';

const MemberAddressTableHead = () => {
  return (
    <>
      <Table.Head>
        <Table.HeadCell className='bg-gray-100'>
          주소지명 <span className='text-gray-400'>↓</span>
        </Table.HeadCell>
        <Table.HeadCell className='bg-gray-100'>
          주소(시, 도) <span className='text-gray-400'>↓</span>
        </Table.HeadCell>
        <Table.HeadCell className='bg-gray-100'>
          주소(시,군,구) <span className='text-gray-400'>↓</span>
        </Table.HeadCell>
        <Table.HeadCell className='bg-gray-100'>
          상세주소 <span className='text-gray-400'>↓</span>
        </Table.HeadCell>
      </Table.Head>
    </>
  );
};

export default MemberAddressTableHead;
