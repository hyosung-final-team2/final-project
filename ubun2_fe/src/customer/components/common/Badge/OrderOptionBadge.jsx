import SubscriptionIcon from '../../../../assets/images/subscription.svg';
import SingleIcon from '../../../../assets/images/single.svg';

const OrderOptionBadge = ({ subscription }) => {
  return subscription ? (
    <div className='flex items-center space-x-2'>
      <SubscriptionIcon className='w-6 h-6' />
      <span>정기</span>
    </div>
  ) : (
    <div className='flex items-center space-x-2'>
      <SingleIcon className='w-6 h-6' />
      <span>단기</span>
    </div>
  );
};

export default OrderOptionBadge;
