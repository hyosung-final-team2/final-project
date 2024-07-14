import InputText from '../common/Input/InputText';
import InputTextWithBtn from '../common/Input/InputTextWithBtn';
import { useState, useEffect } from 'react';
import {emailRegex, loginIdRegex, passwordRegex ,authNumRegex} from "../common/Regex/registerRegex.js";
import {useAuthEmail, useSendEmail} from "../../api/Register/queris.js";

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
  const [secondRegisterObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ)
  const [timerValue, setTimerValue] = useState(300);
  const [isAuthSuccess, setIsAuthSuccess] = useState(null);

  const {mutate:sendEmailMutate} = useSendEmail(secondRegisterObj.customerEmail)
  const {mutate:authEmailMutate} = useAuthEmail();

  useEffect(() => {
    setIsSendEmail(false);
    setIsAuthSuccess(null);
    setTimerValue(300);
  }, []);

  useEffect(() => {
    const { customerName, customerEmail, emailAuthentication, customerLoginId, customerPassword, customerPasswordCheck } = secondRegisterObj;

    if (
        customerName.trim() !== '' &&
        customerEmail.trim() !== '' &&
        emailAuthentication.trim() !== '' &&
        emailRegex.test(customerEmail.trim()) &&
        authNumRegex.test(emailAuthentication.trim()) &&
        loginIdRegex.test(customerLoginId.trim()) &&
        passwordRegex.test(customerPassword.trim()) &&
        customerPassword === customerPasswordCheck &&
        isAuthSuccess
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

  const buttonFuncSendEmail = (e) => {
    e.preventDefault();
    sendEmailMutate()
    setIsSendEmail(true);
    setTimerValue(300);
  };

  const buttonFuncAuthEmail = (e) => {
    e.preventDefault();
    authEmailMutate({
      email: secondRegisterObj.customerEmail,
      authenticationNumber: secondRegisterObj.emailAuthentication
    }, {
      onSuccess: () => {
        setIsAuthSuccess(true)
      },
      onError: () => {
        setIsAuthSuccess(false)
      }
    });
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
            clickPossibleWithoutData={false}
            buttonFunc={buttonFuncSendEmail}
            regex={emailRegex}
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
              buttonFunc={buttonFuncAuthEmail}
              regex={authNumRegex}
              showTimer ={true}
              timerValue={timerValue}
              isAuthSuccess={isAuthSuccess}
            />
          )}

          <InputText
            defaultValue={secondRegisterObj.customerLoginId}
            updateType='customerLoginId'
            containerStyle='mt-1'
            labelTitle='아이디'
            updateFormValue={updateFormValue}
            placeholder='아이디를 입력해주세요.'
            regex={loginIdRegex}
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
              password={passwordRegex}
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
              password={passwordRegex}
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
