import { useParams } from 'react-router-dom';
import {useGetProductDetail} from "../../api/Store/queris.js";

function Product() {
  const { productId } = useParams();

  const {data:productData} = useGetProductDetail(productId)
  const product = productData?.data?.data

  return(
      <>
        <h1>상품 상세 페이지 : {productId}</h1>
        <div>상품명 : {product?.productName}</div>
        <div>카테고리 : {product?.categoryName}</div>
        <div>상품설명 : {product?.productDescription}</div>
        <div>가격 : {product?.productPrice}</div>
        <div>할인률 : {product?.productDiscount}</div>
        <div>정기 / 단건 : {product?.orderOption}</div>
        <div>사진  : {product?.productImagePath}</div>
      </>
  )
}

export default Product;
