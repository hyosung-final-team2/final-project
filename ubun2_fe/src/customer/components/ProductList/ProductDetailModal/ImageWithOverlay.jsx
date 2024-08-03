import { PlusCircleIcon } from '@heroicons/react/16/solid';

const ImageWithOverlay = ({ url, onClick, disabled, isDetail = false }) => (
  <div className='relative h-full w-full'>
    <img src={url} alt='Product Preview' className='h-full w-full object-cover rounded-lg aspect-square' />
    {!disabled && (
      <div
        onClick={onClick}
        style={{ backdropFilter: 'blur(2px)' }}
        className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
      >
        {!isDetail ? (
          <>
            <div className='bg-gray-50 p-2 rounded-lg'>
              <p className='text-sm'>변경하실 상품의 사진을 등록해주세요.</p>
            </div>
            <PlusCircleIcon className='w-7 h-7 text-purple-200 mt-2' />
          </>
        ) : (
          <PlusCircleIcon className='w-7 h-7 text-purple-200 mt-2' />
        )}
      </div>
    )}
  </div>
);

export default ImageWithOverlay;
