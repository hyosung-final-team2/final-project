import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import TableHead from '../../common/Table/TableHead';
import TableBody from '../../common/Table/TableBody';
import ProductTableFeature from './ProductTableFeature';
import { tableColumn } from '../../common/Table/tableIndex';
import { customTableTheme } from '../../common/Table/tableStyle';
import TablePagination from '../../common/Pagination/TablePagination';
import ProductTableRow from './ProductTableRow';
import ProductDetailModal from '../ProductDetailModal/ProductDetailModal';
import { useGetProducts } from '../../../api/Product/ProductList/ProductList/queris.js';
import { useQueryClient } from '@tanstack/react-query';
import { getProducts } from '../../../api/Product/ProductList/ProductList/productTable.js';
import { useGetProductDetail } from '../../../api/Product/ProductList/ProductDetailModal/queris.js';

const ProductTable = () => {
  const [openProductDetailModal, setOpenProductDetailModal] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState([]); // 체크된 상품 ID
  const [selectedProductDetail, setSelectedProductDetail] = useState({ productId: null }); // 선택된 멤버 ID - 모달 오픈 시

  const [searchTerm, setSearchTerm] = useState(''); // 검색된 단어
  const [searchCategory, setSearchCategory] = useState(''); // 검색할 카테고리 (드롭다운)

  const [currentPage, setCurrentPage] = useState(1);
  const { data: products } = useGetProducts(currentPage);

  const totalPages = products?.data?.data?.totalPages ?? 5;
  const productList = products?.data?.data?.content || [];
  const { data, refetch } = useGetProductDetail(selectedProductDetail.productId);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['product', nextPage],
        queryFn: () => getProducts(nextPage),
      });
    }
  }, [currentPage, queryClient, totalPages]);

  const handleAllChecked = checked => {
    if (checked) {
      setSelectedProducts(productList.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };
  const handleRowChecked = id => {
    setSelectedProducts(prev => (prev.includes(id) ? prev.filter(id => id !== id) : [...prev, id]));
  };

  const handleRowClick = async productId => {
    await setSelectedProductDetail({ productId: productId });
    await refetch();
    await setOpenProductDetailModal(true);
  };
  const handleSearch = (term, category) => {
    setSearchTerm(term);
    setSearchCategory(category);
    if (term.trim() === '' || category === '카테고리') return;

    // TODO: 검색 API 호출
    console.log(`${category} : ${term}`);
  };

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      <ProductTableFeature tableColumns={tableColumn.product} onSearch={handleSearch} currentPage={currentPage} />

      <div className='px-4 shadow-md'>
        <Table hoverable theme={customTableTheme}>
          <TableHead tableColumns={tableColumn.product} allChecked={selectedProducts.length === productList.length} setAllChecked={handleAllChecked} />
          <TableBody
            users={productList}
            TableRowComponent={ProductTableRow}
            selectedMembers={selectedProducts}
            setOpenModal={handleRowClick}
            handleRowChecked={handleRowChecked}
          />
        </Table>
        <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />
        {/* modal */}
        <ProductDetailModal
          isOpen={openProductDetailModal}
          setOpenModal={setOpenProductDetailModal}
          title='상품 상세'
          selectedProductDetail={selectedProductDetail}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ProductTable;
