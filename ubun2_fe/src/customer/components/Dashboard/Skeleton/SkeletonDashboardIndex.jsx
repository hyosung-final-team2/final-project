import React from 'react';
import SkeletonDashboardTopBar from './SkeletonDashboardTopBar.jsx';
import SkeletonDashboardStats from './SkeletonDashboardStats.jsx';
import SkeletonLineChart from './SkeletonLineChart.jsx';
import SkeletonAreaChart from './SkeletonAreaChart.jsx';
import SkeletonPieChart from './SkeletonPieChart.jsx';
import SkeletonRecentOrders from './SkeletonRecentOrders.jsx';
import SkeletonSidoMap from './SkeletonSidoMap.jsx';

const SkeletonDashboardIndex = () => {
  return (
    <div className='px-4 pb-4 h-[95%] bg-white'>
      <SkeletonDashboardTopBar />
      <div>
        <div className='grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-4 mb-4 text-ellipsis'>
          {[...Array(4)].map((_, index) => (
            <SkeletonDashboardStats key={index} />
          ))}
        </div>
        <div className='grid lg:grid-cols-4 gap-4 mb-4'>
          <SkeletonLineChart />
          <SkeletonAreaChart />
          <SkeletonPieChart />
        </div>
        <div className='grid lg:grid-cols-4 gap-4'>
          <SkeletonSidoMap />
          <SkeletonRecentOrders />
        </div>
      </div>
    </div>
  );
};

export default SkeletonDashboardIndex;
