// 나중에 컴포넌트로 분리하기
const BADGE_STYLES = {
  SINGLE: { bgColor: 'bg-custom-alert-bg-purple', txtColor: 'text-custom-alert-check', text: '단건 주문' },
  SUBSCRIPTION: { bgColor: 'bg-custom-alert-bg-purple', txtColor: 'text-main', text: '정기 주문' },
};

const OrderStatusBadge = ({ status }) => {
  return (
    <div className={`flex items-center px-4 py-2 rounded-full ${BADGE_STYLES[status].bgColor} bg-opacity-30 ${BADGE_STYLES[status].txtColor} w-fit`}>
      <div className={`h-2.5 w-2.5 rounded-full ${BADGE_STYLES[status].bgColor} me-2`}></div>
      {BADGE_STYLES[status].text}
    </div>
  );
};

export default OrderStatusBadge;
