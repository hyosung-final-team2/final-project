import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthEmail, useSendEmail} from "../../../customer/api/Register/queris.js";
import {
    authNumRegex, authNumRegexMessage,
    emailRegex, emailRegexMessage,
    loginIdRegex, loginIdRegexMessage,
    nameRegex, nameRegexMessage
} from "../../../customer/components/common/Regex/registerRegex.js";
import { useFindPassword} from "../../api/FindInfo/queris.js";
import InputText from "../../../customer/components/common/Input/InputText.jsx";
import InputTextWithBtn from "../../../customer/components/common/Input/InputTextWithBtn.jsx";

const ForgotPassword = () => {

    const INITIAL_FIND_PW_OBJ = {
        memberName: '',
        memberLoginId:'',
        memberEmail: '',
        emailAuthentication: '',
    };

    const [isSendEmail, setIsSendEmail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [timerValue, setTimerValue] = useState(300);
    const [isAuthSuccess, setIsAuthSuccess] = useState(null);

    const [isAllValuePossible, setIsAllValuePossible] = useState(false);
    const [passwordObj, setRegisterObj] = useState(INITIAL_FIND_PW_OBJ);

    const navigate = useNavigate();


    const {mutate:sendEmailMutate} = useSendEmail(passwordObj.memberEmail,"ROLE_MEMBER","NO");
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
        const { memberName,memberLoginId, memberEmail, emailAuthentication } = passwordObj;

        if (
            memberName.trim() !== '' &&
            memberEmail.trim() !== '' &&
            memberLoginId.trim() !== '' &&
            emailAuthentication.trim() !== '' &&
            loginIdRegex.test(memberLoginId.trim()) &&
            emailRegex.test(memberEmail.trim()) &&
            authNumRegex.test(emailAuthentication.trim()) &&
            isAuthSuccess
        ) {
            setIsAllValuePossible(true);
        } else {
            setIsAllValuePossible(false);
        }
    }, [passwordObj,isAuthSuccess]);

    const {mutate: findPwMutate } = useFindPassword()

    const submitForm = () => {
        setErrorMessage('');

        if (passwordObj.memberName.trim() === '') return setErrorMessage('이름을 입력해주세요');
        if (passwordObj.memberEmail.trim() === '') return setErrorMessage('이메일을 입력해주세요');
        if (passwordObj.emailAuthentication.trim() === '') return setErrorMessage('인증번호를 입력해주세요');

        findPwMutate({userName:passwordObj.memberName, userLoginId:passwordObj.memberLoginId ,userEmail:passwordObj.memberEmail, role:"ROLE_MEMBER"},{
            onSuccess: (res) => {
                console.log(res)
                navigate('/member/reset-password',{ state : { memberEmail:passwordObj.memberEmail }})
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
        setRegisterObj({ ...passwordObj, [updateType]: value });
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
                    console.log(err)
                    setIsEmailCheckPass(false)
                    setDuplicateEmailMessage(err.response.data.errorMessage)
                }
            });
    };

    const buttonFuncAuthEmail = () => {
        authEmailMutate({
            email: passwordObj.memberEmail,
            authenticationNumber: passwordObj.emailAuthentication
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

    const forgotLoginIdFunc = () => {
        navigate("/member/forgot-loginid");
    };

    return (
        <div className='relative max-w-[480px] mx-auto min-h-screen p-6 pb-20'>
            <div className="mb-6">
                <h1 className="text-indigo-900 text-2xl font-bold mb-6">비밀번호 찾기</h1>
                <InputText defaultValue={passwordObj.memberName}
                           updateType='memberName'
                           containerStyle='mt-4'
                           labelTitle='이름'
                           updateFormValue={updateFormValue}
                           placeholder='이름을 입력해주세요.'
                           isRegexInput={true}
                           regex={nameRegex}
                           regexMessage={nameRegexMessage}
                />
                <InputText defaultValue={passwordObj.memberLoginId}
                           updateType='memberLoginId'
                           containerStyle='mt-4'
                           labelTitle='아이디'
                           updateFormValue={updateFormValue}
                           placeholder='아이디를 입력해주세요.'
                           isRegexInput={true}
                           regex={loginIdRegex}
                           regexMessage={loginIdRegexMessage}
                />
                <InputTextWithBtn defaultValue={passwordObj.memberEmail}
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
                {!isSendEmail ? <p onClick={() => forgotLoginIdFunc()} className='mt-2 text-gray-400 underline text-end'>아이디를
                    잊어버렸어요</p> : null}
                {isSendEmail && (
                    <InputTextWithBtn
                        defaultValue={passwordObj.emailAuthentication}
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
                <button onClick={() => submitForm()} className={buttonClass}>다음</button>
            </div>
        </div>
    );
}

export default ForgotPassword;
