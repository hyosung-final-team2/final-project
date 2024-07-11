import PaymentRegisterTable from './PaymentRegisterTable';
import PaymentInput from '../../../common/Input/PaymentInput';

const PaymentInfoSection = ({ memberRegisterObj, memberPaymentMethods,isUpdate }) => {


  return (
    <>
      {/* PaymentRegisterTable 테이블 추가 */}
      <PaymentRegisterTable memberPaymentMethods={memberPaymentMethods}/>
        {!memberPaymentMethods.length ?
            <>
                <div className="flex justify-center items-center mx-3 py-16 bg-gray-100 rounded-lg">
                    <h1>등록된 결제수단이 없습니다.</h1>
                </div>
            </>
            :
            null
        }

        {isUpdate && <PaymentInput />}
    </>
  );
};

export default PaymentInfoSection;
