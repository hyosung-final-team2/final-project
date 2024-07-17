import ProductItem from '../../components/Product/ProductItem';
import {useLocation} from "react-router-dom";
import {getProducts} from "../../api/Store/store.js";
import {useInfiniteQuery} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import useStoreStore from "../../store/storeStore.js";
import {useEffect, useRef} from "react";

function Store() {
  const location = useLocation();
  const {customerId} = location.state || {}

  const { scrollPosition, setScrollPosition } = useStoreStore();
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
      scrollRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollTop);
    }
  };

  if (isLoading) return <h3>로딩중</h3>;
  if (isError) return <h3>잘못된 데이터 입니다.</h3>;


  return (
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
  );
}
export default Store;
