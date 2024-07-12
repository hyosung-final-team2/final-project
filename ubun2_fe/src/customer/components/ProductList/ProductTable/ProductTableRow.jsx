import { Table, Checkbox } from 'flowbite-react';
import StatusBadge from '../../common/Badge/StatusBadge';

const ProductTableRow = ({
  productId,
  productName,
  stockQuantity,
  productPrice,
  productDiscount,
  productStatus,
  orderOption,
  setOpenModal,
  isChecked,
  handleRowChecked,
}) => {
  return (
    <>
      <Table.Row className='bg-white' onClick={() => setOpenModal(productId)}>
        <Table.Cell>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(productId)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell>{productId}</Table.Cell>
        <Table.Cell>{productName}</Table.Cell>
        <Table.Cell>{stockQuantity}</Table.Cell>
        <Table.Cell>{productPrice}</Table.Cell>
        <Table.Cell>{productDiscount}</Table.Cell>
        <Table.Cell>
          {productStatus ? (
            <StatusBadge bgColor='bg-badge-blue' txtColor='text-badge-blue' badgeText='공개' />
          ) : (
            <StatusBadge bgColor='bg-badge-red' txtColor='text-badge-red' badgeText='비공개' />
          )}
        </Table.Cell>
        <Table.Cell>
          {orderOption === 'SINGLE' ? (
            <StatusBadge bgColor='bg-badge-red' txtColor='text-badge-red' badgeText='단일' />
          ) : orderOption === 'SUBSCRIPTION' ? (
            <StatusBadge bgColor='bg-badge-yellow' txtColor='text-badge-yellow' badgeText='정기' />
          ) : (
            <StatusBadge bgColor='bg-badge-green' txtColor='text-badge-green' badgeText='단일 & 정기' />
          )}
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default ProductTableRow;
