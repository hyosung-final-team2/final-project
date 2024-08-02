export const cycleContent = [
  { value: 7, text: '1주에 한번 받을래요' },
  { value: 14, text: '2주에 한번 받을래요' },
  { value: 30, text: '1달에 한번 받을래요' },
  { value: 60, text: '2달에 한번 받을래요' },
];

export const getCycleText = intervalDays => {
  const cycle = cycleContent.find(item => item.value === intervalDays);
  return cycle ? cycle.text : `${intervalDays}일마다 받을래요`;
};
