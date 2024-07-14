import { useParams } from 'react-router-dom';
import ProductItem from '../../components/Product/ProductItem';

function Store() {
  const { customerId } = useParams();

  // 실제로는 customerId 가지고 가져온 데이터 뿌려줄 것
  const dummyData = [
    { productId: 1, productName: '[첫구매딜] 싱싱한 목장 우유 2L * 2', productPrice: 4100, productDiscountPercent: 59, productImg: '' },
    { productId: 2, productName: '[첫구매딜] 안싱싱한 목장 치즈 2L * 2', productPrice: 7100, productDiscountPercent: 38, productImg: '' },
  ];

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {dummyData.map(item => {
        return (
          <ProductItem
            key={item.productId}
            productId={item.productId}
            productName={item.productName}
            productPrice={item.productPrice}
            productDiscountPercent={item.productDiscountPercent}
            productImage={item.productImage}
          />
        );
      })}
    </div>
  );
}
export default Store;
