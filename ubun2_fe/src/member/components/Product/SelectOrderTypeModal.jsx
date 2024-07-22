const SelectOrderTypeModal = ({setIsSelectOrderType, setOrderType}) => {
    return (
        <div className='flex flex-col items-start space-y-4'>
            <button className='p-2 pl-4 text-lg text-gray-500' onClick={() => {
                setOrderType("SINGLE")
                setIsSelectOrderType(true)
            }}>한번만 받을래요</button>
            <button className='p-2 pl-4 text-lg text-gray-500' onClick={() => {
                setOrderType("SUBSCRIPTION")
                setIsSelectOrderType(true)
            }}>정기적으로 받을래요</button>
        </div>)
}

export default SelectOrderTypeModal