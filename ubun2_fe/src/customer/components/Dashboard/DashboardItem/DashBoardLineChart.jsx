import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import React from 'react';

const DashboardLineChart = ({ ordersCountAndRevenueValue }) => {
  const data = ordersCountAndRevenueValue?.map(item => {
    return {
      date: item.date,
      orderCount: item.orderCount + item.subscriptionOrderCount,
      orderRevenue: item.orderRevenue + item.subscriptionRevenue,
    };
  });

  return (
    <div className='h-[30dvh] rounded-2xl p-6 bg-white drop-shadow-lg shadow-lg col-span-2'>
      <h2 className='text-lg font-bold mb-4'>월별 주문 및 매출 추이</h2>
      <ResponsiveContainer width='100%' height='80%'>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis yAxisId='left' />
          <YAxis yAxisId='right' orientation='right' />
          <Tooltip />
          <Legend />
          <Line yAxisId='left' type='monotone' dataKey='orderCount' stroke='#8884d8' name='주문 수' />
          <Line yAxisId='right' type='monotone' dataKey='orderRevenue' stroke='#82ca9d' name='매출 (원)' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardLineChart;
