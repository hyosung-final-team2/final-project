import InputText from "../../../customer/components/common/Input/InputText.jsx";
import {
    loginIdRegex,
    loginIdRegexMessage, passwordCheckRegexMessage,
    passwordRegex, passwordRegexMessage,
    phoneRegex, phoneRegexMessage
} from "../../../customer/components/common/Regex/registerRegex.js";
import {useEffect, useState} from "react";
import SlideUpModal from "../common/SlideUpModal.jsx";
import {useMemberSignup} from "../../api/Register/queris.js";
import {useNavigate} from "react-router-dom";
import InputTextWithBtn from "../../../customer/components/common/Input/InputTextWithBtn.jsx";
import {useCheckDuplicateId} from "../../../customer/api/Register/queris.js";

const RegisterSecondStep = () => {
    const SECOND_REGISTER_OBJ = {
        memberLoginId: '',
        memberPassword: '',
        memberPasswordCheck:'',
        memberPhone: '',
    };

    const navigate = useNavigate();
    const [isAllValuePossible, setIsAllValuePossible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [secondRegisterObj, setRegisterObj] = useState(SECOND_REGISTER_OBJ);

    const [isModalOpen, setIsModalOpen] = useState(false);

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
        const { memberLoginId, memberPassword,memberPasswordCheck ,memberPhone } = secondRegisterObj;

        if (
            memberLoginId.trim() !== '' &&
            memberPassword.trim() !== '' &&
            memberPasswordCheck.trim() !== '' &&
            memberPhone.trim() !== '' &&
            loginIdRegex.test(memberLoginId.trim()) &&
            passwordRegex.test(memberPassword.trim()) &&
            phoneRegex.test(memberPhone.trim()) &&
            memberPassword === memberPasswordCheck
        ) {
            setIsAllValuePossible(true);
        } else {
            setIsAllValuePossible(false);
        }
    }, [secondRegisterObj]);

    const {mutate: memberSignupMutate} = useMemberSignup(secondRegisterObj.memberLoginId,secondRegisterObj.memberPassword,secondRegisterObj.memberPhone);

    const submitForm = () => {
        setErrorMessage('');

        if (secondRegisterObj.memberLoginId.trim() === '') return setErrorMessage('이름을 입력해주세요');
        if (secondRegisterObj.memberPassword.trim() === '') return setErrorMessage('이메일을 입력해주세요');
        if (secondRegisterObj.memberPasswordCheck.trim() === '') return setErrorMessage('이메일을 입력해주세요');
        if (secondRegisterObj.memberPhone.trim() === '') return setErrorMessage('인증번호를 입력해주세요');

        else {
            memberSignupMutate({}, {
                onSuccess: () => setIsModalOpen(true)
            })
        }
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

    const modalButtonStyle = 'bg-main text-white';

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setRegisterObj({ ...secondRegisterObj, [updateType]: value });
    };

    const buttonFunc = () => {
        setIsModalOpen(false)
        navigate("/member/login")
    }

    const {mutate:checkDuplicateIdMutate} = useCheckDuplicateId()

    const [isCheckPass, setIsCheckPass] = useState(null);
    const [duplicateMessage, setDuplicateMessage] = useState(null);

    const buttonFuncCheckDuplicateId = () => {
        checkDuplicateIdMutate({
            loginId: secondRegisterObj.memberLoginId,
            userType:'ROLE_MEMBER'
        },{
            onSuccess: () => {
                setIsCheckPass(true)
                setDuplicateMessage(null);
            },
            onError: (err) => {
                setIsCheckPass(false)
                setDuplicateMessage(err.response.data.errorMessage)
            }
        })
    }

    return (
        <>
            <div className='relative max-w-[480px] mx-auto min-h-screen p-6 pb-20'>
                <div className="mb-6">
                    <h1 className="text-indigo-900 text-2xl font-bold mb-6">인증을 진행해주세요.</h1>
                    <InputTextWithBtn
                        defaultValue={secondRegisterObj.memberLoginId}
                        updateType='memberLoginId'
                        containerStyle='mt-1'
                        labelTitle='아이디'
                        updateFormValue={updateFormValue}
                        placeholder='아이디를 입력해주세요.'
                        buttonText="중복 확인"
                        clickPossibleWithoutData={false}
                        buttonFunc={buttonFuncCheckDuplicateId}
                        regex={loginIdRegex}
                        regexMessage={loginIdRegexMessage}
                        isAuthInput={true}
                        isAuthSuccess={isCheckPass}
                        isDuplicateInput={true}
                        duplicateMessage={duplicateMessage}
                    />

                    <InputText defaultValue={secondRegisterObj.memberPassword}
                               updateType='memberPassword'
                               type="password"
                               containerStyle='mt-4'
                               labelTitle='비밀번호'
                               updateFormValue={updateFormValue}
                               placeholder='알파벳, 숫자, 특수문자를 포함한 8자리 이상'
                               isRegexInput={true}
                               regex={passwordRegex}
                               regexMessage={passwordRegexMessage}
                    />
                    <InputText defaultValue={secondRegisterObj.memberPasswordCheck}
                               type="password"
                               updateType='memberPasswordCheck'
                               containerStyle='mt-4'
                               labelTitle='비밀번호 확인'
                               updateFormValue={updateFormValue}
                               placeholder='비밀번호를 다시 입력해주세요'
                               isRegexInput={true}
                               regex={passwordRegex}
                               regexMessage={passwordCheckRegexMessage}
                    />
                    <InputText defaultValue={secondRegisterObj.memberPhone}
                               updateType='memberPhone'
                               containerStyle='mt-4'
                               labelTitle='전화번호'
                               updateFormValue={updateFormValue}
                               placeholder='전화번호를 입력해주세요.'
                               isRegexInput={true}
                               regex={phoneRegex}
                               regexMessage={phoneRegexMessage}
                    />

                </div>

                <div className={buttonContainerClass}>
                    <button onClick={() => submitForm()} className={buttonClass}>다음</button>
                </div>
            </div>

            {/* 회원 가입 완료 모달*/}
            <SlideUpModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} buttonText="확인" buttonStyle={modalButtonStyle} buttonFunc={buttonFunc}>
                <div className='flex flex-col items-center gap-2'>
                    <svg width='100px' height='100px' viewBox='0 0 24 24' fill='none'
                         xmlns='http://www.w3.org/2000/svg'>
                        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                        <g id='SVGRepo_iconCarrier'>
                            {' '}
                            <path
                                opacity='0.5'
                                d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
                                fill='#928AFF'
                            ></path>
                            {' '}
                            <path
                                d='M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z'
                                fill='#928AFF'
                            ></path>
                            {' '}
                        </g>
                    </svg>
                    <h1 className='text-2xl text-bold'>회원가입 완료</h1>
                    <p className='text-lg text-gray-500'>로그인 이후 서비스를 이용할 수 있어요</p>
                </div>
            </SlideUpModal>
        </>
    )
}
export default RegisterSecondStep