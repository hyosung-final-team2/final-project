import { useRef } from 'react';
import { PlusCircleIcon } from '@heroicons/react/16/solid';
import { FileInput, Label } from 'flowbite-react';

const ProductImageCard = () => {
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className='bg-gray-50 p-4 rounded-lg h-full'>
      <div className='text-lg font-bold mb-7'>상품 사진</div>
      <div className='border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-lg h-5/6'>
        <div className=' h-full flex flex-col items-center justify-center gap-4'>
          <div className='bg-gray-100 p-2 rounded-lg'>
            <p className='text-sm'>등록하실 상품의 사진을 등록해주세요.</p>
          </div>
          <button onClick={handleIconClick}>
            <PlusCircleIcon className=' w-7 h-7 text-purple-200' />
          </button>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='file-upload' />
            </div>
            <FileInput id='file-upload' ref={fileInputRef} style={{ display: 'none' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageCard;
