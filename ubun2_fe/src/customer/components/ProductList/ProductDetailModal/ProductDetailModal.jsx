import { customModalTheme } from '../../common/Modal/ModalStyle';
import { Button, Modal } from 'flowbite-react';
import ProductImageCard from './ProductImageCard';
import ProductCategory from './ProductCategory';
import ProductInfo from './ProductInfo';
import ProductSaleInfo from './ProductSaleInfo';

const ProductDetailModal = ({ isOpen, setOpenModal, title, primaryButtonText, onPrimaryClick }) => {
  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => setOpenModal(false)} theme={customModalTheme} size='4xl'>
        <Modal.Header>
          <div className='flex items-center justify-between w-full'>
            <div className='text-3xl font-bold'>{title}</div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='flex gap-3 w-full'>
            <div className='flex gap-3 flex-col w-2/5'>
              {/* 이미지 카드 */}
              <ProductImageCard />

              {/* 카테고리 */}
              <ProductCategory />
            </div>

            <div className='flex gap-3 flex-col w-3/5 justify-between'>
              {/* 상품 상세 정보 */}
              <ProductInfo />

              {/* 상품 판매 정보 */}
              <ProductSaleInfo />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='w-28 bg-custom-button-purple text-custom-font-purple' onClick={onPrimaryClick || (() => setOpenModal(false))}>
            <div>{primaryButtonText || '확인'}</div>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductDetailModal;
