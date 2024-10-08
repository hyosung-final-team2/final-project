const BADGE_STYLES = {
  SINGLE: { bgColor: 'bg-blue-200', txtColor: 'text-blue-500', text: '단건 주문' },
  SUBSCRIPTION: { bgColor: 'bg-orange-200', txtColor: 'text-orange-500', text: '정기 주문' },
  APPROVED: { bgColor: 'bg-badge-green', txtColor: 'text-badge-green', text: '승인' },
  PENDING: { bgColor: 'bg-badge-orange', txtColor: 'text-badge-orange', text: '대기' },
  REJECTED: { bgColor: 'bg-badge-red', txtColor: 'text-badge-red', text: '취소' },
  DENIED: { bgColor: 'bg-badge-red', txtColor: 'text-badge-red', text: '거절' },
  MODIFIED: { bgColor: 'bg-badge-purple', txtColor: 'text-badge-gray', text: '변경' },
  DELAY: { bgColor: 'bg-badge-dark-gray', txtColor: 'text-badge-gray', text: '연기' },
  EMPTY: { bgColor: 'bg-transparent', txtColor: 'text-transparent', text: '없음' },
};

const OrderStatusBadge = ({ status, customSize }) => {
  const fontSizeClass = customSize || 'text-base';

  return (
    status && (
      <div
        className={`flex items-center px-3 py-1 rounded-full ${BADGE_STYLES[status].bgColor} bg-opacity-30 ${BADGE_STYLES[status].txtColor} w-fit font-bold ${fontSizeClass}`}
      >
        <div className={`h-2.5 w-2.5 rounded-full ${BADGE_STYLES[status].bgColor} me-2`}></div>
        {BADGE_STYLES[status].text}
      </div>
    )
  );
};

export default OrderStatusBadge;
