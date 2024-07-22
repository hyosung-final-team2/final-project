import { Table } from 'flowbite-react';
import MemberAddressTableRow from './MemberAddressTableRow';

const MemberAddressTableBody = ({paginatedData}) => {
  const addressList = [
    { addressId: 1, addressNickname: '우리집', addressTop: '경기도', addressMid: '김포시', addressBottom: '사우동 AA아파트 102동 102호' },
    { addressId: 2, addressNickname: '우리집', addressTop: '경기도', addressMid: '김포시', addressBottom: '사우동 AA아파트 102동 102호' },
    { addressId: 3, addressNickname: '우리집', addressTop: '경기도', addressMid: '김포시', addressBottom: '사우동 AA아파트 102동 102호' },
  ];
  return (
    <Table.Body className='divide-y'>
      {paginatedData.map(address => {
        return <MemberAddressTableRow key={address.addressId} {...address} />;
      })}
    </Table.Body>
  );
};

export default MemberAddressTableBody;
