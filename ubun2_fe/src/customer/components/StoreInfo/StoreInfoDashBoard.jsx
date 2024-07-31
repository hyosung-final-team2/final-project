import { useState, useEffect, useCallback } from 'react';
import AddressInput from '../common/Input/AddressInput';
import StoreInfoDetail from './StoreInfoDetail';
import StoreDescriptionNotice from './StoreDescriptionNotice';
import { useGetMypage, useUpdateMypage } from '../../api/Customer/Mypage/queries';
import toast from 'react-hot-toast';
import { errorToastStyle, successToastStyle } from '../../../member/api/toastStyle';
import { Card } from 'flowbite-react';

const StoreInfoDashBoard = () => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md ';

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

  const [addressInfos, setAddressInfos] = useState([
    { placeholder: '우편번호', value: '', label: '우편번호' },
    { placeholder: '도로명주소', value: '', label: '도로명주소' },
    { placeholder: '상세주소', value: '', label: '상세주소' },
  ]);

  const [imageFile, setImageFile] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);

  const { data: mypage, isLoading, isError } = useGetMypage();
  const updateMypageMutation = useUpdateMypage();

  const addressRegex = /^(.*(?:로|길)\s*\d+(?:-\d+)?(?:\s*\d*)?)\s+(.+)$/;
  const separateAddress = fullAddress => {
    const match = fullAddress.match(addressRegex);
    if (match) {
      return {
        roadAddress: match[1].trim(),
        detailAddress: match[2].trim(),
      };
    }
    return { roadAddress: fullAddress, detailAddress: '' };
  };

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

      const [zipNo, ...rest] = mypage.data.businessAddress.split(',');
      const refinedAddress = rest.join(' ').trim();
      const { roadAddress, detailAddress } = separateAddress(refinedAddress || '');

      const newAddressInfos = [
        { placeholder: zipNo, value: zipNo || '', label: '우편번호' },
        { placeholder: roadAddress, value: roadAddress || '', label: '도로명주소' },
        { placeholder: detailAddress, value: detailAddress || '', label: '상세주소' },
      ];
      setAddressInfos(newAddressInfos);
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

  const handleAddressInputChange = useCallback(newAddressData => {
    setAddressInfos(prevInfos => {
      return prevInfos.map(info => ({
        ...info,
        value: newAddressData[info.label] || info.value,
      }));
    });

    setFormData(prevState => {
      const newBusinessAddress = Object.values(newAddressData).filter(Boolean).join(',').trim();
      return {
        ...prevState,
        businessAddress: newBusinessAddress,
      };
    });
  }, []);

  useEffect(() => {
    const handleMessage = event => {
      if (event.data && event.data.type === 'ADDRESS_SELECTED') {
        const result = event.data.result;
        const { roadAddress, detailAddress } = separateAddress(result.roadAddrPart1 || '');
        const newAddressInfos = [
          { placeholder: result.zipNo, value: result.zipNo || '', label: '우편번호' },
          { placeholder: roadAddress, value: roadAddress || '', label: '도로명주소' },
          { placeholder: detailAddress, value: detailAddress || '', label: '상세주소' },
        ];
        setAddressInfos(newAddressInfos);

        const fullAddress = newAddressInfos
          .map(info => info.value)
          .filter(Boolean)
          .join(',')
          .trim();
        setFormData(prevState => ({
          ...prevState,
          businessAddress: fullAddress,
        }));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleSubmit = () => {
    const updatedAddressInfos = addressInfos.map(info => ({
      ...info,
      value: info.value.trim(),
    }));

    const allAddressFieldsFilled = updatedAddressInfos.every(info => info.value !== '');
    if (!allAddressFieldsFilled) {
      toast.error('모든 주소 필드를 입력해 주세요.', errorToastStyle);
      return;
    }

    const updatedFormData = {
      ...formData,
      businessAddress: updatedAddressInfos
        .map(info => info.value)
        .filter(Boolean)
        .join(',')
        .trim(),
    };

    let imageToSubmit = imageFile || undefined;

    updateMypageMutation.mutate(
      { myPageUpdateRequest: updatedFormData, imageFile: imageToSubmit },
      {
        onSuccess: data => {
          setFormData(prevState => ({
            ...prevState,
            ...data,
          }));
          setImageFile(null);
          toast.success('마이페이지 업데이트가 완료되었습니다.', successToastStyle);
        },
        onError: () => {
          toast.error('마이페이지 업데이트가 실패했습니다. 다시 시도해주세요.', errorToastStyle);
        },
      }
    );
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div className='p-6 bg-white'>
      <div className='max-w-5xl mx-auto'>
        <Card className='mb-6'>
          <h1 className='mb-6 text-2xl font-bold'>상점 정보</h1>
          <StoreInfoDetail
            isEditingName={isEditingName}
            formData={formData}
            handleNameEdit={handleNameEdit}
            handleInputChange={handleInputChange}
            imageFile={imageFile}
          />
        </Card>

        <Card className='mb-6'>
          <h2 className='mb-4 text-xl font-semibold'>주소 정보</h2>
          <AddressInput infos={addressInfos} title='주소 추가' onChange={handleAddressInputChange} />
        </Card>

        <Card className='mb-6'>
          <h2 className='mb-4 text-xl font-semibold'>상점 설명 및 공지사항</h2>
          <StoreDescriptionNotice formData={formData} handleInputChange={handleInputChange} />
        </Card>

        <div className='flex justify-end'>
          <button
            className={`${commonButtonStyles} bg-custom-button-purple text-custom-font-purple hover:text-white hover:bg-custom-font-purple`}
            onClick={handleSubmit}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreInfoDashBoard;
