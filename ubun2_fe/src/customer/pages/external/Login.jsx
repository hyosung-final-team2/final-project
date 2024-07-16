import { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingIntro from '../../components/Login/LandingIntro';
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
    <div className='min-h-screen bg-base-200 flex items-center'>
      <div className='card mx-auto w-full max-w-5xl  shadow-xl'>
        <div className='grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl'>
          {/* 로그인 페이지 좌측 */}
          <div className=''>
            <LandingIntro />
          </div>
          {/* 로그인 페이지 우측 */}
          <div className='py-24 px-10'>
            <h2 className='text-main text-2xl font-semibold mb-2 text-center tracking-widest	'>로그인</h2>
            <form onSubmit={e => submitForm(e)}>
              <div className='mb-4'>
                <InputText
                  type='text'
                  defaultValue={loginObj.loginId}
                  updateType='loginId'
                  containerStyle='mt-4'
                  labelTitle='아이디'
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type='password'
                  updateType='password'
                  containerStyle='mt-4'
                  labelTitle='비밀번호'
                  updateFormValue={updateFormValue}
                />
              </div>

              <div className='text-right text-primary'>
                <Link to='/customer/forgot-password'>
                  <span className='text-main text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200'>
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <button type='submit' className={'btn mt-2 w-full btn-primary tracking-widest	bg-main text-white' + (loading ? ' loading' : '')}>
                로그인
              </button>

              <div className='text-center mt-4'>
                Don't have an account yet?{' '}
                <Link to='/customer/register'>
                  <span className=' text-main inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200'>Register</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
