import { useEffect, useState } from "react";
import InputText from "../../../customer/components/common/Input/InputText.jsx";
import InputTextWithBtn from "../../../customer/components/common/Input/InputTextWithBtn.jsx";
import {
    emailRegex,
    authNumRegex, nameRegex, nameRegexMessage, emailRegexMessage, authNumRegexMessage,
} from "../../../customer/components/common/Regex/registerRegex.js";
import {useAuthEmail, useSendEmail} from "../../../customer/api/Register/queris.js";

const RegisterFirstStep = ({setRegisterStep, setMemberName, setMemberEmail}) => {
    const INITIAL_REGISTER_OBJ = {
        memberName: '',
        memberEmail: '',
        emailAuthentication: '',
    };

    const [isSendEmail, setIsSendEmail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [timerValue, setTimerValue] = useState(300);
    const [isAuthSuccess, setIsAuthSuccess] = useState(null);

    const [isAllValuePossible, setIsAllValuePossible] = useState(false);
    const [firstRegisterObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);


    const {mutate:sendEmailMutate} = useSendEmail(firstRegisterObj.memberEmail)
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
        const { memberName, memberEmail, emailAuthentication } = firstRegisterObj;

        if (
            memberName.trim() !== '' &&
            memberEmail.trim() !== '' &&
            emailAuthentication.trim() !== '' &&
            nameRegex.test(memberEmail.trim()) &&
            emailRegex.test(memberEmail.trim()) &&
            authNumRegex.test(emailAuthentication.trim()) &&
            isAuthSuccess
        ) {
            setIsAllValuePossible(true);
        } else {
            setIsAllValuePossible(false);
        }
    }, [firstRegisterObj,isAuthSuccess]);

    const submitForm = () => {
        setErrorMessage('');

        if (firstRegisterObj.memberName.trim() === '') return setErrorMessage('이름을 입력해주세요');
        if (firstRegisterObj.memberEmail.trim() === '') return setErrorMessage('이메일을 입력해주세요');
        if (firstRegisterObj.emailAuthentication.trim() === '') return setErrorMessage('인증번호를 입력해주세요');

        else {
            setMemberName(firstRegisterObj.memberName);
            setMemberEmail(firstRegisterObj.memberEmail);
            setRegisterStep(2);
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

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setRegisterObj({ ...firstRegisterObj, [updateType]: value });
    };

    const buttonFuncSendEmail = () => {
        sendEmailMutate({},{
            onSuccess: setIsSendEmail(true),
        })
        setIsSendEmail(true);
        setTimerValue(300);
    };

    const buttonFuncAuthEmail = () => {
        authEmailMutate({
            email: firstRegisterObj.memberEmail,
            authenticationNumber: firstRegisterObj.emailAuthentication
        }, {
            onSuccess: (res) => {
                if (res.data) {
                    setIsAuthSuccess(true)
                }  else {
                    setIsAuthSuccess(false)
                }
            },
            onError: () => {
                setIsAuthSuccess(false)
            }
        });
    };


    return (
        <div className='relative max-w-[480px] mx-auto min-h-screen p-6 pb-20'>
            <div className="mb-6">
                <h1 className="text-indigo-900 text-2xl font-bold mb-6">인증을 진행해주세요.</h1>
                <InputText defaultValue={firstRegisterObj.memberName}
                           updateType='memberName'
                           containerStyle='mt-4'
                           labelTitle='이름'
                           updateFormValue={updateFormValue}
                           placeholder='이름을 입력해주세요.'
                           isRegexInput={true}
                           regex={nameRegex}
                           regexMessage={nameRegexMessage}
                />
                <InputTextWithBtn defaultValue={firstRegisterObj.memberEmail}
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
                />
                {isSendEmail && (
                    <InputTextWithBtn
                        defaultValue={firstRegisterObj.emailAuthentication}
                        updateType='emailAuthentication'
                        containerStyle='mt-1'
                        labelTitle='인증번호'
                        updateFormValue={updateFormValue}
                        placeholder='인증번호를 입력해주세요.'
                        buttonText='인증하기'
                        buttonFunc={buttonFuncAuthEmail}
                        regex={authNumRegex}
                        regexMessage={authNumRegexMessage}
                        showTimer ={true}
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
    );
}

export default RegisterFirstStep;