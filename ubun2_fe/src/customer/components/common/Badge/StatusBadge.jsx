const BADGE_STYLES = {
  APPROVED: { bgColor: 'bg-badge-green', txtColor: 'text-badge-green', text: '승인' },
  PENDING: { bgColor: 'bg-badge-orange', txtColor: 'text-badge-orange', text: '대기' },
  REJECTED: { bgColor: 'bg-badge-red', txtColor: 'text-badge-red', text: '거절' },
  DENIED: { bgColor: 'bg-badge-red', txtColor: 'text-badge-red', text: '취소' },
  COMPLETED: { bgColor: 'bg-badge-green', txtColor: 'text-badge-green', text: '완료' },
  PUBLIC: { bgColor: 'bg-badge-blue', txtColor: 'text-badge-blue', text: '공개' },
  PRIVATE: { bgColor: 'bg-badge-red', txtColor: 'text-badge-red', text: '비공개' },
  LOADING: { bgColor: 'bg-transparent', txtColor: 'text-transparent', text: '로딩중' },
};

const StatusBadge = ({ status }) => {
  return (
    status && (
      <div className={`flex items-center px-4 py-2 rounded-full ${BADGE_STYLES[status].bgColor} bg-opacity-30 ${BADGE_STYLES[status].txtColor}  w-fit`}>
        <div className={`h-2.5 w-2.5 rounded-full ${BADGE_STYLES[status].bgColor} me-2`}></div>
        {BADGE_STYLES[status].text}
      </div>
    )
  );
};

export default StatusBadge;
