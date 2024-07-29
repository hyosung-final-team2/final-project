import { Table, Checkbox } from 'flowbite-react';
import StatusBadge from '../../common/Badge/StatusBadge';
import ProductOptionBadge from '../../common/Badge/ProductOptionBadge';

const ProductTableRow = ({
    productId,
  productCategoryName,
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
        <Table.Cell style={{width:"5%"}}>
          <Checkbox checked={isChecked} onChange={() => handleRowChecked(productId)} onClick={e => e.stopPropagation()} />
        </Table.Cell>
        <Table.Cell style={{width:"15%"}}>{productCategoryName}</Table.Cell>
        <Table.Cell style={{width:"15%"}}>{productName}</Table.Cell>
        <Table.Cell style={{width:"10%"}}>{stockQuantity}개</Table.Cell>
        <Table.Cell style={{width:"15%"}}>{productPrice.toLocaleString()}원</Table.Cell>
        <Table.Cell style={{width:"10%"}}>{productDiscount}%</Table.Cell>
        <Table.Cell style={{width:"15%"}}>{productStatus ? <StatusBadge status={'PUBLIC'} /> : <StatusBadge status={'PRIVATE'} />}</Table.Cell>
        <Table.Cell style={{width:"15%"}}>
          <ProductOptionBadge productOption={orderOption} />
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default ProductTableRow;
