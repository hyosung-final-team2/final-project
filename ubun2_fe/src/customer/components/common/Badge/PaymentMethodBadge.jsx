const PaymentMethodBadge = ({ icon: IconComponent, paymentText }) => {
  return (
    <div className='flex items-center space-x-2'>
      <IconComponent className='w-6 h-6' />
      <span>{paymentText}</span>
    </div>
  );
};

export default PaymentMethodBadge;
