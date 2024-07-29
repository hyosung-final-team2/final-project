import React from 'react';
import { FileInput, Label, TextInput } from 'flowbite-react';
import InputLabel from '../common/Input/InputLabel';
import UpdateInputLabel from '../common/Input/UpdateInputLabel';
import { CheckIcon, PencilSquareIcon, PhotoIcon } from '@heroicons/react/16/solid';

const StoreInfoDetail = ({ isEditingName, formData, handleNameEdit, handleInputChange, imageFile }) => {
  return (
    <>
      <div className='flex gap-10 mb-6'>
        <div>
          <div className='flex items-center justify-center mb-6'>
            <div className='flex items-center gap-2'>
              {isEditingName ? (
                <TextInput
                  name='businessName'
                  value={formData.businessName || ''}
                  onChange={handleInputChange}
                  onBlur={handleNameEdit}
                  className='text-2xl font-bold'
                />
              ) : (
                <h2 className='text-xl font-bold'>{formData.businessName}</h2>
              )}
              <button className='w-5' onClick={handleNameEdit}>
                {isEditingName ? <CheckIcon /> : <PencilSquareIcon />}
              </button>
            </div>
          </div>

          <div className='flex flex-col mr-6'>
            {imageFile ? (
              <img src={URL.createObjectURL(imageFile)} alt='상점이미지' className='object-cover rounded-full w-52 h-52' />
            ) : formData.logoImagePath ? (
              <img src={formData.logoImagePath} alt='상점이미지' className='object-cover rounded-full w-52 h-52' />
            ) : (
              <div className='flex items-center justify-center bg-gray-200 rounded-full w-52 h-52'>
                <span className='text-gray-500'>No Image</span>
              </div>
            )}
            <div className='flex justify-end mt-2'>
              <FileInput id='image' name='image' className='hidden' onChange={handleInputChange} accept='image/*' />
              <Label htmlFor='image' className='cursor-pointer'>
                <div className='flex items-center text-sm text-blue-600'>
                  <PhotoIcon className='w-5 mr-1' />
                  사진 업로드
                </div>
              </Label>
            </div>
          </div>
        </div>
        <div className='grid items-start flex-1 gap-6' style={{ gridTemplateColumns: '4fr 6fr' }}>
          <InputLabel labelTitle='대표자' defaultValue={formData.businessOwner} disabled={true} />
          <InputLabel labelTitle='사업자등록번호' defaultValue={formData.businessRegistrationNumber} disabled={true} />
          <InputLabel labelTitle='개업일' defaultValue={formData.businessOpenDate} disabled={true} />
          <InputLabel labelTitle='이메일' defaultValue={formData.customerEmail} disabled={true} />
          <UpdateInputLabel labelTitle='고객명' name='customerName' value={formData.customerName} onChange={handleInputChange} />
          <UpdateInputLabel labelTitle='전화번호' name='customerPhone' value={formData.customerPhone} onChange={handleInputChange} />
        </div>
      </div>
    </>
  );
};

export default StoreInfoDetail;
