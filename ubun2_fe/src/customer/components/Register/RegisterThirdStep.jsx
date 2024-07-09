import InputText from '../common/Input/InputText';
import InputTextWithBtn from '../common/Input/InputTextWithBtn';
import { useState, useEffect } from 'react';
import {useSignup} from "../../api/Register/queris.js";

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

  const { mutate: signUpMutate, isError } = useSignup(thirdRegisterObj);

  useEffect(() => {
    const { businessName, customerPhone, businessAddressNumber, businessAddressDefault, businessAddressDetail } = thirdRegisterObj;

    if (
      businessName.trim() !== '' &&
      customerPhone.trim() !== '' &&
      businessAddressNumber.trim() !== '' &&
      businessAddressDefault.trim() !== '' &&
      businessAddressDetail.trim() !== ''

      // TODO: 값이 차있는지뿐만 아니라 값이 유효한 인증된 값인지 여부도 판단해야함
    ) {
      setIsAllValuePossible(true);
    } else {
      setIsAllValuePossible(false);
    }
  }, [thirdRegisterObj]);

  const submitForm = e => {
    e.preventDefault();
    setErrorMessage('');

    if (thirdRegisterObj.businessName.trim() === '') return setErrorMessage('상호명을 입력해주세요');
    if (thirdRegisterObj.customerPhone.trim() === '') return setErrorMessage('전화번호를 입력해주세요');
    if (thirdRegisterObj.businessAddressNumber.trim() === '') return setErrorMessage('주소를 입력해주세요');
    else {
      setLoading(true);
      setRegisterThirdData(thirdRegisterObj);
      signUpMutate()
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

  return (
    <>
      <h2 className='text-3xl font-bold mb-2 text-left text-main'>상점 정보를 입력해주세요.</h2>
      <form onSubmit={e => submitForm(e)}>
        <div className='mb-4'>
          <InputText
            defaultValue={thirdRegisterObj.businessName}
            updateType='businessName'
            containerStyle='mt-4'
            labelTitle='상호명'
            updateFormValue={updateFormValue}
            placeholder='상호명을 입력해주세요.'
          />
          <InputText
            defaultValue={thirdRegisterObj.customerPhone}
            updateType='customerPhone'
            containerStyle='mt-4'
            labelTitle='전화번호'
            updateFormValue={updateFormValue}
            placeholder='전화번호를 입력해주세요.'
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
          />
          <InputText
            defaultValue={thirdRegisterObj.businessAddressDefault}
            updateType='businessAddressDefault'
            containerStyle='mt-1'
            updateFormValue={updateFormValue}
            placeholder='기본 주소'
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
          type='submit'
          className={
            `btn mt-2 w-full ${isAllValuePossible ? 'bg-main text-white btn-primary' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}` +
            (loading ? ' loading' : '')
          }
          disabled={!isAllValuePossible}
        >
          다음
        </button>
      </form>
    </>
  );
};

export default RegisterSecondStep;
