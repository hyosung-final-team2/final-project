import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import koreaTopoJSON from '../../../../assets/sidotopo.json';

// 판매 현황에 따른 색상 정의
const salesColors = {
  '100+': '#FF6B6B',
  '50+': '#4ECDC4',
  '25+': '#45B7D1',
  '25이하': '#FFA07A',
};

// 모든 지역에 대한 예시 데이터
const salesData = {
  서울특별시: '100+',
  부산광역시: '50+',
  대구광역시: '50+',
  인천광역시: '100+',
  광주광역시: '25이하',
  대전광역시: '50+',
  울산광역시: '25+',
  세종특별자치시: '25이하',
  경기도: '100+',
  강원도: '25+',
  충청북도: '50+',
  충청남도: '50+',
  전라북도: '25+',
  전라남도: '25+',
  경상북도: '50+',
  경상남도: '50+',
  제주특별자치도: '25+',
};

const SidoMap = () => {
  const [tooltipContent, setTooltipContent] = useState('');

  const getColor = geo => {
    const salesLevel = salesData[geo.properties.KOR_NM] || 'veryLow';
    return salesColors[salesLevel];
  };

  return (
    <div className='flex rounded-2xl p-6 bg-white drop-shadow-lg shadow-lg col-span-2 h-[30dvh]'>
      <div className='w-[30%] p-3 border-r'>
        <h1 className='text-xl font-bold'>상품 판매 현황</h1>
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
      <ComposableMap className='w-[70%]' projection='geoMercator' projectionConfig={{ scale: 4000, center: [128, 36] }}>
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
                  const { KOR_NM, CD } = geo.properties;
                  const salesLevel = salesData[KOR_NM] || '정보 없음';
                  setTooltipContent(`${KOR_NM} 판매 현황: ${salesLevel}`);
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
