const OrderStatusTextBadge = ({ status }) => {
  const statusStyles = {
    // APPROVED, DENIED, PENDING, MODIFIED, DELAY
    PENDING: { text: '승인 대기', className: 'text-purple-500' },
    APPROVED: { text: '승인 완료', className: 'text-blue-500' },
    DENIED: { text: '주문 거절', className: 'text-red-500' },
    REJECTED: { text: '주문 취소', className: 'text-red-500' },
    MODIFIED: { text: '주문 변경', className: 'text-purple-500' },
    DELAY: { text: '주문 연기', className: 'text-purple-500' },
  };
  const { text, className } = statusStyles[status] || statusStyles.PENDING;
  return status && <span className={`font-bold ${className}`}>{text}</span>;
};

export default OrderStatusTextBadge;
