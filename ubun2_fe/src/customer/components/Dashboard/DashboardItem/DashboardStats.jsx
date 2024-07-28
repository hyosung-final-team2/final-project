function DashboardStats({ title, bgColor, hoverBgColor, icon, value, description, textColor, handleOnclick }) {
  return (
    <div className={`stats drop-shadow-lg cursor-pointer ${bgColor} hover:${hoverBgColor} text-ellipsis overflow-hidden`} onClick={handleOnclick}>
      <div className='stat '>
        <div className='flex'>
          <div className={`stat-figure dark:text-slate-300 p-2 bg-gray-200 rounded-full `}>{icon}</div>
          <div className='flex flex-col ml-5 min-w-0 flex-1'>
            <div className={`stat-title dark:text-slate-300 ${textColor} text-m`}>{title}</div>
            <div className={`stat-value dark:text-slate-300 ${textColor} text-2xl`}>{value}</div>
            <div className={`stat-desc text-main text-md text-ellipsis`}>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
