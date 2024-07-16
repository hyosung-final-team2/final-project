const PaymentSummaryCompleted = () => {
  return (
    <div className='mt-4'>
      <div className='flex justify-between mb-2'>
        <span>총 상품금액</span>
        <span>{subtotal}원</span>
      </div>
      <div className='flex justify-between mb-2'>
        <span>총 할인</span>
        <span>{shipping}원</span>
      </div>
      <div className='flex justify-between mb-2'>
        <span>결제수단</span>
        <div>
          <span>{payment}원</span>
          <span>{paymentInfo}</span>
        </div>
      </div>
      <div className='flex justify-between font-bold'>
        <span>결제금액</span>
        <span>{total}원</span>
      </div>
    </div>
  );
};

export default PaymentSummaryCompleted;
