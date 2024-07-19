import QuantityButton from "../common/button/QuantityButton.jsx";

const SelectQuantityModal = ({productName,discountedPrice, productQuantity, setProductQuantity, clickCartBtn}) => {
    return (
        <div className="px-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="text-lg text-gray-600">{productName}</div>
                    <div className="text-gray-500">{discountedPrice.toLocaleString()}원</div>
                </div>
                <div>
                    <QuantityButton initialQuantity={productQuantity} onQuantityChange={setProductQuantity}/>
                </div>
            </div>
            <hr/>
            <div>
                <div className="text-lg font-bold mt-4">총 {(discountedPrice * productQuantity).toLocaleString()}원</div>
                <div className="mt-4 text-main" onClick={() => clickCartBtn()}>장바구니에 추가 <span className="font-bold ml-1"> {">"} </span> </div>
            </div>
        </div>
    )
}

export default SelectQuantityModal