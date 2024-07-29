import { Table, Checkbox } from 'flowbite-react';
import StatusBadge from '../../common/Badge/StatusBadge';
import ProductOptionBadge from '../../common/Badge/ProductOptionBadge';

const SkeletonProductTableRow = ({
  productCategoryName,
  productName,
  stockQuantity,
  productPrice,
  productDiscount,
  productStatus,
  orderOption,
}) => {
  return (
      <>
        <Table.Row className='bg-white'>
          <Table.Cell style={{width:"5%"}}>
            <Checkbox />
          </Table.Cell>
          <Table.Cell style={{width:"15%"}}>{productCategoryName}</Table.Cell>
          <Table.Cell style={{width:"15%"}}>{productName}</Table.Cell>
          <Table.Cell style={{width:"10%"}}>{stockQuantity}</Table.Cell>
          <Table.Cell style={{width:"15%"}}>{productPrice}</Table.Cell>
          <Table.Cell style={{width:"10%"}}>{productDiscount}</Table.Cell>
          <Table.Cell style={{width:"15%"}}>{productStatus ? <StatusBadge status={'PUBLIC'} /> : <StatusBadge status={'PRIVATE'} />}</Table.Cell>
          <Table.Cell style={{width:"15%"}}>
            <ProductOptionBadge productOption={orderOption} />
          </Table.Cell>
        </Table.Row>
      </>
  );
};

export default SkeletonProductTableRow;
