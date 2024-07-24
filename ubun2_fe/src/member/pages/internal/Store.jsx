import ProductItem from '../../components/Product/ProductItem';
import {useLocation} from "react-router-dom";
import {getProductDetail, getProducts} from "../../api/Store/store.js";
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import useStoreStore from "../../store/storeStore.js";
import {useEffect, useRef, useState} from "react";
import SlideUpModal from "../../components/common/SlideUpModal.jsx";
import Announcement from "../../components/StoreList/Announcement.jsx";
import useModalStore from "../../store/modalStore.js";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon.js";
import {useGetCategory} from "../../api/Store/queris.js";
import SelectCategoryModal from "../../components/Product/SelectCategoryModal.jsx";

function Store() {
  const location = useLocation();
  const {customerId} = location.state || {}

  const { setScrollPosition, getScrollPosition } = useStoreStore();
  const scrollRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage,isLoading, isError } = useInfiniteQuery({
    queryKey: ['products', customerId],
    queryFn: ({pageParam}) => getProducts(customerId, pageParam, 8),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length !== lastPage.data.data.totalPages ? allPages.length + 1 : undefined
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = getScrollPosition(customerId);
    }
  }, [customerId, getScrollPosition]);

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(customerId, scrollRef.current.scrollTop);
    }
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      data.pages.forEach((page) => {
        page.data.data.content.forEach((product) => {
          const productDetailQueryKey = ['products', { productId: product.productId }];
          const cachedData = queryClient.getQueryData(productDetailQueryKey);

          if (!cachedData) {
            queryClient.prefetchQuery({
              queryKey: productDetailQueryKey,
              queryFn: () => getProductDetail(customerId, product.productId),
            });
          }
        });
      });
    }
  }, [customerId, data, queryClient]);


  const modalButtonStyle = "bg-main text-white";
  const { modalState, setModalState } = useModalStore();
  const { isFirstTime, setIsFirstTime } = useStoreStore()

  useEffect(() => {
    if (!isFirstTime.includes(customerId)) {
      setModalState(true);
      setIsFirstTime(customerId);
    }
  }, [customerId, isFirstTime, setIsFirstTime, setModalState]);

  const modalButtonFunc = () => {
    setModalState(false)
    setIsClickedCategory(false)
  }

  const [isClickedCategory, setIsClickedCategory] = useState(false);
  const [category, setCategory] = useState({categoryName:null, categoryId: null});
  const { data: categoryList } = useGetCategory(customerId)

  if (isLoading) return <h3>로딩중</h3>;
  if (isError) return <h3>잘못된 데이터 입니다.</h3>;

  return (
      <>
        <div ref={scrollRef} onScroll={handleScroll} style={{ width: '100%', height: '100%', overflow:"auto", position:"relative" }}>
          <InfiniteScroll hasMore={hasNextPage && !isFetchingNextPage} loadMore={() => {
            if (!isFetchingNextPage) {
              fetchNextPage();
            }
          }}  useWindow={false}>
            <div className="flex flex-col">
              <div className="px-4 py-3 pt-8 pb-0 text-xl flex justify-between items-center">
                <div onClick={() => {
                    setModalState(true)
                    setIsClickedCategory(true)
                }} className='inline-flex p-2 border-none rounded-md text-main bg-main bg-opacity-5'>
                  <input type='input' value={category.categoryName === null ? "전체" : category.categoryName} className='min-w-0 bg-transparent cursor-pointer max-w-[10dvw]' readOnly/>
                  <ChevronDownIcon className='w-5'/>
                </div>
                <div>{data?.pages[0]?.data?.data?.totalElements}개</div>
              </div>
              <div className="w-full h-full flex flex-wrap">
                {data?.pages?.map((page) =>
                    page?.data?.data?.content?.map((item, idx) => (
                        <ProductItem
                            key={item.productId}
                            productId={item.productId}
                            productName={item.productName}
                            productPrice={item.productPrice}
                            productDiscountPercent={item.productDiscount}
                            productImage={item.productImagePath}
                            orderOption={item.orderOption}
                            stockQuantity={item.stockQuantity}
                            isOdd={idx % 2 === 0}
                        />
                    ))
                )}
              </div>
            </div>
          </InfiniteScroll>
        </div>

      {/* 공지사항 모달 */}
        <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} buttonText="확인" buttonStyle={modalButtonStyle} buttonFunc={modalButtonFunc} headerText={isClickedCategory ? "카테고리" : null}>
          {isClickedCategory ? <SelectCategoryModal categoryList={categoryList?.data?.data} setCategory={setCategory} setModalState={setModalState}/> : <Announcement/>}
        </SlideUpModal>
      </>
  );
}
export default Store;
