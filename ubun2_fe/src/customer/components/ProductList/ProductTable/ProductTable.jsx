import { useState } from 'react';
import { Table } from 'flowbite-react';
import TableHead from '../../common/Table/TableHead';
import TableBody from '../../common/Table/TableBody';
import ProductTableFeature from './ProductTableFeature';
import { tableColumn } from '../../common/Table/tableIndex';
import { customTableTheme } from '../../common/Table/tableStyle';
import TablePagination from '../../common/Pagination/TablePagination';
import ProductTableRow from './ProductTableRow';
import ProductDetailModal from '../ProductDetailModal/ProductDetailModal';

const ProductTable = ({ product }) => {
  const [openProductDetailModal, setOpenProductDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]); // 체크된 상품 ID
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색된 단어
  const handleAllChecked = checked => {
    if (checked) {
      setSelectedProduct(product.map(product => product.id));
    } else {
      setSelectedProduct([]);
    }
  };
  const handleRowChecked = id => {
    setSelectedProduct(prev => (prev.includes(id) ? prev.filter(id => id !== id) : [...prev, id]));
  };

  const handleSearch = keyword => {
    setSearchKeyword(keyword);
    if (keyword.trim() === '') return;

    // TODO: 검색 API 호출
    console.log(`${keyword}`);
  };

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      <ProductTableFeature tableColumns={tableColumn.product} onSearch={handleSearch} />
      <div className='px-4'>
        <Table hoverable theme={customTableTheme}>
          <TableHead tableColumns={tableColumn.product} allChecked={selectedProduct.length === product.length} setAllChecked={handleAllChecked} />
          <TableBody
            users={product}
            TableRowComponent={ProductTableRow}
            setOpenModal={setOpenProductDetailModal}
            selectedMembers={selectedProduct}
            handleRowChecked={handleRowChecked}
          />
        </Table>
        <TablePagination totalPages={3} containerStyle='bg-white py-4' />
        {/* modal */}
        <ProductDetailModal isOpen={openProductDetailModal} setOpenModal={setOpenProductDetailModal} title='상품 상세' />
      </div>
    </div>
  );
};

export default ProductTable;
