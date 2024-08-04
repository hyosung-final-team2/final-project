import InputText from '../common/Input/InputText';
import InputTextWithBtn from '../common/Input/InputTextWithBtn';
import { useState, useEffect } from 'react';
import { useSignup } from '../../api/Customer/Register/queris.js';
import { businessStoreNameRegex, businessStoreNameRegexMessage, phoneRegex, phoneRegexMessage } from '../common/Regex/registerRegex.js';

const RegisterSecondStep = ({ setRegisterStep, setRegisterThirdData }) => {
  const INITIAL_REGISTER_OBJ = {
    businessName: '',
    customerPhone: '',
    businessAddressNumber: '',
    businessAddressDefault: '',
    businessAddressDetail: '',
  };

  const [isAllValuePossible, setIsAllValuePossible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [thirdRegisterObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
  const [popup, setPopup] = useState(null);

  const { mutate: signUpMutate, isError } = useSignup(thirdRegisterObj);

  useEffect(() => {
    const { businessName, customerPhone, businessAddressNumber, businessAddressDefault, businessAddressDetail } = thirdRegisterObj;

    if (
      businessName.trim() !== '' &&
      customerPhone.trim() !== '' &&
      businessAddressNumber.trim() !== '' &&
      businessAddressDefault.trim() !== '' &&
      businessAddressDetail.trim() !== '' &&
      businessStoreNameRegex.test(businessName.trim()) &&
      phoneRegex.test(customerPhone.trim())
    ) {
      setIsAllValuePossible(true);
    } else {
      setIsAllValuePossible(false);
    }
  }, [thirdRegisterObj]);

  const submitForm = () => {
    setErrorMessage('');

    if (thirdRegisterObj.businessName.trim() === '') return setErrorMessage('상호명을 입력해주세요');
    if (thirdRegisterObj.customerPhone.trim() === '') return setErrorMessage('전화번호를 입력해주세요');
    if (thirdRegisterObj.businessAddressNumber.trim() === '') return setErrorMessage('주소를 입력해주세요');
    else {
      setLoading(true);
      setRegisterThirdData(thirdRegisterObj);
      signUpMutate();
      setLoading(false);
      if (!isError) {
        setRegisterStep(4);
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setRegisterObj({ ...thirdRegisterObj, [updateType]: value });
  };

  const updateAddress = (addressDefault, addressNumber) => {
    setRegisterObj(prevState => ({
      ...prevState,
      businessAddressDefault: addressDefault,
      businessAddressNumber: addressNumber,
    }));
  };

  const handleAddressSearch = () => {
    const POPUP_WIDTH = 700;
    const POPUP_HEIGHT = 760;
    const features = `width=${POPUP_WIDTH},height=${POPUP_HEIGHT}`;
    const currentHost = window.location.origin;
    const url = `${currentHost}/customer/address-search`;

    const newPopup = window.open(url, '_blank', features);
    setPopup(newPopup);

    window.addEventListener('message', handleAddressMessage);
  };

  const handleAddressMessage = event => {
    if (event.origin !== window.location.origin) return;

    if (event.data.type === 'ADDRESS_SELECTED') {
      const result = event.data.result;
      console.log('Address selected:', result);

      updateAddress(result.roadAddrPart1 || '', result.zipNo || '');

      if (popup) {
        popup.close();
      }
      setPopup(null);
    }
  };
  // console.log(thirdRegisterObj);
  useEffect(() => {
    window.addEventListener('message', handleAddressMessage);
    return () => {
      window.removeEventListener('message', handleAddressMessage);
    };
  }, [handleAddressMessage]);

  return (
    <>
      <h2 className='text-3xl font-bold mb-2 text-left text-main'>상점 정보를 입력해주세요.</h2>
      <div>
        <div className='mb-4'>
          <InputText
            defaultValue={thirdRegisterObj.businessName}
            updateType='businessName'
            containerStyle='mt-4'
            labelTitle='상호명'
            updateFormValue={updateFormValue}
            placeholder='상호명을 입력해주세요.'
            isRegexInput={true}
            regex={businessStoreNameRegex}
            regexMessage={businessStoreNameRegexMessage}
          />
          <InputText
            defaultValue={thirdRegisterObj.customerPhone}
            updateType='customerPhone'
            containerStyle='mt-4'
            labelTitle='전화번호'
            updateFormValue={updateFormValue}
            placeholder='전화번호를 입력해주세요.'
            isRegexInput={true}
            regex={phoneRegex}
            regexMessage={phoneRegexMessage}
          />

          <InputTextWithBtn
            defaultValue={thirdRegisterObj.businessAddressNumber}
            updateType='businessAddressNumber'
            containerStyle='mt-4'
            labelTitle='사업장 주소'
            updateFormValue={updateFormValue}
            placeholder='우편 번호'
            buttonText='검색하기'
            clickPossibleWithoutData={true}
            isAuthInput={true}
            addressFunc={handleAddressSearch}
            buttonFunc={handleAddressSearch}
          />
          <InputText
            defaultValue={thirdRegisterObj.businessAddressDefault}
            updateType='businessAddressDefault'
            containerStyle='mt-1'
            updateFormValue={updateFormValue}
            placeholder='기본 주소'
            addressFunc={handleAddressSearch}
          />
          <InputText
            defaultValue={thirdRegisterObj.businessAddressDetail}
            updateType='businessAddressDetail'
            containerStyle='mt-1'
            updateFormValue={updateFormValue}
            placeholder='상세 주소'
          />
        </div>

        <button
          onClick={() => submitForm()}
          className={
            `btn mt-2 w-full ${isAllValuePossible ? 'bg-main text-white btn-primary' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}` +
            (loading ? ' loading' : '')
          }
          disabled={!isAllValuePossible}
        >
          다음
        </button>
      </div>
    </>
  );
};

export default RegisterSecondStep;
