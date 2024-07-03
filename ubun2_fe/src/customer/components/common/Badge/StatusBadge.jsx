const StatusBadge = ({ bgColor, txtColor, badgeText }) => {
  return (
    <div className={`flex items-center px-4 py-2 rounded-full ${bgColor} bg-opacity-30 ${txtColor}  w-fit`}>
      <div className={`h-2.5 w-2.5 rounded-full ${bgColor} me-2`}></div>
      {badgeText}
    </div>
  );
};

export default StatusBadge;
