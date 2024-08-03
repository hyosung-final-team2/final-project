export const orderStatusOptions = [
  { value: '', label: '전체' },
  { value: 'APPROVED', label: '승인' },
  { value: 'DENIED', label: '거절' },
  { value: 'DELAY', label: '지연' },
  { value: 'MODIFIED', label: '수정' },
  // PENDING 상태는 완료된 주문에는 X
];
