import {useState} from "react";
import FindLoginId from "../../components/ForgotLoginId/FindLoginId.jsx";
import FindLoginIdResult from "../../components/ForgotLoginId/FindLoginIdResult.jsx";

const ForgotLoginId = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [findId, setFindId] = useState(null);

    return (
        <>
            <div className='py-24 px-10'>
                {!isSuccess ? <FindLoginId setIsSuccess={setIsSuccess} setFindId={setFindId}/> : <FindLoginIdResult findId={findId}/>}
            </div>
        </>
    )
}

export default ForgotLoginId;