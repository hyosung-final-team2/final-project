import { Table, Checkbox } from 'flowbite-react';
import StatusBadge from '../../common/Badge/StatusBadge';
import ProductOptionBadge from '../../common/Badge/ProductOptionBadge';

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
  currentPage,
}) => {
  return (
    <>
      <Table.Row className='bg-white' onClick={() => setOpenModal(productId, currentPage)}>
        <Table.Cell>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(productId)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell>{productId}</Table.Cell>
        <Table.Cell>{productName}</Table.Cell>
        <Table.Cell>{stockQuantity}</Table.Cell>
        <Table.Cell>{productPrice}</Table.Cell>
        <Table.Cell>{productDiscount}</Table.Cell>
        <Table.Cell>{productStatus ? <StatusBadge status={'PUBLIC'} /> : <StatusBadge status={'PRIVATE'} />}</Table.Cell>
        <Table.Cell>
          <ProductOptionBadge productOption={orderOption} />
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default ProductTableRow;
