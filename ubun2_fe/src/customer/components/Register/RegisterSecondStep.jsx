import InputText from '../common/Input/InputText';
import InputTextWithBtn from '../common/Input/InputTextWithBtn';
import { useState, useEffect } from 'react';

const RegisterSecondStep = ({ setRegisterStep, setRegisterSecondData }) => {
  const INITIAL_REGISTER_OBJ = {
    customerName: '',
    customerEmail: '',
    emailAuthentication: '',
    customerLoginId: '',
    customerPassword: '',
    customerPasswordCheck: '',
  };

  const [isAllValuePossible, setIsAllValuePossible] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [secondRegisterObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);

  useEffect(() => {
    const { customerName, customerEmail, emailAuthentication, customerLoginId, customerPassword, customerPasswordCheck } = secondRegisterObj;

    if (
      customerName.trim() !== '' &&
      customerEmail.trim() !== '' &&
      emailAuthentication.trim() !== '' &&
      customerLoginId.trim() !== '' &&
      customerPassword.trim() !== '' &&
      customerPasswordCheck.trim() !== ''
      // TODO: 값이 차있는지뿐만 아니라 값이 유효한 인증된 값인지 여부도 판단해야함
    ) {
      setIsAllValuePossible(true);
    } else {
      setIsAllValuePossible(false);
    }
  }, [secondRegisterObj]);

  const submitForm = e => {
    e.preventDefault();
    setErrorMessage('');

    if (secondRegisterObj.customerName.trim() === '') return setErrorMessage('이름을 입력해주세요');
    if (secondRegisterObj.customerEmail.trim() === '') return setErrorMessage('이메일을 입력해주세요');
    if (secondRegisterObj.emailAuthentication.trim() === '') return setErrorMessage('인증번호를 입력해주세요');
    if (secondRegisterObj.customerLoginId.trim() === '') return setErrorMessage('아이디를 입력해주세요');
    if (secondRegisterObj.customerPassword.trim() === '') return setErrorMessage('비밀번호를 입력해주세요');
    if (secondRegisterObj.customerPasswordCheck.trim() === '') return setErrorMessage('비밀번호 확인을 입력해주세요');
    else {
      setLoading(true);
      setRegisterSecondData(secondRegisterObj);
      setLoading(false);
      setRegisterStep(3);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setRegisterObj({ ...secondRegisterObj, [updateType]: value });
  };

  const buttonFuncSendEmail = () => {
    setIsSendEmail(true);
  };

  return (
    <>
      <h2 className='text-3xl font-bold mb-2 text-left text-main'>정보를 입력해주세요.</h2>
      <form onSubmit={e => submitForm(e)}>
        <div className='mb-4'>
          <InputText
            defaultValue={secondRegisterObj.customerName}
            updateType='customerName'
            containerStyle='mt-4'
            labelTitle='이름'
            updateFormValue={updateFormValue}
            placeholder='이름을 입력해주세요.'
          />
          <InputTextWithBtn
            defaultValue={secondRegisterObj.customerEmail}
            updateType='customerEmail'
            containerStyle='mt-1'
            labelTitle='이메일'
            updateFormValue={updateFormValue}
            placeholder='이메일을 입력해주세요.'
            buttonText='전송하기'
            buttonFunc={buttonFuncSendEmail}
          />

          {isSendEmail && (
            <InputTextWithBtn
              defaultValue={secondRegisterObj.emailAuthentication}
              updateType='emailAuthentication'
              containerStyle='mt-1'
              labelTitle='인증번호'
              updateFormValue={updateFormValue}
              placeholder='인증번호를 입력해주세요.'
              buttonText='인증하기'
            />
          )}

          <InputText
            defaultValue={secondRegisterObj.customerLoginId}
            updateType='customerLoginId'
            containerStyle='mt-1'
            labelTitle='아이디'
            updateFormValue={updateFormValue}
            placeholder='아이디를 입력해주세요.'
          />
          <div className='w-full flex'>
            <InputText
              defaultValue={secondRegisterObj.customerPassword}
              type='password'
              updateType='customerPassword'
              containerStyle='mt-1 w-48/100'
              labelTitle='비밀번호'
              updateFormValue={updateFormValue}
              placeholder='비밀번호'
            />
            <div className='w-4/100'></div>
            <InputText
              defaultValue={secondRegisterObj.customerPasswordCheck}
              type='password'
              updateType='customerPasswordCheck'
              containerStyle='mt-1 w-48/100'
              labelTitle='비밀번호 확인'
              updateFormValue={updateFormValue}
              placeholder='비밀번호 확인'
            />
          </div>
        </div>

        {/* <ErrorText styleClass='mt-8'>{errorMessage}</ErrorText> */}
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
