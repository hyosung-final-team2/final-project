import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetail } from '../../api/Store/queris.js';
import BottomButton from '../../components/common/button/BottomButton.jsx';
import SingleOrder from '../../../assets/images/single.svg';
import SubscriptionOrder from '../../../assets/images/subscription.svg';
import AccordionBody from '../../components/common/accordion/AccordionBody.jsx';
import { useState } from 'react';
import SlideUpModal from '../../components/common/SlideUpModal.jsx';
import useModalStore from '../../store/modalStore.js';
import SelectOrderTypeModal from '../../components/Product/SelectOrderTypeModal.jsx';
import SelectQuantityModal from '../../components/Product/SelectQuantityModal.jsx';
import { useCreateCart } from '../../api/Cart/queris.js';
import NoStock from '@heroicons/react/24/outline/NoSymbolIcon.js';

function Product() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data: productData } = useGetProductDetail(parseInt(productId));
  const product = productData?.data?.data;
  const discountedPrice = Math.round((product?.productPrice * (1 - product?.productDiscount / 100)) / 10) * 10;

  const orderOptionFunc = orderOption => {
    if (orderOption === 'SINGLE') {
      return (
        <div className='flex'>
          <div className={`flex items-center gap-1 p-1 px-3 bg-blue-200 rounded-3xl text-md ${product?.stockQuantity === 0 ? 'opacity-50' : ''}`}>
            <SingleOrder />
            <span>단건</span>
          </div>
        </div>
      );
    } else if (orderOption === 'SUBSCRIPTION') {
      return (
        <div className='flex'>
          <div className={`flex items-center gap-1 p-1 px-3 bg-orange-200 rounded-3xl text-md ${product?.stockQuantity === 0 ? 'opacity-50' : ''}`}>
            <SubscriptionOrder />
            <span>정기</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className='flex items-center gap-1 text-md'>
          <div className='flex'>
            <div className={`flex items-center gap-1 p-1 px-3 bg-blue-200 rounded-3xl text-md ${product?.stockQuantity === 0 ? 'opacity-50' : ''}`}>
              <SingleOrder />
              <span>단건</span>
            </div>
          </div>

          <div className='flex'>
            <div className={`flex items-center gap-1 p-1 px-3 bg-orange-200 rounded-3xl text-md ${product?.stockQuantity === 0 ? 'opacity-50' : ''}`}>
              <SubscriptionOrder />
              <span>정기</span>
            </div>
          </div>
        </div>
      );
    }
  };

  const { modalState, setModalState } = useModalStore();
  const [isSelectOrderType, setIsSelectOrderType] = useState(false);
  const [orderType, setOrderType] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);

  const buyButtonFunc = () => {
    setModalState(true);
  };

  const handleModalClose = () => {
    setIsSelectOrderType(false);
    setOrderType(null);
    setProductQuantity(1);
    setModalState(false);
  };

  const { mutate } = useCreateCart({
    productId: parseInt(productId),
    quantity: productQuantity,
    orderOption: orderType === null ? product?.orderOption : orderType,
  });

  const clickCartBtn = async () => {
    await mutate();
    setModalState(false);
  };

  const clickBuyBtn = async () => {
    await mutate();
    setModalState(false);
    navigate('/member/app/cart');
  };

  return (
    <div className='flex flex-col w-full'>
      {/* 이미지 */}
      <div style={{ width: '100%', aspectRatio: '1/1', position: 'relative' }} className='bg-second'>
        <img src={product?.productImagePath || '/default_big.png'} style={{ aspectRatio: 1 }} className='w-full' alt='상품사진' />
        {product?.stockQuantity === 0 ? (
          <div className='absolute top-0 left-0 object-cover w-full h-full bg-black opacity-55'>
            <div className='flex items-center justify-center h-full'>
              <p className='text-xl font-bold tracking-widest text-white'>일시품절</p>
            </div>
          </div>
        ) : null}
      </div>
      {/* 상품 정보*/}
      <div className='p-6'>
        <div className='mb-3'>
          <div className='text-gray-400'>{product?.categoryName}</div>
          <div className={`text-2xl font-bold ${product?.stockQuantity === 0 ? 'text-gray-400' : ''}`} style={{ letterSpacing: '0.5px' }}>
            {product?.productName}
          </div>
        </div>
        <div className='mb-3'>
          <div className={`text-2xl font-bold ${product?.stockQuantity === 0 ? 'text-gray-400' : ''}`} style={{ letterSpacing: '1px' }}>
            {product?.productDiscount !== 0 ? (
              <span className={`mr-1.5 ${product?.stockQuantity === 0 ? 'text-gray-400' : 'text-red-500'}`}>{product?.productDiscount}%</span>
            ) : null}
            <span>{discountedPrice?.toLocaleString()}원</span>
          </div>
          {product?.productDiscount !== 0 ? (
            <div className='text-xl text-gray-300 line-through' style={{ letterSpacing: '1px' }}>
              {product?.productPrice?.toLocaleString()}원
            </div>
          ) : null}
        </div>
        <div className='mb-2'>{orderOptionFunc(product?.orderOption)}</div>
        {product?.stockQuantity !== 0 ? (
          <div className='text-gray-500'>배송비 무료, 이 상품 배송은 평균 2~7일 걸려요</div>
        ) : (
          <div className='flex items-center gap-1 text-xl font-bold text-black'>
            <NoStock className='w-6 h-6' />
            <div>일시품절</div>
          </div>
        )}
      </div>

      {/* 상품 상세 정보 */}
        {product?.detailImagesPath.length > 0 ?
            <div className='w-full px-6'>
                {product?.detailImagesPath.map((image, idx) => {
                    return <img key={idx} src={image} alt={image} width="100%"/>
                })}
            </div> :
            <div style={{height:"300px"}} className='w-full px-6 flex justify-center items-center text-xl bg-base-200 rounded-xl overflow-hidden'>
              <div>등록된 상품 설명이 없습니다.</div>
            </div>
        }


        {/* 상품 문의 */}
        <div className='px-6 pt-4'>
            <AccordionBody customerName={product?.customerName} customerPhone={product?.customerPhone} customerEmail={product?.customerEmail} customerAddress={product?.customerAddress}/>
        </div>

        {/* 구매 버튼 */}
        <div className='sticky bottom-0 left-0 right-0 flex w-full'>
        <div className='p-10'></div>
        {product?.stockQuantity !== 0 ? (
          <BottomButton buttonText='구매하기' buttonStyle='bg-main text-white' buttonFunc={buyButtonFunc} />
        ) : (
          <BottomButton buttonText='일시품절된 상품입니다.' buttonStyle='bg-gray-300 text-gray-500' disabled={true} />
        )}
      </div>

      <SlideUpModal
        isOpen={modalState}
        setIsModalOpen={handleModalClose}
        headerText={product?.orderOption === 'BOTH' && !isSelectOrderType ? '배송 방식 선택' : '제품 개수 선택 '}
        isButton={!(product?.orderOption === 'BOTH' && !isSelectOrderType)}
        buttonText='구매하기'
        buttonStyle='bg-main text-white'
        buttonFunc={clickBuyBtn}
      >
        {product?.orderOption === 'BOTH' && !isSelectOrderType ? (
          <SelectOrderTypeModal setIsSelectOrderType={setIsSelectOrderType} setOrderType={setOrderType} />
        ) : (
          <SelectQuantityModal
            productName={product?.productName}
            discountedPrice={discountedPrice}
            productQuantity={productQuantity}
            setProductQuantity={setProductQuantity}
            clickCartBtn={clickCartBtn}
            stockQuantity={product?.stockQuantity}
          />
        )}
      </SlideUpModal>
    </div>
  );
}

export default Product;
