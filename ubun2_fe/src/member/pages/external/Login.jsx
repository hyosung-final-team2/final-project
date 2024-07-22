import InputText from '../../../customer/components/common/Input/InputText.jsx';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '../../../customer/api/common/Login/queris.js';
import CustomButton from '../../components/common/button/CustomButton.jsx';
import InstallPrompt from '../../components/Installprompt/InstallPrompt.jsx';
import useOrderItemsStore from '../../store/order/orderItemStore.js';
import useMemberStore from "../../store/memberStore.js";

const Login = () => {
  const INITIAL_LOGIN_OBJ = {
    password: '',
    loginId: '',
  };

  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const [errorMessage, setErrorMessage] = useState('');
  const role = useLocation().pathname === '/customer/login' ? 'ROLE_CUSTOMER' : 'ROLE_MEMBER';
  const navigate = useNavigate();
  const { clearCart } = useOrderItemsStore();
  const {setMemberId} = useMemberStore()

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  const { mutate: loginMutate, isError } = useLogin(loginObj, role);

  const submitForm = () => {
    setErrorMessage('');

    if (loginObj.loginId.trim() === '') return setErrorMessage('Email Id is required! (use any value)');
    if (loginObj.password.trim() === '') return setErrorMessage('Password is required! (use any value)');
    else {
      loginMutate(
        {},
        {
          onSuccess: () => {
            clearCart();
            navigate('/member/app/home');
          },
          onError: () => console.log('로그인 실패'),
        }
      );
    }
  };

  const signupButtonFunc = () => {
    navigate('/member/register');
  };

  const fotgotInfoFunc = () => {
    navigate('/member/forgot-loginid');
  };

  const buttonStyle = 'bg-main text-white mt-4';
  const secondButtonStyle = 'bg-second text-main mt-2';

  return (
    <div className='p-4 mobile_container'>
      <h1 className='text-3xl font-bold text-center text-main'>로그인</h1>
      <InputText
        defaultValue={loginObj.loginId}
        updateType='loginId'
        containerStyle='mt-4'
        updateFormValue={updateFormValue}
        placeholder='아이디'
        isError={isError}
      />
      <InputText
        defaultValue={loginObj.password}
        updateType='password'
        type='password'
        containerStyle='mt-4'
        updateFormValue={updateFormValue}
        placeholder='비밀번호'
        isError={isError}
      />

      <CustomButton buttonStyle={buttonStyle} buttonText='로그인' buttonFunc={submitForm} />
      <CustomButton buttonStyle={secondButtonStyle} buttonText='회원가입' buttonFunc={signupButtonFunc} />
      <p onClick={() => fotgotInfoFunc()} className='mt-2 text-gray-400 underline text-end'>
        계정 정보를 잊어버렸어요
      </p>

      <InstallPrompt />
    </div>
  );
};

export default Login;
