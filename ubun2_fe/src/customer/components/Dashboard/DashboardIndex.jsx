import DashboardStats from './DashboardItem/DashboardStats';
// import AmountStats from './DashboardItem/AmountStats'
// import PageStats from './DashboardItem/PageStats'

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon';
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon';
import DashboardTopBar from './DashboardItem/DashboardTopBar';
import DashboardLineChart from './DashboardItem/DashBoardLineChart';
import DashboardPieChart from './DashboardItem/DashboardPieChart';
import SidoMap from './DashboardItem/SidoMap';
import DashboardAreaChart from './DashboardAreaChart';
import RecentOrdersTable from './DashboardItem/RecentOrdersTable/RecentOrders';
// import {showNotification} from '../common/headerSlice'
// import DoughnutChart from './components/DoughnutChart'
// import { useState } from 'react'

const statsData = [
  {
    title: '미승인 주문 건수',
    value: '12개',
    icon: <CircleStackIcon className='w-8 h-8' />,
    description: '50 in hot leads',
    bgColor: 'bg-custom-card-bg-members',
    textColor: 'text-main',
  },
  {
    title: '총 주문 건수',
    value: '$34,545',
    icon: <CreditCardIcon className='w-8 h-8' />,
    description: 'Current month',
    bgColor: 'bg-custom-card-bg-members',
    textColor: 'text-main',
  },
  {
    title: '상품 개수',
    value: '5.6k',
    icon: <UsersIcon className='w-8 h-8' />,
    description: '↙ 300 (18%)',
    bgColor: 'bg-custom-card-bg-members',
    textColor: 'text-main',
  },
  {
    title: '회원 수',
    value: '34.7k',
    icon: <UserGroupIcon className='w-8 h-8' />,
    description: '↗︎ 2300 (22%)',
    bgColor: 'bg-custom-card-bg-members',
    textColor: 'text-main',
  },
];

const Dashboard = () => {
  return (
    <>
      <div className='px-4 h-full bg-white '>
        <DashboardTopBar />
        <div className='grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-4 mb-4'>
          {statsData.map((d, k) => {
            return <DashboardStats key={k} {...d} />;
          })}
        </div>
        <div className='grid lg:grid-cols-4 gap-4 mb-4'>
          <DashboardLineChart />
          <DashboardAreaChart />
          <DashboardPieChart />
        </div>
        <div className='grid lg:grid-cols-4 gap-4'>
          <SidoMap />
          <RecentOrdersTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
