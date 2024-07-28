import InputText from "../common/Input/InputText.jsx";
import {useEffect, useState} from "react";
import {passwordCheckRegexMessage, passwordRegex, passwordRegexMessage} from "../common/Regex/registerRegex.js";
import {useResetPassword} from "../../../member/api/FindInfo/queris.js";
import useCustomerStore from "../../store/customerStore.js";

const ResetPassword = ({setIsResetSuccess}) => {
    const {customerEmail} = useCustomerStore()

    const RESET_PASSWORD_OBJ = {
        memberPassword: '',
        memberPasswordCheck:'',
    };

    const [isAllValuePossible, setIsAllValuePossible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [resetPasswordObj, setRegisterObj] = useState(RESET_PASSWORD_OBJ);


    useEffect(() => {
        const {  memberPassword,memberPasswordCheck  } = resetPasswordObj;

        if (
            memberPassword.trim() !== '' &&
            memberPasswordCheck.trim() !== '' &&
            passwordRegex.test(memberPassword.trim()) &&
            memberPassword === memberPasswordCheck

        ) {
            setIsAllValuePossible(true);
        } else {
            setIsAllValuePossible(false);
        }
    }, [resetPasswordObj]);

    const {mutate: resetPasswordMutate} = useResetPassword();

    const submitForm = () => {
        setErrorMessage('');
        if (resetPasswordObj.memberPassword.trim() === '') return setErrorMessage('이메일을 입력해주세요');
        if (resetPasswordObj.memberPasswordCheck.trim() === '') return setErrorMessage('이메일을 입력해주세요');

        else {
            resetPasswordMutate({userEmail:customerEmail, newPassword:resetPasswordObj.memberPassword, role:"ROLE_CUSTOMER"}, {
                onSuccess: () => setIsResetSuccess(true)
            })
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setRegisterObj({ ...resetPasswordObj, [updateType]: value });
    };
    return (
        <>
            <div className="mb-6">
                <h1 className="text-indigo-900 text-2xl font-bold mb-6">비밀번호 재설정</h1>
                <InputText defaultValue={resetPasswordObj.memberPassword}
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
                <InputText defaultValue={resetPasswordObj.memberPasswordCheck}
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
            </div>

            <button type='submit' onClick={() => submitForm()}
                    className={`btn mt-2 w-full tracking-widest ${isAllValuePossible ? 'bg-main text-white btn-primary' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}>
                다음
            </button>
        </>
    )
}
export default ResetPassword