import { Label, Textarea } from 'flowbite-react';

const StoreDescriptionNotice = ({ formData, handleInputChange }) => {
  const placeHolder = {
    description: '상점에 대한 상세 설명입니다. 상점에 대한 소개글을 입력해주세요.',
    announcement: '판매자가 입력하는 상점에 대한 공지사항입니다.',
  };

  return (
    <div className='grid grid-cols-1 gap-10'>
      <div>
        <Label htmlFor='description' className='block mb-4 text-lg font-medium text-gray-700'>
          상점 상세 설명
        </Label>
        <Textarea
          placeholder={placeHolder.description}
          id='description'
          name='description'
          value={formData.description}
          onChange={handleInputChange}
          rows={8}
          className='w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        />
      </div>

      <div>
        <Label htmlFor='announcement' className='block mb-4 text-lg font-medium text-gray-700'>
          공지사항
        </Label>
        <Textarea
          placeholder={placeHolder.announcement}
          id='announcement'
          name='announcement'
          value={formData.announcement}
          onChange={handleInputChange}
          rows={8}
          className='w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        />
      </div>
    </div>
  );
};

export default StoreDescriptionNotice;
