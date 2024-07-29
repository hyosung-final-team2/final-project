import LandingIntro from '../../components/Login/LandingIntro';
import RegisterFirstStep from '../../components/Register/RegisterFirstStep';
import RegisterSecondStep from '../../components/Register/RegisterSecondStep';
import RegisterThirdStep from '../../components/Register/RegisterThirdStep';
import RegisterCompletion from '../../components/Register/RegisterCompletion';
import RegisterStepBar from '../../components/Register/RegisterStepBar';
import useRegisterStepStore from '../../store/Register/registerStepStore';

const Register = () => {
  const { registerStep, setRegisterStep, setRegisterFirstData, setRegisterSecondData, setRegisterThirdData, resetStore } = useRegisterStepStore(state => ({
    registerStep: state.registerStep,
    setRegisterStep: state.setRegisterStep,
    setRegisterFirstData: state.setRegisterFirstData,
    setRegisterSecondData: state.setRegisterSecondData,
    setRegisterThirdData: state.setRegisterThirdData,
    resetStore: state.resetStore,
  }));

  const renderStepComponent = () => {
    switch (registerStep) {
      case 1:
        return <RegisterFirstStep setRegisterStep={setRegisterStep} setRegisterFirstData={setRegisterFirstData} />;
      case 2:
        return <RegisterSecondStep setRegisterStep={setRegisterStep} setRegisterSecondData={setRegisterSecondData} />;
      case 3:
        return <RegisterThirdStep setRegisterStep={setRegisterStep} setRegisterThirdData={setRegisterThirdData} />;
      case 4:
        return <RegisterCompletion resetStore={resetStore} />;
      default:
        return <RegisterFirstStep setRegisterStep={setRegisterStep} setRegisterFirstData={setRegisterFirstData} />;
    }
  };

  return (
    <>

            <div className={registerStep === 4 ? 'py-44 px-10' : 'py-24 px-10'}>
              {registerStep !== 4 && <RegisterStepBar registerStep={registerStep} />}
              {renderStepComponent()}
            </div>

    </>
  );
};

export default Register;
