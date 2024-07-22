import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import React from 'react';

const DashboardLineChart = () => {
  // 예시 데이터: 실제 데이터로 대체해야 합니다
  const data = [
    { month: '1월', orders: 120, revenue: 24000 },
    { month: '2월', orders: 150, revenue: 28000 },
    { month: '3월', orders: 200, revenue: 32000 },
    { month: '4월', orders: 180, revenue: 30000 },
    { month: '5월', orders: 220, revenue: 36000 },
    { month: '6월', orders: 250, revenue: 40000 },
  ];

  return (
    <div className='h-[30dvh] rounded-2xl p-6 bg-white drop-shadow-lg shadow-lg col-span-2'>
      <h2 className='text-lg font-bold mb-4'>월별 주문 및 매출 추이</h2>
      <ResponsiveContainer width='100%' height='80%'>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis yAxisId='left' />
          <YAxis yAxisId='right' orientation='right' />
          <Tooltip />
          <Legend />
          <Line yAxisId='left' type='monotone' dataKey='orders' stroke='#8884d8' name='주문 수' />
          <Line yAxisId='right' type='monotone' dataKey='revenue' stroke='#82ca9d' name='매출 (만원)' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardLineChart;
