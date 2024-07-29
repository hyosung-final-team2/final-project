import {useState} from "react";
import LandingIntro from "../../components/Login/LandingIntro.jsx";
import ResetPasswordResult from "../../components/ForgotPassword/ResetPasswordResult.jsx";
import FindPassword from "../../components/ForgotPassword/FindPassword.jsx";
import ResetPassword from "../../components/ForgotPassword/ResetPassword.jsx";

const ForgotPassword = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isResetSuccess, setIsResetSuccess] = useState(false);

    return (
        <>

                        <div className='py-24 px-10'>
                            {!isSuccess ? <FindPassword setIsSuccess={setIsSuccess}/> : !isResetSuccess ? <ResetPassword setIsResetSuccess={setIsResetSuccess}/> : <ResetPasswordResult/>}
                        </div>

        </>
    )
};

export default ForgotPassword;
