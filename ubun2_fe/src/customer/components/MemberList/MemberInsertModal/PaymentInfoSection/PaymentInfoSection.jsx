import { useState } from 'react';
// import Radio from '../../../common/Radio/Radio';
// import PaymentRegisterForm from './PaymentRegisterForm';
import PaymentRegisterTable from './PaymentRegisterTable';
import PaymentInput from '../../../common/Input/PaymentInput';

const PaymentInfoSection = ({ memberRegisterObj, memberPaymentMethods,isUpdate }) => {
  const [isCard, setIsCard] = useState(true);

  return (
    <>
      {/* PaymentRegisterTable 테이블 추가 */}
      <PaymentRegisterTable memberPaymentMethods={memberPaymentMethods}/>
      {/* <Radio title='결제수단 추가' firstText='신용카드' secondText='CMS 결제' isCard={isCard} setIsCard={setIsCard} />
      <PaymentRegisterForm isCard={isCard} memberRegisterObj={memberRegisterObj} /> */}
        {isUpdate && <PaymentInput />}
    </>
  );
};

export default PaymentInfoSection;
