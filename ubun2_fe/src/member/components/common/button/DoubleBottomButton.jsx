const DoubleBottomButton = ({ firstButtonText,secondButtonText, buttonStyle, firstButtonFunc, secondButtonFunc }) => {
    return (
        <div className='flex '>
            <button onClick={() => firstButtonFunc()} className={`font-bold w-48/100 h-14 rounded-2xl mt-5 ${buttonStyle}`}>
                {firstButtonText}
            </button>
            <div className='w-4/100'></div>
            <button onClick={() => secondButtonFunc()} className={`font-bold w-48/100 h-14 rounded-2xl mt-5 ${buttonStyle}`}>
                {secondButtonText}
            </button>
        </div>
    );
}

export default DoubleBottomButton;
