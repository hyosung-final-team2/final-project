import {useLocation} from "react-router-dom";

const ResetPassword = () => {
    const location = useLocation();
    const { memberName } = location.state || {};
    return <><h1>{memberName}</h1></>
}

export default ResetPassword