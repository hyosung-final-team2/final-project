import { useNavigate } from 'react-router-dom';

function ProductItem({ productId, productName, productPrice, productDiscountPercent, productImage }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`product/${productId}`)}>
      <p>{productId}</p>
      <p>{productName}</p>
      <p>{productPrice}</p>
      <p>{productDiscountPercent}</p>
      <hr />
    </div>
  );
}

export default ProductItem;
