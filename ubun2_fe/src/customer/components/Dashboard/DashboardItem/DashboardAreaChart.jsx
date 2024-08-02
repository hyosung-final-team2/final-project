import React from 'react';
import { AreaChart, XAxis, YAxis, Area, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DashboardAreaChart = ({ ordersCountValue, daysBetween }) => {
  return (
    <div className='h-[30dvh] rounded-2xl p-5 bg-white drop-shadow-lg shadow-lg col-span-1'>
      <h2 className='text-lg font-bold mb-4'>{daysBetween}일간 정기vs단건 현황</h2>
      <ResponsiveContainer width='100%' height='80%'>
        <AreaChart data={ordersCountValue} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id='colorRegular' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#4e79a7' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#4e79a7' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorSingle' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#f28e2c' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#f28e2c' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='date' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
          <Area type='monotone' dataKey='orderCount' name='단건주문' stroke='#4e79a7' fillOpacity={1} fill='url(#colorRegular)' />
          <Area type='monotone' dataKey='subscriptionOrderCount' name='정기주문' stroke='#f28e2c' fillOpacity={1} fill='url(#colorSingle)' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardAreaChart;
