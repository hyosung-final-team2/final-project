import React, { useState, useMemo, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import koreaTopoJSON from '../../../../assets/sidotopo.json';

const salesColors = {
  '10+': '#FF6A06',
  '5+': '#FFA264',
  '3+': '#FFCCAA',
  '0+': '#FFEBDE',
};

const initialSalesData = {
  서울특별시: '0',
  경기도: '0',
  경상남도: '0',
  경상북도: '0',
  전라남도: '0',
  전라북도: '0',
  충청남도: '0',
  충청북도: '0',
  강원도: '0',
  부산광역시: '0',
  대구광역시: '0',
  인천광역시: '0',
  광주광역시: '0',
  대전광역시: '0',
  울산광역시: '0',
  세종특별자치시: '0',
  제주특별자치도: '0',
};

const SidoMap = ({ addressesByDateValue }) => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [salesDatas, setSalesDatas] = useState(initialSalesData);

  useEffect(() => {
    // 데이터 초기화
    setSalesDatas(initialSalesData);

    // 새로운 데이터로 salesDatas 업데이트
    if (addressesByDateValue) {
      const newSalesDatas = { ...initialSalesData };
      addressesByDateValue.forEach(address => {
        const sidoName = address.addressName.split(',')[1].trim();
        if (newSalesDatas.hasOwnProperty(sidoName)) {
          newSalesDatas[sidoName] = String(Number(newSalesDatas[sidoName]) + 1);
        }
      });
      setSalesDatas(newSalesDatas);
    }
  }, [addressesByDateValue]);

  const salesData = useMemo(() => {
    const result = {};
    Object.entries(salesDatas).forEach(([sido, count]) => {
      const numCount = Number(count);
      if (numCount > 10) result[sido] = '10+';
      else if (numCount > 5) result[sido] = '5+';
      else if (numCount > 3) result[sido] = '3+';
      else result[sido] = '0+';
    });
    return result;
  }, [salesDatas]);

  const getColor = geo => {
    const salesLevel = salesData[geo.properties.KOR_NM] || '0+';
    return salesColors[salesLevel];
  };

  return (
    <div className='flex rounded-2xl p-6 bg-white drop-shadow-lg shadow-lg col-span-2 h-[30dvh]'>
      <div className='w-[30%] p-3 border-r'>
        <h1 className='text-xl font-bold'>지역별 판매 현황</h1>
        <p className='text-sm text-gray-500 mb-4'>지역별 판매 현황을 확인할 수 있습니다.</p>
        <div className='flex flex-col mt-4'>
          <h2 className='text-lg font-bold mb-2'>판매 현황</h2>
          {Object.entries(salesColors).map(([key, color]) => (
            <div key={key} className='flex items-center mb-1'>
              <div style={{ backgroundColor: color }} className='w-4 h-4 mr-2'></div>
              <span className='capitalize'>{key}</span>
            </div>
          ))}
        </div>
      </div>
      <ComposableMap className='w-[70%]' projection='geoMercator' projectionConfig={{ scale: 5000, center: [128, 36] }}>
        <Geographies geography={koreaTopoJSON}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={getColor(geo)}
                stroke='#FFFFFF'
                strokeWidth={0.5}
                onMouseEnter={() => {
                  const { KOR_NM } = geo.properties;
                  const count = salesDatas[KOR_NM];
                  setTooltipContent(`${KOR_NM} 판매 현황: ${count}건`);
                }}
                onMouseLeave={() => {
                  setTooltipContent('');
                }}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: '#F53', outline: 'none' },
                  pressed: { outline: 'none' },
                }}
                data-tooltip-id='geo-tooltip'
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      <Tooltip id='geo-tooltip' content={tooltipContent} />
    </div>
  );
};

export default SidoMap;
