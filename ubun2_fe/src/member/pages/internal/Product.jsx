import {useParams} from 'react-router-dom';
import {useGetProductDetail} from "../../api/Store/queris.js";
import BottomButton from "../../components/common/button/BottomButton.jsx";
import SingleOrder from "../../../assets/images/single.svg";
import SubscriptionOrder from "../../../assets/images/subscription.svg";
import AccordionBody from "../../components/common/accordion/AccordionBody.jsx";
import {useState} from "react";
import SlideUpModal from "../../components/common/SlideUpModal.jsx";
import useModalStore from "../../store/modalStore.js";
import SelectOrderTypeModal from "../../components/Product/SelectOrderTypeModal.jsx";
import SelectQuantityModal from "../../components/Product/SelectQuantityModal.jsx";
import {useCreateCart} from "../../api/Cart/queris.js";

function Product() {
    const {productId} = useParams()


    const {data: productData} = useGetProductDetail(parseInt(productId))
    const product = productData?.data?.data
    const discountedPrice = Math.round((product?.productPrice * (1 - product?.productDiscount / 100)) / 10) * 10;

    const orderOptionFunc = (orderOption) => {
        if (orderOption === "SINGLE") {
            return (
                <div className="flex">
                    <div className="bg-blue-200 flex items-center gap-1 p-1 px-3 rounded-3xl text-md">
                        <SingleOrder/>
                        <span>단건</span>
                    </div>
                </div>
            )
        } else if (orderOption === "SUBSCRIPTION") {
            return (
                <div className="flex">
                    <div className="bg-orange-200 flex items-center gap-1 p-1 px-3 rounded-3xl text-md">
                        <SubscriptionOrder/>
                        <span>정기</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex items-center gap-1 text-md">
                    <div className="flex">
                        <div className="bg-blue-200 flex items-center gap-1 p-1 px-3 rounded-3xl text-md">
                            <SingleOrder/>
                            <span>단건</span>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="bg-orange-200 flex items-center gap-1 p-1 px-3 rounded-3xl text-md">
                            <SubscriptionOrder/>
                            <span>정기</span>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const {modalState, setModalState} = useModalStore();
    const [isSelectOrderType, setIsSelectOrderType] = useState(false)
    const [orderType, setOrderType] = useState(null);
    const [productQuantity, setProductQuantity] = useState(1);

    const buyButtonFunc = () => {
        setModalState(true)
    }

    console.log(`productId : ${product?.productId}, orderType : ${orderType === null ? product?.orderOption : orderType}, productQuantity : ${productQuantity}` )

    const handleModalClose = () => {
        setIsSelectOrderType(false);
        setOrderType(null);
        setProductQuantity(1);
        setModalState(false)
    }

    const {mutate } = useCreateCart({productId:parseInt(productId),quantity:productQuantity, orderOption:orderType === null ? product?.orderOption : orderType  })


    const clickCartBtn = async () => {
        // TODO: cart 넣는 API 호출, 카트에 추가됐다는 토스트 , orderType이 null 이면 product?.orderOption 넣으면 댐
        console.log("cart Btn")
        await mutate()
        setModalState(false)
    }

    const clickBuyBtn = () => {
        // TODO: cart 넣는 API 호출, 카트에 추가됐다는 토스트 , orderType이 null 이면 product?.orderOption 넣으면 댐, 주문 내역으로 navigate
        setModalState(false)
    }

    return (

        <div className="w-full flex flex-col">
            {/* 이미지 */}
            <div style={{width: "100%", aspectRatio: "1/1", position: "relative"}} className="bg-second">
                <img src={product?.productImagePath}/>

            </div>
            {/* 상품 정보*/}
            <div className="p-6">
                <div className="mb-3">
                    <div className="text-gray-400">{product?.categoryName}</div>
                    <div className="text-2xl" style={{letterSpacing: "0.5px"}}>{product?.productName}</div>
                </div>
                <div className="mb-3">
                    <div className="font-bold text-2xl" style={{letterSpacing: "1px"}}><span
                        className="text-red-500 mr-1.5">{product?.productDiscount}%</span>
                        <span>{discountedPrice.toLocaleString()}원</span></div>
                    <div className="line-through text-xl text-gray-300"
                         style={{letterSpacing: "1px"}}>{product?.productPrice.toLocaleString()}원
                    </div>
                </div>
                <div className="mb-2">{orderOptionFunc(product?.orderOption)}</div>
                <div className="text-gray-500">배송비 무료, 이 상품 배송은 평균 2~7일 걸려요</div>
            </div>

            {/* 상품 상세 정보 */}
            <div className="w-full bg-amber-200 px-6" style={{height: '1000px'}}></div>

            {/*  상품 문의  */}
            <div className="px-6">
                <AccordionBody/>
            </div>

            {/* 구매 버튼 */}
            <div className='sticky bottom-0 left-0 right-0 flex w-full p-4 px-6 py-4 '
                 style={{background: 'linear-gradient(to top, white, white 65%, transparent)'}}>
                <BottomButton buttonText='구매하기' buttonStyle='bg-main text-white' buttonFunc={buyButtonFunc}/>
            </div>

            <SlideUpModal isOpen={modalState}
                          setIsModalOpen={handleModalClose}
                          headerText={product?.orderOption === "BOTH" && !isSelectOrderType? "배송 방식 선택" : "제품 개수 선택 "}
                          isButton={!(product?.orderOption === "BOTH" && !isSelectOrderType)}
                          buttonText="구매하기"
                          buttonStyle="bg-main text-white"
                          buttonFunc={clickBuyBtn}
            >
                {product?.orderOption === "BOTH" && !isSelectOrderType ?
                    <SelectOrderTypeModal setIsSelectOrderType={setIsSelectOrderType} setOrderType={setOrderType}/>
                    : <SelectQuantityModal productName={product?.productName}
                                           discountedPrice={discountedPrice}
                                           productQuantity={productQuantity}
                                           setProductQuantity={setProductQuantity}
                                           clickCartBtn={clickCartBtn}
                    />
                }
            </SlideUpModal>

        </div>
    )
}

export default Product;
