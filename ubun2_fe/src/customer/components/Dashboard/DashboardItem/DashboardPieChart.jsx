import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { josa } from 'es-hangul';

const DashboardPieChart = ({ topSellingProductsValue }) => {
  const [legendLayout, setLegendLayout] = useState('vertical');
  const containerRef = useRef(null);

  const data =
    topSellingProductsValue?.map(item => ({
      name: item.productName,
      value: item.salesCount,
    })) ?? [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#7F6CF6'];

  //가장 큰 값 찾기
  const maxValue = Math.max(...data.map(item => item.value), 0);

  //가장 큰 값과 같은 값들 찾기
  const topSellingProducts = data.filter(item => item.value === maxValue);

  //가장 많이 팔린 상품들 splits
  const topSellingProductNames = topSellingProducts.map(product => product.name).join(', ');

  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setLegendLayout(width > 400 ? 'vertical' : 'horizontal');
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const first = josa(topSellingProductNames, '이/가').slice(0, -1);
  const second = josa(topSellingProductNames, '이/가').slice(-1);

  return (
    <div ref={containerRef} className='h-[30dvh] rounded-2xl p-5 bg-white drop-shadow-lg shadow-lg col-span-1'>
      <div className='p-2 text-2xl font-bold'>
        기간 동안 <span className='text-red-600'>{first}</span>
        {second} <br /> 가장 많이 팔렸어요!
      </div>
      <ResponsiveContainer width='100%' height='75%'>
        <PieChart>
          <Pie
            data={data}
            dataKey='value'
            cx={legendLayout === 'vertical' ? '40%' : '50%'}
            cy='45%'
            innerRadius='40%'
            outerRadius='60%'
            fill='#8884d8'
            paddingAngle={5}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout={legendLayout}
            verticalAlign={legendLayout === 'vertical' ? 'middle' : 'bottom'}
            align={legendLayout === 'vertical' ? 'right' : 'center'}
            wrapperStyle={
              legendLayout === 'vertical'
                ? {
                    paddingLeft: '10px',
                    right: 0,
                    top: '50%',
                    transform: 'translate(0, -50%)',
                    fontSize: '90%',
                  }
                : {
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '90%',
                  }
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardPieChart;
