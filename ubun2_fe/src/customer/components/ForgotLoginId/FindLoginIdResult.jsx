import useCustomerStore from "../../store/customerStore.js";
import {useNavigate} from "react-router-dom";

const FindLoginIdResult = ({findId}) => {
    const navigate = useNavigate();
    const maskString = (input) => {
        if (input === null) return
        const length = input.length;
        const halfLength = Math.floor(length / 2);

        const visiblePart = input.slice(0, halfLength);
        const maskedPart = '*'.repeat(length - halfLength);

        return `${visiblePart}${maskedPart}`;
    }

    const firstButtonFunc = () => {
        navigate("/customer/login");
    }

    const secondButtonFunc = () => {
        navigate("/customer/forgot-password");
    }

    const buttonStyle = 'bg-main text-white';
    const {customerName} = useCustomerStore()
    return (<div className='flex flex-col items-center gap-2'>
        <svg width='100px' height='100px' viewBox='0 0 24 24' fill='none'
             xmlns='http://www.w3.org/2000/svg'>
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
                <path
                    opacity='0.5'
                    d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
                    fill='#928AFF'
                ></path>
                <path
                    d='M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z'
                    fill='#928AFF'
                ></path>
            </g>
        </svg>
        <h1 className='text-2xl text-bold'>{customerName}님의 아이디는 </h1>
        <h1 className='text-2xl text-bold'><span
            className='text-2xl text-bold text-main'>{maskString(findId)}</span> 입니다.</h1>

        <div className='flex w-full'>
            <button onClick={() => firstButtonFunc()}
                    className={`font-bold w-48/100 h-14 rounded-2xl mt-5 ${buttonStyle}`}>
                로그인하기
            </button>
            <div className='w-4/100'></div>
            <button onClick={() => secondButtonFunc()}
                    className={`font-bold w-48/100 h-14 rounded-2xl mt-5 ${buttonStyle}`}>
                비밀번호 찾기
            </button>
        </div>

    </div>)
}

export default FindLoginIdResult;