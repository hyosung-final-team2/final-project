import { Table, Checkbox } from 'flowbite-react';
import StatusBadge from '../../common/Badge/StatusBadge';
import ProductOptionBadge from '../../common/Badge/ProductOptionBadge';
import useProductTableStore from "../../../store/ProductTable/productTableStore.js";

const SkeletonProductTableRow = ({
  productCategoryName,
  productName,
  stockQuantity,
  productPrice,
  productDiscount,
  productStatus,
  orderOption,
}) => {

  const { sort } = useProductTableStore();

  const getColorForColumn = (column) => {
    if (column === 'productStatus' || column === 'orderOption') {
      return '';
    }
    const sortItem = sort.find(item => item.startsWith(`${column},`));
    if (sortItem) {
      return sortItem.endsWith('DESC') ? 'font-bold' : 'font-bold';
    }
    return '';
  };


  return (
      <>
        <Table.Row className='bg-white'>
          <Table.Cell style={{width:"5%"}}>
            <Checkbox />
          </Table.Cell>
          <Table.Cell className={getColorForColumn('productCategoryName')} style={{width:"15%"}}>{productCategoryName}</Table.Cell>
          <Table.Cell className={getColorForColumn('productName')} style={{width:"15%"}}>{productName}</Table.Cell>
          <Table.Cell className={getColorForColumn('stockQuantity')} style={{width:"10%"}}>{stockQuantity}개</Table.Cell>
          <Table.Cell className={getColorForColumn('productPrice')} style={{width:"15%"}}>{productPrice?.toLocaleString()}원</Table.Cell>
          <Table.Cell className={getColorForColumn('productDiscount')} style={{width:"10%"}}>{productDiscount}%</Table.Cell>
          <Table.Cell style={{width:"15%"}}>{productStatus ? <StatusBadge status={'PUBLIC'} /> : <StatusBadge status={'PRIVATE'} />}</Table.Cell>
          <Table.Cell style={{width:"15%"}}>
            <ProductOptionBadge productOption={orderOption} />
          </Table.Cell>
        </Table.Row>
      </>
  );
};

export default SkeletonProductTableRow;
