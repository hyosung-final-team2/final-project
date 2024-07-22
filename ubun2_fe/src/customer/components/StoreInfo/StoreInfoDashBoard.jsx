import { useEffect, useState } from 'react';
import AddressInput from '../common/Input/AddressInput';
import StoreInfoDetail from './StoreInfoDetail';
import StoreDescriptionNotice from './StoreDescriptionNotice';
import { storeInfoData, addressInfos } from './StoreInfoData';

const StoreInfoDashBoard = () => {
  const commonButtonStyles =
    'rounded-lg transition duration-200 border border-gray-200 shadow-md  bg-custom-button-purple text-custom-font-purple hover:text-white hover:bg-custom-font-purple';

  const [formData, setFormData] = useState({
    ...storeInfoData,
    description: '',
    notice: '',
    profileImage: null,
  });
  const [isEditingName, setIsEditingName] = useState(false);

  // storeInfoData가 변경될 때마다 formData를 업데이트
  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      ...storeInfoData,
      description: prevState.description,
      notice: prevState.notice,
      profileImage: prevState.profileImage,
    }));
  }, [storeInfoData]);

  /**
   * 입력값 변경을 처리하는 함수
   */
  const handleInputChange = e => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prevState => ({ ...prevState, [name]: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  /**
   * 상점 이름 편집 모드를 토글하는 함수(수정|저장)
   */
  const handleNameEdit = () => {
    setIsEditingName(!isEditingName);
  };

  /**
   * 폼 데이터를 제출하는 함수(등록)
   */
  const handleSubmit = () => {
    // TODO: StoreInfo 수정 API 호출
    console.log('API 호출: StoreInfo 수정');
    console.log('전송될 데이터:', formData);
  };

  return (
    <div className='relative overflow-x-auto shadow-md' style={{ height: '95%', background: 'white' }}>
      <div className='flex flex-col gap-3 px-4 py-4'>
        <StoreInfoDetail
          storeName={formData.storeName}
          isEditingName={isEditingName}
          profileImage={formData.profileImage}
          formData={formData}
          handleNameEdit={handleNameEdit}
          handleInputChange={handleInputChange}
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
