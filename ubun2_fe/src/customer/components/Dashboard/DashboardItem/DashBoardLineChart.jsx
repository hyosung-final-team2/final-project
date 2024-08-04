import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import React from 'react';

const DashboardLineChart = ({ ordersCountAndRevenueValue, daysBetween }) => {
  const data = ordersCountAndRevenueValue?.map(item => {
    const totalOrderCount = item.orderCount + item.subscriptionOrderCount;
    const totalOrderRevenue = item.orderRevenue + item.subscriptionRevenue;
    return {
      date: item.date,
      orderCount: item.orderCount + item.subscriptionOrderCount,
      orderRevenue: totalOrderRevenue,
    };
  });

  // 숫자 형식 지정을 위한 함수
  const formatNumber = number => {
    return new Intl.NumberFormat('ko-KR').format(number);
  };

  // Tooltip 커스텀 컨텐츠
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip bg-white p-2 border border-gray-300 rounded'>
          <p className='label'>{`날짜 : ${label}`}</p>
          <p className='intro'>{`주문 수 : ${formatNumber(payload[0].value)}`}</p>
          <p className='intro'>{`매출 : ${formatNumber(payload[1].value)} 원`}</p>
        </div>
      );
    }
    return null;
  };

  // 매출액 형식 지정을 위한 함수
  const formatRevenue = number => {
    return number.toLocaleString('ko-KR');
  };

  if (ordersCountAndRevenueValue === undefined || ordersCountAndRevenueValue.length === 0 || data === undefined || data.length === 0) {
    return (
      <div className='h-[30dvh] rounded-2xl p-6 bg-white drop-shadow-lg shadow-lg col-span-2'>
        <h2 className='text-lg font-bold mb-4'>{daysBetween}일간의 주문 및 매출 추이</h2>
        <div className='text-md bg-gray-100 h-[80%] rounded-xl flex justify-center items-center'>주문 및 매출 데이터가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className='h-[30dvh] rounded-2xl p-6 bg-white drop-shadow-lg shadow-lg col-span-2'>
      <h2 className='text-lg font-bold mb-4'>{daysBetween}일간의 주문 및 매출 추이</h2>
      <ResponsiveContainer width='100%' height='80%'>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis yAxisId='left' />
          <YAxis yAxisId='right' orientation='right' tickFormatter={formatRevenue} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line yAxisId='left' type='monotone' dataKey='orderCount' stroke='#8884d8' name='주문 수' />
          <Line yAxisId='right' type='monotone' dataKey='orderRevenue' stroke='#82ca9d' name='매출 (원)' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardLineChart;
