import {useState} from "react";
import LandingIntro from "../../components/Login/LandingIntro.jsx";
import FindLoginId from "../../components/ForgotLoginId/FindLoginId.jsx";
import FindLoginIdResult from "../../components/ForgotLoginId/FindLoginIdResult.jsx";

const ForgotLoginId = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [findId, setFindId] = useState(null);

    return (
        <>
            <div className='min-h-screen bg-base-200 flex items-center'>
                <div className='card mx-auto w-full max-w-5xl  shadow-xl'>
                    <div className='grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl'>
                        <div className=''>
                            <LandingIntro />
                        </div>
                        <div className='py-24 px-10'>
                            {/*<div className={registerStep === 4 ? 'py-44 px-10' : 'py-24 px-10'}>*/}
                            {!isSuccess ? <FindLoginId setIsSuccess={setIsSuccess} setFindId={setFindId}/> : <FindLoginIdResult findId={findId}/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotLoginId;