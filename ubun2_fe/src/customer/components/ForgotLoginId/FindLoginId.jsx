import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthEmail, useSendEmail} from "../../api/Register/queris.js";
import {authNumRegex, emailRegex} from "../common/Regex/registerRegex.js";
import {useFindLoginId} from "../../../member/api/FindInfo/queris.js";
import InputText from "../common/Input/InputText.jsx";
import InputTextWithBtn from "../common/Input/InputTextWithBtn.jsx";
import useCustomerStore from "../../store/customerStore.js";


const FindLoginId = ({ setIsSuccess, setFindId }) => {

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
    const navigate = useNavigate();


    const {mutate:sendEmailMutate} = useSendEmail(loginIdObj.memberEmail)
    const {mutate:authEmailMutate} = useAuthEmail();


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


    const {setCustomerName} = useCustomerStore()
    const submitForm = () => {
        setErrorMessage('');

        if (loginIdObj.memberName.trim() === '') return setErrorMessage('이름을 입력해주세요');
        if (loginIdObj.memberEmail.trim() === '') return setErrorMessage('이메일을 입력해주세요');
        if (loginIdObj.emailAuthentication.trim() === '') return setErrorMessage('인증번호를 입력해주세요');

        findIdMutate({userName:loginIdObj.memberName, userEmail:loginIdObj.memberEmail, role:"ROLE_CUSTOMER"},{
            onSuccess: (res) => {
                setCustomerName(loginIdObj.memberName)
                setFindId(res.data.data.loginId)
                setIsSuccess(true)
            }
        })
    };


    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setRegisterObj({ ...loginIdObj, [updateType]: value });
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

    const forgotPasswordFunc = () => {
        navigate("/customer/forgot-password");
    };


    return (
        <>
                <div className="mb-6">
                    <h1 className="text-indigo-900 text-2xl font-bold mb-6">아이디 찾기</h1>
                    <InputText defaultValue={loginIdObj.memberName}
                               updateType='memberName'
                               containerStyle='mt-4'
                               labelTitle='이름'
                               updateFormValue={updateFormValue}
                               placeholder='이름을 입력해주세요.'/>
                    <InputTextWithBtn defaultValue={loginIdObj.memberEmail}
                                      updateType='memberEmail'
                                      containerStyle='mt-1'
                                      labelTitle='이메일'
                                      updateFormValue={updateFormValue}
                                      placeholder='이메일을 입력해주세요.'
                                      buttonText={!isSendEmail ? '전송하기' : '재전송하기'}
                                      clickPossibleWithoutData={false}
                                      buttonFunc={buttonFuncSendEmail}
                                      regex={emailRegex}/>
                    {!isSendEmail ?
                        <p onClick={() => forgotPasswordFunc()} className='mt-2 text-gray-400 underline text-end'>비밀번호를
                            잊어버렸어요</p> : null}
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
                            showTimer={true}
                            timerValue={timerValue}
                            isAuthSuccess={isAuthSuccess}
                        />
                    )}
                </div>

                <button type='submit' onClick={() => submitForm()} className={`btn mt-2 w-full tracking-widest ${isAllValuePossible ? 'bg-main text-white btn-primary' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}>
                    다음
                </button>

        </>
    )
}

export default FindLoginId