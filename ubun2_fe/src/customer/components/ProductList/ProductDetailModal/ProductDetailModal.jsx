import { customModalTheme } from '../../common/Modal/ModalStyle';
import { Button, Modal } from 'flowbite-react';
import ProductImageCard from './ProductImageCard';
import ProductCategory from './ProductCategory';
import ProductInfo from './ProductInfo';
import ProductSaleInfo from './ProductSaleInfo';
import {useGetProductDetail} from "../../../api/Product/ProductList/ProductDetailModal/queris.js";
import {memo, useEffect, useState} from "react";
import {
  useDeleteProduct,
  useModifyProduct,
} from "../../../api/Product/ProductList/ProductList/queris.js";

const ProductDetailModal = ({ isOpen, setOpenModal, title, selectedProductDetail, currentPage}) => {
  const {data: productDetail} = useGetProductDetail(selectedProductDetail?.productId)
  const product = productDetail?.data?.data

  const ProductInfoData = {
    productId: product?.productId || '',
    productName: product?.productName || '',
    productDescription: product?.productDescription || '',
    categoryName: product?.categoryName||'',
    stockQuantity: product?.stockQuantity || '',
    productPrice: product?.productPrice || '',
    productDiscount: product?.productDiscount || '',
    productStatus: product?.productStatus || false,
    orderOption: product?.orderOption|| '',
    productImagePath: product?.productImagePath||''
  };

  const [imageFile, setImageFile] = useState(null);

  const handleInputImageChange = (imageFile) => {
    setImageFile(imageFile);
  };

  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
  }, [product]);

  const { mutate: productDeleteMutate } = useDeleteProduct(ProductInfoData.productId, currentPage)
  const { mutate: productModifyMutate } = useModifyProduct(ProductInfo,imageFile,currentPage)

  const handleInputChange = () => {
    //console.log( typeof e.target.value)
    //(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => {
        setIsEditing(false)
        setOpenModal(false)
      }} theme={customModalTheme} size='4xl'>
        <Modal.Header>
          <div className='flex items-center justify-between w-full'>
            <div className='text-3xl font-bold'>{isEditing ? "상품 수정" : title}</div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='flex gap-3 w-full'>
            <div className='flex gap-3 flex-col w-2/5'>
              {/* 이미지 카드 */}
              <ProductImageCard product={ProductInfoData} onlyInfo={!isEditing} title='상품 사진' handleInputImageChange={handleInputImageChange}/>
              {/* 카테고리 */}
              <ProductCategory product={ProductInfoData} onlyInfo={!isEditing} title='카테고리' handleInputChange={handleInputChange}/>
            </div>
            <div className='flex gap-3 flex-col w-3/5 justify-between'>
              {/* 상품 상세 정보 */}
              <ProductInfo product={ProductInfoData} onlyInfo={!isEditing} title='상품 정보' handleInputChange={handleInputChange}/>
              {/* 상품 판매 정보 */}
              <ProductSaleInfo product={ProductInfoData} onlyInfo={!isEditing} title='가격 및 재고' handleInputChange={handleInputChange}/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end w-full gap-2">
            <div className="flex gap-2 mr-4">
              {!isEditing ? (
                  <>
                    <Button
                        className="w-28 bg-custom-button-purple text-custom-font-purple"
                        onClick={handleEditClick}
                    >
                      수정
                    </Button>
                    <Button
                        className="w-28 bg-red-100 text-red-700" onClick={() => {
                        productDeleteMutate()
                        setOpenModal(false)
                    }}
                    >
                      삭제
                    </Button>
                  </>
              ) : (
                  <Button
                      className="w-28 bg-custom-button-purple text-custom-font-purple" onClick={() => {
                    productModifyMutate()
                    setOpenModal(false);
                    //setNewProduct(null)
                    //setImageFile(null)
                  }}>
                    저장
                  </Button>
              )}
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(ProductDetailModal);
