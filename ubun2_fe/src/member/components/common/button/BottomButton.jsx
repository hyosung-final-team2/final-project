const BottomButton = ({ buttonText, buttonStyle, buttonFunc }) => {
    return (
        <button onClick={() => buttonFunc()} className={`font-bold w-full h-14 rounded-2xl mt-5 ${buttonStyle}`}>
            {buttonText}
        </button>
    );
}

export default BottomButton;
