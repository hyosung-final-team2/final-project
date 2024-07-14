import { useParams } from 'react-router-dom';

function Product() {
  const { productId } = useParams();

  return <h1>상품 상세 페이지 : {productId}</h1>;
}

export default Product;
