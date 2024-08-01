import { useNavigate } from 'react-router-dom';
import SingleOrder from '../../../assets/images/single.svg'
import SubscriptionOrder from '../../../assets/images/subscription.svg'
import Clock from '@heroicons/react/24/solid/ClockIcon'

function ProductItem({ productId, productName, productPrice, productDiscountPercent, productImage, isOdd, orderOption, stockQuantity }) {
  const navigate = useNavigate();

  const discountedPrice = Math.round((productPrice * (1 - productDiscountPercent / 100)) / 10) * 10;

  const orderOptionFunc = (orderOption) => {
      if (orderOption === "SINGLE") {
          return (
              <div className="flex">
                  <div className={`bg-blue-200 flex items-center gap-1 p-1 px-2 rounded-3xl text-xs ${stockQuantity === 0 ? "opacity-50" : ""}`}>
                      <SingleOrder/>
                      <span>단건</span>
                  </div>
              </div>
          )
      } else if (orderOption === "SUBSCRIPTION") {
          return (
              <div className="flex">
                  <div className={`bg-orange-200 flex items-center gap-1 p-1 px-2 rounded-3xl text-xs ${stockQuantity === 0 ? "opacity-50" : ""}`}>
                      <SubscriptionOrder/>
                      <span>정기</span>
                  </div>
              </div>
          )
      } else {
          return (
              <div className="flex items-center gap-1 text-xs">
                  <div className="flex">
                      <div className={`bg-blue-200 flex items-center gap-1 p-1 px-2 rounded-3xl text-xs ${stockQuantity === 0 ? "opacity-50" : ""}`}>
                          <SingleOrder/>
                          <span>단건</span>
                      </div>
                  </div>

                  <div className="flex">
                      <div className={`bg-orange-200 flex items-center gap-1 p-1 px-2 rounded-3xl text-xs ${stockQuantity === 0 ? "opacity-50" : ""}`}>
                          <SubscriptionOrder/>
                          <span>정기</span>
                      </div>
                  </div>
              </div>
          )
      }
  }

    return (
        <div style={{width: "50%"}} onClick={() => navigate(`product/${productId}`)}>
          <div className={`p-3 w-full h-full flex flex-col gap-1 ${!isOdd ? "pl-2 pr-4" : "pl-4 pr-2"}`}>
              <div style={{width: "100%", aspectRatio: "1/1", position: "relative"}} className=" rounded-xl">
                  <img src={productImage || "/default_big.png"} style={{aspectRatio:1}} className="w-full h-full object-cover rounded-xl" alt="상품사진"/>
                  {
                      stockQuantity <= 10 && stockQuantity !== 0?
                          <div className="absolute top-1 left-1">
                              <div className="flex items-center text-red-600 gap-1 text-sm">
                                  <Clock className="w-5 h-5"/>
                                  <span>품절임박 (잔여 {stockQuantity}개)</span>
                              </div>
                          </div>
                          : null
                  }
                  {
                      stockQuantity === 0 ? (
                          <div className="absolute top-0 left-0 w-full h-full object-cover rounded-xl bg-black opacity-55">
                                <div className="h-full flex justify-center items-center">
                                    <p className="text-white font-bold tracking-widest">일시품절</p>
                                </div>
                          </div>
                      ) : null
                  }
              </div>
              <p className={`font-bold ${stockQuantity === 0 ? "text-gray-400" : ""}`}>{productName}</p>
              <p className={`font-bold ${stockQuantity === 0 ? "text-gray-400" : ""}`}>
                  {productDiscountPercent !== 0 ? <span className={` mr-0.5 ${stockQuantity === 0 ? "text-gray-400" : "text-red-400"}`}>{productDiscountPercent}%</span> : null} {discountedPrice.toLocaleString()}원
              </p>
              <div>{orderOptionFunc(orderOption)}</div>
          </div>
      </div>
  );
}

export default ProductItem;
