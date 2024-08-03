export const orderStatusOptions = [
  { value: '', label: '전체' },
  { value: 'APPROVED', label: '승인' },
  { value: 'DENIED', label: '거절' },
  { value: 'DELAY', label: '연기' },
  { value: 'MODIFIED', label: '변경' },
  // PENDING 상태는 완료된 주문에는 X
];
