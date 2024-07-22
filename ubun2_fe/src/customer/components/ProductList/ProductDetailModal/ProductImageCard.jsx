import { useRef, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/16/solid';
import { FileInput, Label } from 'flowbite-react';

const ProductImageCard = ({ product, onlyInfo, title, handleInputImageChange }) => {
  const { imageUrl } = product || '';

  const fileInputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(imageUrl || null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    handleInputImageChange(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  return (
    <div className='bg-gray-50 p-4 rounded-lg h-full'>
      <div className='text-lg font-bold mb-7'>{title}</div>
      <div className='border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-lg h-5/6'>
        {previewUrl ? (
          <img src={previewUrl} alt='Product Preview' className='h-full object-cover rounded-lg' onClick={handleIconClick} />
        ) : (
          <div className=' h-full flex flex-col items-center justify-center gap-4' style={{ display: onlyInfo ? 'none' : 'contents' }}>
            <div className='bg-gray-100 p-2 rounded-lg'>
              <p className='text-sm'>등록하실 상품의 사진을 등록해주세요.</p>
            </div>
            <button onClick={handleIconClick} disabled={onlyInfo}>
              <PlusCircleIcon className=' w-7 h-7 text-purple-200' />
            </button>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='file-upload' />
              </div>
              <FileInput id='file-upload' onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageCard;
