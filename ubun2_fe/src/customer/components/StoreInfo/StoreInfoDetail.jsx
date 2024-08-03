import { FileInput, Label, TextInput } from 'flowbite-react';
import InputLabel from '../common/Input/InputLabel';
import UpdateInputLabel from '../common/Input/UpdateInputLabel';
import { CheckIcon, PencilSquareIcon, PhotoIcon } from '@heroicons/react/16/solid';

const inputStyle = 'border border-gray-300';

const StoreInfoDetail = ({ isEditingName, formData, handleNameEdit, handleInputChange, imageFile }) => {
  // 전화번호 포맷팅 함수
  const formatPhoneNumber = phoneNumber => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  // 전화번호 입력 핸들러
  const handlePhoneChange = e => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    handleInputChange({
      target: {
        name: 'customerPhone',
        value: formattedNumber,
      },
    });
  };

  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='flex items-center justify-center mb-1 overflow-hidden bg-gray-200 rounded-xl w-72 h-72'>
          {imageFile ? (
            <img src={URL.createObjectURL(imageFile)} alt='상점이미지' className='object-cover w-full h-full' />
          ) : formData.logoImagePath ? (
            <img src={formData.logoImagePath} alt='상점이미지' className='object-cover w-full h-full' />
          ) : (
            <span className='text-gray-500'>No Image</span>
          )}
        </div>
        <FileInput id='image' name='image' className='hidden' onChange={handleInputChange} accept='image/*' />
        <Label htmlFor='image' className='flex items-center p-2 text-sm cursor-pointer text-main'>
          <PhotoIcon className='w-5 h-5 mr-1 text-main' />
          사진 업로드
        </Label>
      </div>
      <div className='flex flex-col items-center w-full gap-6'>
        <div className='w-11/12'>
          <div className='flex items-center justify-center mb-8'>
            {isEditingName ? (
              <TextInput
                name='businessName'
                value={formData.businessName || ''}
                onChange={handleInputChange}
                onBlur={handleNameEdit}
                className='mr-2 text-2xl font-bold'
              />
            ) : (
              <h2 className='mr-2 text-2xl font-bold'>{formData.businessName}</h2>
            )}
            <button onClick={handleNameEdit}>{isEditingName ? <CheckIcon className='w-5 h-5' /> : <PencilSquareIcon className='w-5 h-5' />}</button>
          </div>

          <div className='grid grid-cols-1 gap-4'>
            <InputLabel labelTitle='대표자' defaultValue={formData.businessOwner} disabled={true} />
            <InputLabel labelTitle='사업자등록번호' defaultValue={formData.businessRegistrationNumber} disabled={true} textStyle='text-sm' />
            <InputLabel labelTitle='개업일' defaultValue={formData.businessOpenDate} disabled={true} />
            <InputLabel labelTitle='이메일' defaultValue={formData.customerEmail} disabled={true} />
            <UpdateInputLabel labelTitle='고객명' name='customerName' value={formData.customerName} onChange={handleInputChange} inputStyle={inputStyle} />
            <UpdateInputLabel
              labelTitle='전화번호'
              name='customerPhone'
              value={formData.customerPhone}
              onChange={handlePhoneChange}
              placeholder='010-0000-0000'
              inputStyle={inputStyle}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreInfoDetail;
