import ProductItem from '../../components/Product/ProductItem';
import {useLocation} from "react-router-dom";
import {getProducts} from "../../api/Store/store.js";
import {useInfiniteQuery} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import useStoreStore from "../../store/storeStore.js";
import {useEffect, useRef} from "react";
import SlideUpModal from "../../components/common/SlideUpModal.jsx";
import Announcement from "../../components/StoreList/Announcement.jsx";
import useModalStore from "../../store/modalStore.js";

function Store() {
  const location = useLocation();
  const {customerId} = location.state || {}

  const { setScrollPosition, getScrollPosition } = useStoreStore();
  const scrollRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ['products', customerId],
    queryFn: ({pageParam}) => getProducts(customerId, pageParam, 8),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length !== lastPage.data.data.totalPages ? allPages.length + 1 : undefined
    }
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


  const modalButtonStyle = "bg-main text-white";
  const { modalState, setModalState } = useModalStore();
  const { isFirstTime, setIsFirstTime } = useStoreStore()

  useEffect(() => {
    console.log(isFirstTime)
    if (!isFirstTime.includes(customerId)) {
      setModalState(true);
      setIsFirstTime(customerId);
    }
  }, [customerId, isFirstTime, setIsFirstTime, setModalState]);

  const modalButtonFunc = () => {
    setModalState(false)
  }


  if (isLoading) return <h3>로딩중</h3>;
  if (isError) return <h3>잘못된 데이터 입니다.</h3>;

  return (
      <>
        <div ref={scrollRef} onScroll={handleScroll} style={{ width: '100%', height: '100%', overflow:"auto" }}>
          <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()} useWindow={false}>
            {data?.pages?.map((page) =>
                page?.data?.data?.content?.map((item) => (
                    <ProductItem
                        key={item.productId}
                        productId={item.productId}
                        productName={item.productName}
                        productPrice={item.productPrice}
                        productDiscountPercent={item.productDiscount}
                    />
                ))
            )}
          </InfiniteScroll>
        </div>

      {/* 공지사항 모달 */}
        <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} buttonText="확인" buttonStyle={modalButtonStyle} buttonFunc={modalButtonFunc}>
          <Announcement/>
        </SlideUpModal>

      </>
  );
}
export default Store;
