import { useNavigate } from 'react-router-dom';

const RegisterCompletion = ({ resetStore }) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center gap-2'>
      <svg width='100px' height='100px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <path
            opacity='0.5'
            d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
            fill='#928AFF'
          ></path>{' '}
          <path
            d='M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z'
            fill='#928AFF'
          ></path>{' '}
        </g>
      </svg>
      <h1 className='text-3xl text-bold'>회원가입 완료</h1>
      <p className='text-lg text-gray-500'>로그인 이후 서비스를 이용할 수 있어요</p>
      <button
        className={'btn mt-2 w-full bg-main text-white btn-primary'}
        onClick={() => {
          resetStore();
          navigate('/customer/login');
        }}
      >
        로그인하기
      </button>
    </div>
  );
};

export default RegisterCompletion;
