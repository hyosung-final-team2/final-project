import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DashboardPieChart = () => {
  const data = [
    { name: '김치', value: 400 },
    { name: '우유', value: 300 },
    { name: '집게', value: 300 },
    { name: '치즈', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className='h-[30dvh] rounded-2xl p-5 bg-white drop-shadow-lg shadow-lg'>
      <div className='p-2 text-2xl font-bold'>
        한달 간 <span className='text-red-600'>김치</span>가 <br /> 가장 많이 팔렸어요!
      </div>
      <ResponsiveContainer width='100%' height='75%'>
        <PieChart className=''>
          <Pie data={data} dataKey='value' cx='40%' cy='45%' innerRadius='40%' outerRadius='60%' fill='#8884d8' paddingAngle={5} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout='vertical'
            verticalAlign='middle'
            wrapperStyle={{
              paddingLeft: '10px',
              right: 0,
              top: '50%',
              transform: 'translate(0, -50%)',
              fontSize: '40%',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardPieChart;
