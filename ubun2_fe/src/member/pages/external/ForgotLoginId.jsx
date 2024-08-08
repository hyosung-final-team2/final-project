import {useEffect, useState} from "react";
import {useAuthEmail, useSendEmail} from "../../../customer/api/Register/queris.js";
import {
    authNumRegex, authNumRegexMessage,
    emailRegex, emailRegexMessage,
    nameRegex,
    nameRegexMessage
} from "../../../customer/components/common/Regex/registerRegex.js";
import InputText from "../../../customer/components/common/Input/InputText.jsx";
import InputTextWithBtn from "../../../customer/components/common/Input/InputTextWithBtn.jsx";
import {useFindLoginId} from "../../api/FindInfo/queris.js";
import SlideUpModal from "../../components/common/SlideUpModal.jsx";
import DoubleBottomButton from "../../components/common/button/DoubleBottomButton.jsx";
import {useNavigate} from "react-router-dom";

const ForgotLoginId = () => {
    const INITIAL_FIND_ID_OBJ = {
        memberName: '',
        memberEmail: '',
        emailAuthentication: '',
    };

    const [isSendEmail, setIsSendEmail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [timerValue, setTimerValue] = useState(300);
    const [isAuthSuccess, setIsAuthSuccess] = useState(null);

    const [isAllValuePossible, setIsAllValuePossible] = useState(false);
    const [loginIdObj, setRegisterObj] = useState(INITIAL_FIND_ID_OBJ);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [findId, setFindId] = useState(null);
    const navigate = useNavigate();


    const {mutate:sendEmailMutate} = useSendEmail(loginIdObj.memberEmail,"ROLE_MEMBER","NO")
    const {mutate:authEmailMutate} = useAuthEmail();


    const [isKeyboardOn, setIsKeyboardOn] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsKeyboardOn(prev => !prev);
        };

        // handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const { memberName, memberEmail, emailAuthentication } = loginIdObj;

        if (
            memberName.trim() !== '' &&
            memberEmail.trim() !== '' &&
            emailAuthentication.trim() !== '' &&
            emailRegex.test(memberEmail.trim()) &&
            authNumRegex.test(emailAuthentication.trim()) &&
            isAuthSuccess
        ) {
            setIsAllValuePossible(true);
        } else {
            setIsAllValuePossible(false);
        }
    }, [loginIdObj,isAuthSuccess]);

    const {mutate: findIdMutate } = useFindLoginId()

    const submitForm = () => {
        setErrorMessage('');

        if (loginIdObj.memberName.trim() === '') return setErrorMessage('이름을 입력해주세요');
        if (loginIdObj.memberEmail.trim() === '') return setErrorMessage('이메일을 입력해주세요');
        if (loginIdObj.emailAuthentication.trim() === '') return setErrorMessage('인증번호를 입력해주세요');

        findIdMutate({userName:loginIdObj.memberName, userEmail:loginIdObj.memberEmail, role:"ROLE_MEMBER"},{
            onSuccess: (res) => {
                setFindId(res.data.data.loginId)
                setIsModalOpen(true)
            }
        })
    };

    const buttonContainerClass = isKeyboardOn
        ? "fixed bottom-0 left-0 w-full"
        : "absolute bottom-6 left-6 right-6";

    const clickBtnStyle = isAllValuePossible
        ? "bg-main text-white font-bold h-14"
        : "bg-second text-main font-bold h-14"

    const buttonClass = isKeyboardOn
        ? `${clickBtnStyle} w-full rounded-none`
        : `${clickBtnStyle} w-full rounded-2xl`;

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setRegisterObj({ ...loginIdObj, [updateType]: value });
    };

    const [isEmailCheckPass, setIsEmailCheckPass] = useState(null);
    const [duplicateEmailMessage, setDuplicateEmailMessage] = useState(null);

    const buttonFuncSendEmail = () => {
        sendEmailMutate({},
            {
                onSuccess: () => {
                    setIsSendEmail(true);
                    setTimerValue(300);
                    setIsEmailCheckPass(true)
                    setDuplicateEmailMessage(null)
                },
                onError: (err) => {
                    setIsEmailCheckPass(false)
                    setDuplicateEmailMessage(err.response.data.errorMessage)
                }
            });
    };


    const buttonFuncAuthEmail = () => {
        authEmailMutate({
            email: loginIdObj.memberEmail,
            authenticationNumber: loginIdObj.emailAuthentication
        }, {
            onSuccess: (res) => {
                if (res.data.data) {
                    setIsAuthSuccess(true)
                } else {
                    setIsAuthSuccess(false)
                }
            },
        });
    };

    const firstButtonFunc = () => {
        navigate("/member/login");
    }

    const secondButtonFunc = () => {
        navigate("/member/forgot-password");
    }

    const maskString = (input) => {
        if (input === null) return
        const length = input.length;
        const halfLength = Math.floor(length / 2);

        const visiblePart = input.slice(0, halfLength);
        const maskedPart = '*'.repeat(length - halfLength);

        return `${visiblePart}${maskedPart}`;
    }

    const forgotPasswordFunc = () => {
        navigate("/member/forgot-password");
    };


    const modalButtonStyle = 'bg-main text-white';

    return (
        <>
        <div className='relative max-w-[480px] mx-auto min-h-screen p-6 pb-20'>
            <div className="mb-6">
                <h1 className="text-indigo-900 text-2xl font-bold mb-6">아이디 찾기</h1>
                <InputText defaultValue={loginIdObj.memberName}
                           updateType='memberName'
                           containerStyle='mt-4'
                           labelTitle='이름'
                           updateFormValue={updateFormValue}
                           placeholder='이름을 입력해주세요.'
                           isRegexInput={true}
                           regex={nameRegex}
                           regexMessage={nameRegexMessage}
                />
                <InputTextWithBtn defaultValue={loginIdObj.memberEmail}
                                  updateType='memberEmail'
                                  containerStyle='mt-1'
                                  labelTitle='이메일'
                                  updateFormValue={updateFormValue}
                                  placeholder='이메일을 입력해주세요.'
                                  buttonText={!isSendEmail ? '전송하기' : '재전송하기'}
                                  clickPossibleWithoutData={false}
                                  buttonFunc={buttonFuncSendEmail}
                                  regex={emailRegex}
                                  regexMessage={emailRegexMessage}
                                  isAuthInput={true}
                                  isAuthSuccess={isEmailCheckPass}
                                  isDuplicateInput={true}
                                  duplicateMessage={duplicateEmailMessage}
                />
                {!isSendEmail ? <p onClick={() => forgotPasswordFunc()} className='mt-2 text-gray-400 underline text-end'>비밀번호를 잊어버렸어요</p> : null}
                {isSendEmail && (
                    <InputTextWithBtn
                        defaultValue={loginIdObj.emailAuthentication}
                        updateType='emailAuthentication'
                        containerStyle='mt-1'
                        labelTitle='인증번호'
                        updateFormValue={updateFormValue}
                        placeholder='인증번호를 입력해주세요.'
                        buttonText='인증하기'
                        buttonFunc={buttonFuncAuthEmail}
                        regex={authNumRegex}
                        regexMessage={authNumRegexMessage}
                        showTimer={true}
                        timerValue={timerValue}
                        isAuthInput={true}
                        isAuthSuccess={isAuthSuccess}
                    />
                )}
            </div>

            <div className={buttonContainerClass}>
                <button onClick={() => submitForm()} className={ buttonClass } >다음</button>
            </div>
        </div>

        {/* 아이디 찾기 성공 모달   */}
        <SlideUpModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} buttonText="확인" buttonStyle={modalButtonStyle} isButton={false}>
            <div className='flex flex-col items-center gap-2'>
                <svg width='100px' height='100px' viewBox='0 0 24 24' fill='none'
                     xmlns='http://www.w3.org/2000/svg'>
                    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                    <g id='SVGRepo_iconCarrier'>
                        <path
                            opacity='0.5'
                            d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
                            fill='#928AFF'
                        ></path>
                        <path
                            d='M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z'
                            fill='#928AFF'
                        ></path>
                    </g>
                </svg>
                <h1 className='text-2xl text-bold'>{loginIdObj.memberName}님의 아이디는 </h1>
                <h1 className='text-2xl text-bold'><span className='text-2xl text-bold text-main'>{maskString(findId)}</span> 입니다.</h1>
            </div>
            <DoubleBottomButton buttonStyle={modalButtonStyle} firstButtonText="로그인하기" secondButtonText="비밀번호 찾기" firstButtonFunc={firstButtonFunc} secondButtonFunc={secondButtonFunc}/>
        </SlideUpModal>
        </>
    );
}

export default ForgotLoginId