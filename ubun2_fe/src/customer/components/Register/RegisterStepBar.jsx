const RegisterStepBar = ({ registerStep }) => {
  return (
    <>
      <ol className='flex items-center w-full py-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:py-3 sm:space-x-4 rtl:space-x-reverse'>
        <li className='flex items-center text-main dark:text-main'>
          <span className='flex items-center justify-center w-5 h-5 me-2 text-xs border border-main rounded-full shrink-0 dark:border-main'>1</span>
          사업자<span className='hidden sm:inline-flex sm:ms-1'>인증</span>
          <svg
            className={`w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180 ${registerStep === 1 ? 'animate-move-sideways' : null}`}
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 12 10'
          >
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m7 9 4-4-4-4M1 9l4-4-4-4' />
          </svg>
        </li>
        <li className={`flex items-center ${registerStep >= 2 ? 'text-main dark:text-main' : 'null'}`}>
          <span
            className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${
              registerStep >= 2 ? 'border-main dark:border-main' : 'border-gray-500 dark:border-gray-400'
            } rounded-full shrink-0`}
          >
            2
          </span>
          정보 <span className='hidden sm:inline-flex sm:ms-1'>입력</span>
          <svg
            className={`w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180 ${registerStep === 2 ? 'animate-move-sideways' : null}`}
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 12 10'
          >
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m7 9 4-4-4-4M1 9l4-4-4-4' />
          </svg>
        </li>
        <li className={`flex items-center ${registerStep >= 3 ? 'text-main dark:text-main' : 'null'}`}>
          <span
            className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${
              registerStep >= 3 ? 'border-main dark:border-main' : 'border-gray-500 dark:border-gray-400'
            } rounded-full shrink-0`}
          >
            3
          </span>
          상점 정보 입력
        </li>
      </ol>
    </>
  );
};

export default RegisterStepBar;
