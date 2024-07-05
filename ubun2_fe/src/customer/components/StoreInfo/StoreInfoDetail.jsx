import { FileInput, Label, TextInput } from 'flowbite-react';
import InputLabel from '../common/Input/InputLabel';
import UpdateInputLabel from '../common/Input/UpdateInputLabel';
import { CheckIcon, PencilSquareIcon, PhotoIcon } from '@heroicons/react/16/solid';

const StoreInfoDetail = ({ storeName, isEditingName, profileImage, formData, handleNameEdit, handleInputChange }) => {
  return (
    <>
      <div className='flex gap-10 mb-6'>
        <div>
          <div className='flex items-center justify-center mb-6'>
            <div className='flex items-center gap-2'>
              {isEditingName ? (
                <TextInput name='storeName' value={storeName} onChange={handleInputChange} onBlur={handleNameEdit} className='text-2xl font-bold' />
              ) : (
                <h2 className='text-xl font-bold'>{storeName}</h2>
              )}
              <button className='w-5' onClick={handleNameEdit}>
                {isEditingName ? <CheckIcon /> : <PencilSquareIcon />}
              </button>
            </div>
          </div>

          {/* 사진 업로드 */}
          <div className='flex flex-col mr-6'>
            {profileImage ? (
              <img src={profileImage} alt='상점이미지' className='object-cover rounded-full w-52 h-52' />
            ) : (
              <div className='flex items-center justify-center bg-gray-200 rounded-full w-52 h-52'>
                <span className='text-gray-500'>No Image</span>
              </div>
            )}
            <div className='flex justify-end mt-2'>
              <FileInput id='profile-upload' name='profileImage' className='hidden' onChange={handleInputChange} accept='image/*' />
              <Label htmlFor='profile-upload' className='cursor-pointer'>
                <div className='flex items-center text-sm text-blue-600'>
                  <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path>
                  </svg>
                  <PhotoIcon className='w-5 mr-1' />
                  사진 업로드
                </div>
              </Label>
            </div>
          </div>
        </div>
        {/* 고객 정보 */}
        <div className='grid items-start flex-1 gap-6' style={{ gridTemplateColumns: '4fr 6fr' }}>
          <InputLabel labelTitle='대표자' defaultValue={formData.representative} disabled={true} />
          <InputLabel labelTitle='사업자등록번호' defaultValue={formData.businessNumber} disabled={true} />
          <InputLabel labelTitle='개업일' defaultValue={formData.openingDate} disabled={true} />
          <InputLabel labelTitle='이메일' defaultValue={formData.email} disabled={true} />
          <UpdateInputLabel labelTitle='고객명' name='customerName' defaultValue={formData.customerName} disabled={false} onChange={handleInputChange} />
          <UpdateInputLabel labelTitle='전화번호' name='phoneNumber' defaultValue={formData.phoneNumber} disabled={false} onChange={handleInputChange} />
        </div>
      </div>
    </>
  );
};

export default StoreInfoDetail;
