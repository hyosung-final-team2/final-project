export const calculateDaysBetween = dateValue => {
  const { startDate, endDate } = dateValue;

  // 날짜 문자열을 Date 객체로 변환
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 시간대 차이로 인한 오차를 방지하기 위해 날짜만 추출
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  // 밀리초 단위의 차이 계산
  const diffTime = Math.abs(end - start);

  // 밀리초를 일 수로 변환하고 시작일을 포함하기 위해 1을 더함
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return diffDays;
};
