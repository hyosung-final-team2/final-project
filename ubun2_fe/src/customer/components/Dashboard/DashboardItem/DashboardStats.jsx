function DashboardStats({ title, icon, value, bgColor, description, textColor }) {
  const COLORS = ['primary', 'primary'];

  const getDescStyle = () => {
    if (description.includes('↗︎')) return 'font-bold text-green-700 dark:text-green-300';
    else if (description.includes('↙')) return 'font-bold text-rose-500 dark:text-red-400';
    else return '';
  };

  return (
    <div className={`stats drop-shadow-lg bg-white `}>
      <div className='stat '>
        <div className='flex'>
          <div className={`stat-figure dark:text-slate-300 p-2 bg-gray-200 rounded-full `}>{icon}</div>
          <div className='flex flex-col ml-5'>
            <div className={`stat-title dark:text-slate-300 ${textColor} text-m`}>{title}</div>
            <div className={`stat-value dark:text-slate-300 ${textColor} text-2xl`}>{value}</div>
            <div className={`stat-desc ${getDescStyle()} text-gray-400 text-md`}>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
