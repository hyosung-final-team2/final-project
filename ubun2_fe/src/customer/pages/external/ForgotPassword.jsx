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
            <div className='min-h-screen bg-base-200 flex items-center'>
                <div className='card mx-auto w-full max-w-5xl  shadow-xl'>
                    <div className='grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl'>
                        <div className=''>
                            <LandingIntro />
                        </div>
                        <div className='py-24 px-10'>
                            {!isSuccess ? <FindPassword setIsSuccess={setIsSuccess}/> : !isResetSuccess ? <ResetPassword setIsResetSuccess={setIsResetSuccess}/> : <ResetPasswordResult/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ForgotPassword;
