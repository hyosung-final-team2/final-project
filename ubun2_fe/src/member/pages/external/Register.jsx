
import useMemberRegisterStore from "../../store/Register/memberRegisterStore.js";
import MemberRegisterFirstStep from '../../components/Register/RegisterFirstStep.jsx'
import MemberRegisterSecondStep from '../../components/Register/RegisterSecondStep.jsx'

const Register = () => {
    const { registerStep,setRegisterStep,setMemberName, setMemberEmail, resetStore } = useMemberRegisterStore(state => ({
        registerStep : state.registerStep,
        setRegisterStep: state.setRegisterStep,
        setMemberName: state.setMemberName,
        setMemberEmail: state.setMemberEmail,
        resetStore: state.resetStore,
    }));

    const renderStepComponent = () => {
        switch (registerStep) {
            case 1:
                return <MemberRegisterFirstStep setRegisterStep={setRegisterStep} setMemberName={setMemberName} setMemberEmail={setMemberEmail} />;
            case 2:
                return <MemberRegisterSecondStep setRegisterStep={setRegisterStep} resetStore={resetStore} />;
            default:
                return <MemberRegisterFirstStep setRegisterStep={setRegisterStep} setMemberName={setMemberName} setMemberEmail={setMemberEmail} />;
        }
    };

    return ( <>
        {renderStepComponent()}
    </>)
}

export default Register;