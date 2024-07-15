const PaymentSummaryPre = ({ productAmount, discount, totalAmount }) => {
  const paymentColor = {
    subtitle: 'text-gray-500',
    content: 'font-bold',
  };

  return (
    <div className='flex flex-col w-full gap-3 p-6 mt-4 bg-white'>
      <div className='flex justify-between mb-2'>
        <span className={paymentColor.subtitle}>총 상품금액</span>
        <span className={paymentColor.content}>{productAmount.toLocaleString()}원</span>
      </div>
      <div className='flex justify-between mb-2'>
        <span className={paymentColor.subtitle}>총 할인</span>
        <span className={paymentColor.content}>{discount.toLocaleString()}원</span>
      </div>
      <div className={`flex justify-between text-2xl`}>
        <span className={paymentColor.content}>총 결제금액</span>
        <span className={`${paymentColor.content} text-main`}>{totalAmount.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default PaymentSummaryPre;
