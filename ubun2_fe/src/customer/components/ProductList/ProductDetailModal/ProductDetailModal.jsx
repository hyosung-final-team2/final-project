import { customModalTheme } from '../../common/Modal/ModalStyle';
import { Button, Modal } from 'flowbite-react';
import ProductImageCard from './ProductImageCard';
import ProductCategory from './ProductCategory';
import ProductInfo from './ProductInfo';
import ProductSaleInfo from './ProductSaleInfo';
import { useGetProductDetail } from '../../../api/Product/ProductList/ProductDetailModal/queris.js';
import { memo, useEffect, useState } from 'react';
import { useDeleteProduct, useModifyProduct } from '../../../api/Product/ProductList/ProductList/queris.js';
import { useSendGroupAlarmProductDelete } from '../../../api/notification/queris.js';

const ProductDetailModal = ({ isOpen, setOpenModal, title, selectedProductDetail, currentPage }) => {
  const { data: productDetail } = useGetProductDetail(selectedProductDetail?.productId);
  const product = productDetail?.data?.data;

  const INITIAL_PRODUCT_OBJ = {
    productId: '',
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
    detailImagesPath: ''
  };

  const [productData, setProductData] = useState(INITIAL_PRODUCT_OBJ); // 변경용 데이터
  const [initialData, setInitialData] = useState(INITIAL_PRODUCT_OBJ); // 복원용 데이터

  useEffect(() => {
    const newData = {
      productId: product?.productId || '',
      productName: product?.productName || '',
      productDescription: product?.productDescription || '',
      categoryName: product?.categoryName || '',
      stockQuantity: product?.stockQuantity || '',
      productPrice: product?.productPrice || '',
      productDiscount: product?.productDiscount || '',
      productStatus: product?.productStatus === true ? 'true' : 'false' || 'false',
      orderOption: product?.orderOption || '',
      productImagePath: product?.productImagePath || '',
      detailImagesPath: product?.detailImagesPath || [],
    };
    setProductData(newData);
    setInitialData(newData);
  }, [isOpen, product]);

  const [mainImagePreview, setMainImagePreview] = useState(product?.productImagePath)
  const [modalImageFile, setModalImageFile] = useState(null);

  const [modalDetailImageFiles, modalSetDetailImageFiles] = useState([]);
  const [changeIndex, setChangeIndex] = useState([]);

  const handleChangeIndex = (newChangeIndex) => {
    setChangeIndex(newChangeIndex);
  };

  const handleInputImageChange = (imageFile,previewUrl) => {
    setMainImagePreview(previewUrl)
    setModalImageFile(imageFile);
  };

  const handleDetailImagesChange = files => {
    modalSetDetailImageFiles(files);
  };

  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {}, [product]);

  const { mutate: productDeleteMutate } = useDeleteProduct(productData.productId, currentPage);

  const { mutate: productModifyMutate } = useModifyProduct({...productData, changeIndex},modalImageFile,modalDetailImageFiles,currentPage);

  const { mutate: deleteProductGroupAlarmMutate } = useSendGroupAlarmProductDelete(productData?.productName);

  const handleInputChange = e => {
    setProductData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const updatedProductData = {
      ...productData,
      changeIndex: changeIndex
    };

    await productModifyMutate({
      productRequest: updatedProductData,
      modalImageFile,
      modalDetailImageFiles,
    });
    setIsEditing(false);
    setOpenModal(false);
  };

  return (
    <>
      <Modal
        dismissible
        show={isOpen}
        onClose={() => {
          setIsEditing(false);
          setOpenModal(false);
          setProductData(initialData);
          setIsEditing(false);
        }}
        theme={customModalTheme}
        size='4xl'
      >
        <Modal.Header>
          <div className='flex items-center justify-between w-full'>
            <div className='text-3xl font-bold'>{isEditing ? '상품 수정' : title}</div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='flex gap-3 w-full'>
            <div className='flex gap-3 flex-col w-2/5'>
              {/* 이미지 카드 */}
              <ProductImageCard
                product={productData}
                onlyInfo={!isEditing}
                title='상품 사진'
                handleInputImageChange={handleInputImageChange}
                handleDetailImagesChange={handleDetailImagesChange}
                handleChangeIndex={handleChangeIndex}
                modalDetailImageFiles={modalDetailImageFiles}
                modalImageFile={modalImageFile}
                mainImagePreview={mainImagePreview}
              />
              {/* 카테고리 */}
              <ProductCategory product={productData} onlyInfo={!isEditing} title='카테고리' handleInputChange={handleInputChange} />
            </div>
            <div className='flex gap-3 flex-col w-3/5 justify-between'>
              {/* 상품 상세 정보 */}
              <ProductInfo product={productData} onlyInfo={!isEditing} title='상품 정보' handleInputChange={handleInputChange} />
              {/* 상품 판매 정보 */}
              <ProductSaleInfo product={productData} onlyInfo={!isEditing} title='가격 및 재고' handleInputChange={handleInputChange} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='flex justify-end w-full gap-2'>
            <div className='flex gap-2 mr-4'>
              {!isEditing ? (
                <>
                  <Button
                    className='w-28 bg-custom-button-purple text-custom-font-purple'
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    수정
                  </Button>
                  <Button
                    className='w-28 bg-red-100 text-red-700'
                    onClick={() => {
                      productDeleteMutate();
                      deleteProductGroupAlarmMutate();
                      setOpenModal(false);
                    }}
                  >
                    삭제
                  </Button>
                </>
              ) : (
                <Button
                  className='w-28 bg-custom-button-purple text-custom-font-purple'
                  // onClick={async () => {
                  //   await productModifyMutate();
                  //   setIsEditing(false);
                  // }}
                    onClick={handleSave}
                >
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
