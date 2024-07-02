import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InputText from '../common/Input/InputText';
import InputTextWithBtn from '../common/Input/InputTextWithBtn';
import { Datepicker } from 'flowbite-react';

function RegisterFirstStep({ setRegisterStep, setRegisterFirstData }) {
  const INITIAL_REGISTER_OBJ = {
    businessRegistrationNumber: '',
    businessOpenDate: '',
    businessAddressOwner: '',
  };

  const [isAllValuePossible, setIsAllValuePossible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);

  useEffect(() => {
    const { businessRegistrationNumber, businessOpenDate, businessAddressOwner } = registerObj;
    console.log(registerObj);
    console.log(isAllValuePossible);
    if (
      businessRegistrationNumber.trim() !== '' &&
      businessOpenDate.trim() !== '' &&
      businessAddressOwner.trim() !== ''
      // TODO: 값이 차있는지뿐만 아니라 값이 유효한 인증된 값인지 여부도 판단해야함
    ) {
      setIsAllValuePossible(true);
    } else {
      setIsAllValuePossible(false);
    }
  }, [registerObj]);

  const submitForm = e => {
    e.preventDefault();
    setErrorMessage('');

    if (registerObj.businessRegistrationNumber.trim() === '') return setErrorMessage('사업자 등록 번호를 인증해주세요');
    if (registerObj.businessOpenDate.trim() === '') return setErrorMessage('사업장 주소를 입력해주세요');
    if (registerObj.businessAddressOwner.trim() === '') return setErrorMessage('대표자 명을 입력해주세요');
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

  return (
    <>
      <h2 className='text-3xl font-bold mb-2 text-left text-main'>사업자인증을 진행해주세요</h2>
      <form onSubmit={e => submitForm(e)}>
        <div className='mb-4'>
          <InputText
            defaultValue={registerObj.businessRegistrationNumber}
            updateType='businessRegistrationNumber'
            containerStyle='mt-4'
            labelTitle='사업자 등록번호'
            updateFormValue={updateFormValue}
            placeholder='사업자 등록번호를 입력해주세요.'
          />

          <div className='w-full mt-4'>
            <label className='label'>
              <span className={'label-text text-base-content '}>개업일자</span>
            </label>
            <Datepicker onSelectedDateChanged={handleDateChange} language='ko' labelTodayButton='오늘' labelClearButton='지우기' />
          </div>

          <InputTextWithBtn
            defaultValue={registerObj.businessAddressOwner}
            updateType='businessAddressOwner'
            containerStyle='mt-4'
            labelTitle='대표자 명'
            updateFormValue={updateFormValue}
            placeholder='대표자 명을 입력해주세요.'
            buttonText='인증하기'
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

        <div className='text-center mt-4'>
          Already have an account?{' '}
          <Link to='/customer/login'>
            <span className='  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200'>Login</span>
          </Link>
        </div>
      </form>
    </>
  );
}

export default RegisterFirstStep;
