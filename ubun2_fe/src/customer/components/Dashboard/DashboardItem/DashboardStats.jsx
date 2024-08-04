const DashboardStats = ({ title, bgColor, hoverBgColor, icon, value, description, textColor, handleOnclick }) => {
  if (value === undefined || value === null || value === '') {
    return (
      <div className={`stats drop-shadow-lg cursor-pointer ${bgColor} hover:${hoverBgColor} text-ellipsis overflow-hidden w-full h-28`} onClick={handleOnclick}>
        <div className='stat p-4'>
          <div className='flex items-center h-full'>
            <div className={`stat-figure dark:text-slate-300 p-2 bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center`}>{icon}</div>
            <div className='flex flex-col ml-4 min-w-0 flex-1 justify-center h-full'>
              <div className={`stat-title dark:text-slate-300 ${textColor} text-sm truncate`}>{title}</div>
              <div className={`stat-value dark:text-slate-300 ${textColor} text-2xl font-bold truncate`}>데이터가 없습니다.</div>
              <div className={`stat-desc text-main text-xs truncate`}>{description}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`stats drop-shadow-lg cursor-pointer ${bgColor} hover:${hoverBgColor} text-ellipsis overflow-hidden w-full h-28`} onClick={handleOnclick}>
      <div className='stat p-4'>
        <div className='flex items-center h-full'>
          <div className={`stat-figure dark:text-slate-300 p-2 bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center`}>{icon}</div>
          <div className='flex flex-col ml-4 min-w-0 flex-1 justify-center h-full'>
            <div className={`stat-title dark:text-slate-300 ${textColor} text-sm truncate`}>{title}</div>
            <div className={`stat-value dark:text-slate-300 ${textColor} text-2xl font-bold truncate`}>{value}</div>
            <div className={`stat-desc text-main text-xs truncate`}>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
