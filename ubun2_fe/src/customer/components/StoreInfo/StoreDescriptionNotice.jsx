import React from 'react';
import { Label, Textarea } from 'flowbite-react';

const StoreDescriptionNotice = ({ formData, handleInputChange }) => {
  const placeHolder = {
    description: '상점에 대한 상세 설명입니다. 상점에 대한 소개글을 입력해주세요.',
    announcement: '판매자가 입력하는 상점에 대한 공지사항입니다.',
  };

  return (
    <div className='flex h-full gap-6 p-3 mb-3'>
      <div className='w-1/2'>
        <Label htmlFor='description' className='text-sm text-gray-500'>
          상점 상세 설명
        </Label>
        <Textarea
          placeholder={placeHolder.description}
          id='description'
          name='description'
          value={formData.description}
          onChange={handleInputChange}
          rows={10}
        />
      </div>

      <div className='w-1/2'>
        <Label htmlFor='announcement' className='text-sm text-gray-500'>
          공지사항
        </Label>
        <Textarea
          placeholder={placeHolder.announcement}
          id='announcement'
          name='announcement'
          value={formData.announcement}
          onChange={handleInputChange}
          rows={10}
        />
      </div>
    </div>
  );
};

export default StoreDescriptionNotice;
