const CustomButton = ({ buttonText, buttonStyle, buttonFunc }) => {
    return (
        <button onClick={() => buttonFunc()} className={`font-bold w-full h-14 rounded-2xl ${buttonStyle}`}>
            {buttonText}
        </button>
    );
}

export default CustomButton;
