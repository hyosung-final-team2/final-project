const PaymentSummaryCompleted = ({ productAmount, discount, totalAmount, paymentType, paymentInfo, style }) => {
  return (
    <div className={`px-4 py-8 bg-white ${style}`}>
      <h2 className='text-2xl font-semibold'>결제 정보</h2>
      <div className='flex flex-col gap-5 mt-4 font-semibold'>
        <div className='flex justify-between'>
          <span>할인 금액</span>
          <span>{`-${discount?.toLocaleString()}원`}</span>
        </div>
        <div className='flex justify-between text-main'>
          <span>총 결제 금액</span>
          <span>{totalAmount?.toLocaleString()}원</span>
        </div>
        <div className='flex justify-between'>
          <span>{paymentInfo.paymentName}</span>
          <span>{paymentInfo.paymentContent}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummaryCompleted;
