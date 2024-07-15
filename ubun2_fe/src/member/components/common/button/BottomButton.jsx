const BottomButton = ({ buttonText, buttonStyle, buttonFunc }) => {
    return (
        <button onClick={() => buttonFunc()} className={`${buttonStyle} font-bold w-full h-14 rounded-2xl mt-5`}>
            {buttonText}
        </button>
    );
}

export default BottomButton;