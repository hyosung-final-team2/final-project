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
                  <div className="bg-blue-200 flex items-center gap-1 p-1 px-2 rounded-3xl text-xs">
                      <SingleOrder/>
                      <span>단건</span>
                  </div>
              </div>
          )
      } else if (orderOption === "SUBSCRIPTION") {
          return (
              <div className="flex">
                  <div className="bg-orange-200 flex items-center gap-1 p-1 px-2 rounded-3xl text-xs">
                      <SubscriptionOrder/>
                      <span>정기</span>
                  </div>
              </div>
          )
      } else {
          return (
              <div className="flex items-center gap-1 text-xs">
                  <div className="flex">
                      <div className="bg-blue-200 flex items-center gap-1 p-1 px-2 rounded-3xl text-xs">
                          <SingleOrder/>
                          <span>단건</span>
                      </div>
                  </div>

                  <div className="flex">
                      <div className="bg-orange-200 flex items-center gap-1 p-1 px-2 rounded-3xl text-xs">
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
          <div className={`p-3 w-full h-full flex flex-col gap-0.5 ${!isOdd ? "pl-2 pr-4" : "pl-4 pr-2"}`}>
              <div style={{width: "100%", aspectRatio: "1/1", position: "relative"}} className="bg-second rounded-xl">
                  <img src={productImage} className="w-full h-full object-cover rounded-xl"/>
                  <div className="absolute top-1 left-1">
                      {stockQuantity <= 10 ?
                          <div className="flex items-center text-red-600 gap-1 text-sm">
                            <Clock className="w-5 h-5"/>
                            <span>품절임박 (잔여 {stockQuantity}개)</span>
                          </div> : null}
                  </div>
              </div>
              <p>{productName}</p>
              <p className="font-bold"><span
                  className="text-red-500 mr-0.5">{productDiscountPercent}%</span> {discountedPrice.toLocaleString()}원</p>
              <div>{orderOptionFunc(orderOption)}</div>
          </div>
      </div>
  );
}

export default ProductItem;
