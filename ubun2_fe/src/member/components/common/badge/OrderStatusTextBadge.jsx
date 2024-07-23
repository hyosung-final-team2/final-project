const OrderStatusTextBadge = ({ status }) => {
  const statusStyles = {
    PENDING: { text: '승인 대기', className: 'text-purple-500' },
    APPROVE: { text: '승인 완료', className: 'text-blue-500' },
    DENIED: { text: '주문 취소', className: 'text-red-500' },
  };
  const { text, className } = statusStyles[status] || statusStyles.PENDING;
  return <span className={`font-bold ${className}`}>{text}</span>;
};

export default OrderStatusTextBadge;
