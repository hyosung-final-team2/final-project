import ProductTable from '../../components/ProductList/ProductTable/ProductTable';
import { product } from '../../components/ProductList/ProductListData';

const ProductList = () => {
  return (
    <>
      <ProductTable product={product} />
    </>
  );
};

export default ProductList;
