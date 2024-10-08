import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputText from '../../components/common/Input/InputText';
import { useLogin } from '../../api/common/Login/queris.js';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const INITIAL_LOGIN_OBJ = {
    password: '',
    loginId: '',
  };

  const role = useLocation().pathname === '/customer/login' ? 'ROLE_CUSTOMER' : 'ROLE_MEMBER';
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const { mutate: loginMutate, isError } = useLogin(loginObj, role);

  const submitForm = e => {
    e.preventDefault();
    setErrorMessage('');

    if (loginObj.loginId.trim() === '') return setErrorMessage('Email Id is required! (use any value)');
    if (loginObj.password.trim() === '') return setErrorMessage('Password is required! (use any value)');
    else {
      loginMutate({},{
        onSuccess: () => {
          navigate('/customer/app/dashboard');
        },
        onError: () => console.log("로그인 실패")
      });
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (

          <div className='py-24 px-10'>
            <div className="w-full flex justify-center items-center gap-1">
              <img src='/fms_logo.png' alt='logo' className='w-14'/>
              <img src='/text_logo.png' alt='Logo' className="w-1/2"/>
            </div>
            <form onSubmit={e => submitForm(e)}>
              <div className='mb-4'>
                <InputText
                  type='text'
                  defaultValue={loginObj.loginId}
                  updateType='loginId'
                  containerStyle='mt-4'
                  labelTitle='아이디'
                  updateFormValue={updateFormValue}
                  isError={isError}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type='password'
                  updateType='password'
                  containerStyle='mt-4'
                  labelTitle='비밀번호'
                  updateFormValue={updateFormValue}
                  isError={isError}
                />
              </div>

              <div className='text-right text-primary'>
                <Link to='/customer/forgot-loginid'>
                  <span className='text-main text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200'>
                    계정 정보를 잊어버렸어요.
                  </span>
                </Link>
              </div>

              <button type='submit' className={'btn mt-2 w-full btn-primary tracking-widest	bg-main text-white' + (loading ? ' loading' : '')}>
                로그인
              </button>

              <div className='text-center mt-4'>
                아직 계정이 없으신가요?
                <Link to='/customer/register'>
                  <span className=' text-main inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200 ml-2'> 회원가입</span>
                </Link>
              </div>
            </form>
          </div>

  );
};

export default Login;
