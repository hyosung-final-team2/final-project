import React from 'react';

const NotFound404 = () => {
  return (
    <div className='relative w-screen h-screen overflow-hidden'>
      <img src='/404-page.jpg' alt='404 background' className='absolute w-full h-full object-cover' />
      <div className='absolute inset-0 top-[40%] flex flex-col justify-center items-center'>
        <div className='text-5xl font-semibold mb-2 text-gray-500'>잘못된 접근입니다</div>
        <div className='text-lg font-semibold mb-6 text-gray-500'>올바른 경로로 다시 접속해주세요.</div>
        <button className='bg-gray-100 hover:bg-gray-200 w-44 text-xl font-semibold text-main px-4 py-2 rounded-full shadow-md'>홈으로 이동하기</button>
      </div>
    </div>
  );
};

export default NotFound404;
