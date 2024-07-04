import { Table } from 'flowbite-react';
import useAddressStore from '../../../store/Address/useAddressStore';
const MemberAddressTableRow = ({ zipNo, city, town, detail }) => {
  const { selectedAddress, setIsEditMode, setSelectedAddress } = useAddressStore();
  const handleClick = () => {
    setSelectedAddress({ city, town, detail, zipNo });
    setIsEditMode(true);
  };
  return (
    <>
      <Table.Row className='bg-white cursor-pointer' onClick={handleClick}>
        <Table.Cell>{city}</Table.Cell>
        <Table.Cell>{town}</Table.Cell>
        <Table.Cell>{detail}</Table.Cell>
        <Table.Cell>{zipNo}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default MemberAddressTableRow;
