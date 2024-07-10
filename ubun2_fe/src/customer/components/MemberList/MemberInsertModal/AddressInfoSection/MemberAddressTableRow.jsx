import { Table } from 'flowbite-react';
// import useAddressStore from '../../../store/Address/useAddressStore';
const MemberAddressTableRow = ({ addressNum, addressFirst, addressSecond, addressThird }) => {
  // const { selectedAddress, setIsEditMode, setSelectedAddress } = useAddressStore();
  // const handleClick = () => {
  //   setSelectedAddress({ city, town, detail, zipNo });
  //   setIsEditMode(true);
  // };
  return (
    <>
      <Table.Row className='bg-white cursor-pointer' >
        <Table.Cell>{addressNum}</Table.Cell>
        <Table.Cell>{addressFirst}</Table.Cell>
        <Table.Cell>{addressSecond}</Table.Cell>
        <Table.Cell>{addressThird}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default MemberAddressTableRow;
