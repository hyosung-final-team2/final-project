import { useState, useEffect, useCallback } from 'react';
import AddressInput from '../common/Input/AddressInput';
import StoreInfoDetail from './StoreInfoDetail';
import StoreDescriptionNotice from './StoreDescriptionNotice';
import { addressInfos } from './StoreInfoData';
import { useGetMypage, useUpdateMypage } from '../../api/Customer/Mypage/queries';

const StoreInfoDashBoard = () => {
  const commonButtonStyles =
    'rounded-lg transition duration-200 border border-gray-200 shadow-md bg-custom-button-purple text-custom-font-purple hover:text-white hover:bg-custom-font-purple';

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    businessAddress: '',
    description: '',
    announcement: '',
    businessName: '',
    businessOwner: '',
    businessRegistrationNumber: '',
    businessOpenDate: '',
    customerEmail: '',
    logoImagePath: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);

  const { data: mypage, isLoading, isError } = useGetMypage();
  const updateMypageMutation = useUpdateMypage();

  useEffect(() => {
    if (mypage?.data) {
      setFormData(prevState => ({
        ...prevState,
        customerName: mypage.data.customerName || prevState.customerName,
        customerPhone: mypage.data.customerPhone || prevState.customerPhone,
        businessAddress: mypage.data.businessAddress || prevState.businessAddress,
        description: mypage.data.description || prevState.description,
        announcement: mypage.data.announcement || prevState.announcement,
        businessName: mypage.data.businessName || prevState.businessName,
        businessOwner: mypage.data.businessOwner || prevState.businessOwner,
        businessRegistrationNumber: mypage.data.businessRegistrationNumber || prevState.businessRegistrationNumber,
        businessOpenDate: mypage.data.businessOpenDate || prevState.businessOpenDate,
        customerEmail: mypage.data.customerEmail || prevState.customerEmail,
        logoImagePath: mypage.data.logoImagePath || prevState.logoImagePath,
      }));
    }
  }, [mypage]);

  const handleInputChange = e => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setImageFile(files[0]);
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleNameEdit = () => {
    setIsEditingName(!isEditingName);
  };

  const handleAddressInputChange = useCallback(event => {
    if (event.data && event.data.type === 'ADDRESS_SELECTED') {
      const result = event.data.result;
      const fullAddress = `${result.zipNo || ''} ${result.roadAddrPart1 || ''} ${result.addrDetail || ''}`.trim();
      setFormData(prevState => ({
        ...prevState,
        businessAddress: fullAddress,
      }));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleAddressInputChange);
    return () => {
      window.removeEventListener('message', handleAddressInputChange);
    };
  }, [handleAddressInputChange]);

  const handleSubmit = () => {
    console.log('Submitting data:', formData);
    updateMypageMutation.mutate(
      { myPageUpdateRequest: formData, imageFile },
      {
        onSuccess: () => {
          console.log('마이페이지 업데이트 성공');
          // 성공 메시지 표시
        },
        onError: error => {
          console.error('마이페이지 업데이트 실패:', error);
          // 에러 메시지 표시
        },
      }
    );
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      <div className='flex flex-col gap-3 px-4 py-4'>
        <StoreInfoDetail
          isEditingName={isEditingName}
          formData={formData}
          handleNameEdit={handleNameEdit}
          handleInputChange={handleInputChange}
          imageFile={imageFile}
        />
        <AddressInput infos={addressInfos} title='주소 추가' />
        <StoreDescriptionNotice formData={formData} handleInputChange={handleInputChange} />
        <div className='flex justify-end px-4 mb-2'>
          <button className={`${commonButtonStyles} px-8 py-4`} onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreInfoDashBoard;
