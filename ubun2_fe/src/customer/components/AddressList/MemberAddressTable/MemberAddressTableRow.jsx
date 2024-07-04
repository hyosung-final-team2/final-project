import { Table } from 'flowbite-react';
const MemberAddressTableRow = ({ zipNo, city, town, detail, setIsEditMode }) => {
  const handleClick = () => {
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
