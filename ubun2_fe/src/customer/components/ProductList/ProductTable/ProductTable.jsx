import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import TableHead from '../../common/Table/TableHead';
import ProductTableFeature from './ProductTableFeature';
import { tableColumn } from '../../common/Table/tableIndex';
import { customTableTheme } from '../../common/Table/tableStyle';
import TablePagination from '../../common/Pagination/TablePagination';
import ProductTableRow from './ProductTableRow';
import ProductDetailModal from '../ProductDetailModal/ProductDetailModal';
import {useDeleteSelectedProducts, useGetProducts} from '../../../api/Product/ProductList/ProductList/queris.js';
import { useQueryClient } from '@tanstack/react-query';
import { getProducts } from '../../../api/Product/ProductList/ProductList/productTable.js';
import { useGetProductDetail } from '../../../api/Product/ProductList/ProductDetailModal/queris.js';
import TableBody from "../../common/Table/TableBody.jsx";
import useProductTableStore from "../../../store/ProductTable/productTableStore.js";
import useSkeletonStore from "../../../store/skeletonStore.js";
import SkeletonTable from "../../Skeleton/SkeletonTable.jsx";
import SkeletonProductTableFeature from "../Skeleton/SkeletonProductTableFeature.jsx";
import SkeletonProductTableRow from "../Skeleton/SkeletonProductTableRow.jsx";
import NoDataTable from "../../common/Table/NoDataTable.jsx";

const ProductTable = () => {
  const [openProductDetailModal, setOpenProductDetailModal] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState([]); // 체크된 상품 ID
  const [selectedProductDetail, setSelectedProductDetail] = useState({ productId: null }); // 선택된 멤버 ID - 모달 오픈 시

  const { sort, updateSort } = useProductTableStore()
  const {searchKeyword, setSearchKeyword} = useProductTableStore(); // 검색된 단어
  const {searchCategory, setSearchCategory} = useProductTableStore(); // 검색할 카테고리 (드롭다운)
  const { setTotalElements } = useProductTableStore()
  const { resetData } = useProductTableStore()

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8

  const { data: products, refetch: refetchProducts, isLoading } = useGetProducts(currentPage,PAGE_SIZE,sort,searchCategory,searchKeyword);

  const totalPages = products?.data?.data?.totalPages;
  const totalElementsFromPage = products?.data?.data?.totalElements;
  const productList = products?.data?.data?.content || [];

  const { data, refetch } = useGetProductDetail(selectedProductDetail.productId);
  const { mutate: deleteSelectedProductsMutate } = useDeleteSelectedProducts(selectedProducts,currentPage)

  const [openProductInsertModal, setOpenProductInsertModal] = useState(false);


  const handleSaveClick = () => {
    setOpenProductInsertModal(true);
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['product', {page:nextPage,PAGE_SIZE, sort, searchCategory, searchKeyword}],
        queryFn: () => getProducts(nextPage,PAGE_SIZE,sort,searchCategory,searchKeyword),
      });
    }
  }, [currentPage, queryClient,searchCategory, searchKeyword, sort, totalPages]);

  useEffect(() => {
    setSelectedProducts([])
  }, [currentPage,productList]);

  useEffect(() => {
    if (totalElementsFromPage !== undefined) {
      setTotalElements(totalElementsFromPage);
    }
  }, [totalElementsFromPage, setTotalElements]);

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

  const handleRowClick = async (productId,page )=> {
    await setSelectedProductDetail({ productId: productId, currentPage:page });
    await refetch();
    await setOpenProductDetailModal(true);
  };

  const handleSearch = (keyword, category) => {
    setSearchKeyword(keyword);
    setSearchCategory(category);
    if (keyword.trim() === '' || category === '카테고리') return;

    refetchProducts()
    setCurrentPage(1)
  };

  const handleSort = async (column,sortType) => {
    await updateSort(column,sortType);
    refetchProducts()
    setCurrentPage(1)
  }


  const {toggleIsReset} = useProductTableStore();
  const handleDataReset = async () => {
    await toggleIsReset()
    await resetData()
    await refetchProducts()
    await setCurrentPage(1)
  }

  useEffect(() => {
    return resetData()
  },[])

  // isLoading 시, skeletonTable
  const { setSkeletonData, setSkeletonTotalPage, setSkeletonSortData, setSkeletonSearchCategory, setSkeletonSearchKeyword, setSkeletonTotalElements, skeletonTotalElement } = useSkeletonStore()

  useEffect(() => {
    if (!isLoading) {
      setSkeletonData(productList);
      setSkeletonTotalPage(totalPages)
      setSkeletonSortData(sort)
      setSkeletonSearchCategory(searchCategory);
      setSkeletonSearchKeyword(searchKeyword);
      if (skeletonTotalElement !== totalElementsFromPage) {
        setSkeletonTotalElements(totalElementsFromPage)
      }
    }
  }, [productList, currentPage, totalPages,  sort,searchKeyword,searchCategory, setSkeletonTotalPage, setSkeletonSortData, setSkeletonData, setSkeletonSearchCategory, setSkeletonSearchKeyword, isLoading]);

  if (isLoading) {
    // 각자의 TableFeature, TableRow, TaleColumn 만 넣어주면 공통으로 동작
    return <SkeletonTable SkeletonTableFeature={SkeletonProductTableFeature} TableRowComponent={SkeletonProductTableRow} tableColumns={tableColumn.product}/>
  }

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      <ProductTableFeature tableColumns={tableColumn.product}
                           onSearch={handleSearch}
                           currentPage={currentPage}
                           handleDataReset={handleDataReset}
                           deleteSelectedProductsMutate={deleteSelectedProductsMutate}
                           handleSaveClick={handleSaveClick}
                           openProductInsertModal={openProductInsertModal}
                           setOpenProductInsertModal={setOpenProductInsertModal}
      />

      <div className='px-4'>
        <Table hoverable theme={customTableTheme}>
          <TableHead tableColumns={tableColumn.product} headerType="product" allChecked={selectedProducts.length === productList.length} setAllChecked={handleAllChecked} handleSort={handleSort}/>
          {productList.length > 0 ? (
              <TableBody
                  dataList={productList}
                  TableRowComponent={ProductTableRow}
                  dynamicId='productId'
                  setOpenModal={handleRowClick}
                  selectedMembers={selectedProducts}
                  handleRowChecked={handleRowChecked}
                  currentPage={currentPage}
              />
          ) : (
              <NoDataTable text="등록된 상품이 없습니다." buttonText="상품 등록하기" buttonFunc={handleSaveClick} colNum={tableColumn.product.length}/>
          )}

        </Table>
        {isLoading === false && productList.length > 0 ?
            <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4' />
            : <TablePagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} containerStyle='bg-white py-4 invisible' />
        }

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
