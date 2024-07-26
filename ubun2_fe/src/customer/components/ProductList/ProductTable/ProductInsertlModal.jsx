import { customModalTheme } from '../../common/Modal/ModalStyle';
import { Button, Modal } from 'flowbite-react';

import { memo, useState } from 'react';
import ProductImageCard from '../ProductDetailModal/ProductImageCard.jsx';
import ProductCategory from '../ProductDetailModal/ProductCategory.jsx';
import ProductInfo from '../ProductDetailModal/ProductInfo.jsx';
import ProductSaleInfo from '../ProductDetailModal/ProductSaleInfo.jsx';
import { useRegisterProduct} from '../../../api/Product/ProductList/ProductList/queris.js';
import {useSendGroupAlarmProduct} from "../../../api/notification/queris.js";

const ProductInsertModal = ({ isOpen, setOpenModal, title, currentPage }) => {
  const [newProduct, setNewProduct] = useState({
    productName: '',
    productDescription: '',
    categoryName: '과일', //기본
    stockQuantity: '',
    productPrice: '',
    productDiscount: '',
    productStatus: 'true',
    orderOption: 'SINGLE', //기본
    productImageOriginalName: '',
    productImagePath: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const handleInputImageChange = imageFile => {
    setImageFile(imageFile);
  };

  const { mutate: productRegisterMutate } = useRegisterProduct(newProduct, imageFile, currentPage);
  // TODO: productRegisterMutate의 onSuccess에다가 addProductGroupAlarmMutate 요고 달기
  const { mutate: addProductGroupAlarmMutate } = useSendGroupAlarmProduct(newProduct?.productName)

  const handleInputChange = e => {
    console.log(typeof e.target.value);
    setNewProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Modal
        dismissible
        show={isOpen}
        onClose={() => {
          setOpenModal(false);
          setNewProduct(null);
          setImageFile(null);
        }}
        theme={customModalTheme}
        size='4xl'
      >
        <Modal.Header>
          <div className='flex items-center justify-between w-full'>
            <div className='text-3xl font-bold'>{title}</div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='flex gap-3 w-full'>
            <div className='flex gap-3 flex-col w-2/5'>
              {/* 이미지 카드 */}
              <ProductImageCard product={newProduct} title='상품 사진' handleInputImageChange={handleInputImageChange} />
              {/* 카테고리 */}
              <ProductCategory product={newProduct} title='카테고리' handleInputChange={handleInputChange} />
            </div>
            <div className='flex gap-3 flex-col w-3/5 justify-between'>
              {/* 상품 상세 정보 */}
              <ProductInfo product={newProduct} title='상품 정보' handleInputChange={handleInputChange} />
              {/* 상품 판매 정보 */}
              <ProductSaleInfo product={newProduct} title='가격 및 재고' handleInputChange={handleInputChange} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='flex justify-end w-full gap-2'>
            <div className='flex gap-2 mr-4'>
              <Button
                className='w-28 bg-custom-button-purple text-custom-font-purple'
                onClick={async () => {
                  await productRegisterMutate();
                  await addProductGroupAlarmMutate()
                  setOpenModal(false);
                  setNewProduct(null);
                  setImageFile(null);
                }}
              >
                등록
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(ProductInsertModal);
