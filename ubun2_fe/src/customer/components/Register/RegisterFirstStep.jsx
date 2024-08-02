import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InputText from '../common/Input/InputText';
import InputTextWithBtn from '../common/Input/InputTextWithBtn';
import { Datepicker } from 'flowbite-react';
import {
  businessNumRegex,
  businessNumRegexMessage,
  businessOwnerRegexMessage,
  datePickMessage,
  nameRegex
} from "../common/Regex/registerRegex.js";

const RegisterFirstStep = ({ setRegisterStep, setRegisterFirstData }) => {
  const INITIAL_REGISTER_OBJ = {
    businessRegistrationNumber: '',
    businessOpenDate: '',
    businessOwner: '',
  };

  const [isAllValuePossible, setIsAllValuePossible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);

  useEffect(() => {
    const { businessRegistrationNumber, businessOpenDate, businessOwner } = registerObj;
    console.log(registerObj);
    console.log(isAllValuePossible);
    console.log(isAuthSuccess)
    if (
      businessRegistrationNumber.trim() !== '' &&
      businessOpenDate.trim() !== '' &&
      businessOwner.trim() !== '' &&
      isAuthSuccess

    ) {
      setIsAllValuePossible(true);
    } else {
      setIsAllValuePossible(false);
    }
  }, [registerObj,isAuthSuccess]);

  const submitForm = () => {
    setErrorMessage('');

    if (registerObj.businessRegistrationNumber.trim() === '') return setErrorMessage('사업자 등록 번호를 인증해주세요');
    if (registerObj.businessOpenDate.trim() === '') return setErrorMessage('사업장 주소를 입력해주세요');
    if (registerObj.businessOwner.trim() === '') return setErrorMessage('대표자 명을 입력해주세요');
    else {
      setLoading(true);
      setRegisterFirstData(registerObj);
      setLoading(false);
      setRegisterStep(2);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setRegisterObj({ ...registerObj, [updateType]: value });
  };

  const handleDateChange = date => {
    const formattedDate = date
      .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .replace(/. /g, '')
      .replace(/. /g, '')
      .replace('.', '');
    setRegisterObj({ ...registerObj, businessOpenDate: formattedDate });
  };

  const handleBusinessAuth = () => {
    setIsAuthSuccess(true);
  }

  return (
    <>
      <h2 className='text-3xl font-bold mb-2 text-left text-main'>사업자인증을 진행해주세요</h2>

      <div>
        <div className='mb-4'>
          <InputText
            defaultValue={registerObj.businessRegistrationNumber}
            updateType='businessRegistrationNumber'
            containerStyle='mt-4'
            labelTitle='사업자 등록번호'
            updateFormValue={updateFormValue}
            placeholder='사업자 등록번호를 입력해주세요.'
            isRegexInput={true}
            regex={businessNumRegex}
            regexMessage={businessNumRegexMessage}
          />

          <div className='w-full mt-4'>
            <label className='label'>
              <span className={'label-text text-base-content '}>개업일자</span>
              { !registerObj.businessOpenDate && <span className={'label-text text-red-500 '}>{datePickMessage}</span>}
            </label>
            <Datepicker onSelectedDateChanged={handleDateChange} language='ko' labelTodayButton='오늘' labelClearButton='지우기' />
          </div>

          <InputTextWithBtn
            defaultValue={registerObj.businessOwner}
            updateType='businessOwner'
            containerStyle='mt-4'
            labelTitle='대표자 명'
            updateFormValue={updateFormValue}
            placeholder='대표자 명을 입력해주세요.'
            buttonText='인증하기'
            buttonFunc={handleBusinessAuth}
            regex={nameRegex}
            regexMessage={businessOwnerRegexMessage}
            isAuthInput={true}
            clickPossibleWithoutData={false}
            // isAuthSuccess={isAuthSuccess}
          />
        </div>

        <button
          // type='submit'
          onClick={() => submitForm()}
          className={
            `btn mt-2 w-full ${isAllValuePossible ? 'bg-main text-white btn-primary' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}` +
            (loading ? ' loading' : '')
          }
          disabled={!isAllValuePossible}
        >
          다음
        </button>

        <div className='text-center mt-4'>
          이미 계정이 있으신가요?
          <Link to='/customer/login'>
            <span className='  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200 ml-2 text-main'>로그인하기</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterFirstStep;
