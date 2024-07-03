const OrderOptionBadge = ({ icon: IconComponent, orderOptionText }) => {
  return (
    <div className='flex items-center space-x-2'>
      <IconComponent className='w-6 h-6' />
      <span>{orderOptionText}</span>
    </div>
  );
};

export default OrderOptionBadge;
