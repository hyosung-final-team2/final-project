import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, Annotation, ZoomableGroup } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import koreaTopoJSON from '../../../../assets/sidotopo.json';

// 판매 현황 색상
const salesColors = {
  '10+': '#FF6A06',
  '5+': '#FFA264',
  '3+': '#FFCCAA',
  '0+': '#FFEBDE',
};

// 초기 판매 데이터
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

// 시도명 매핑 함수 (특별자치도 처리)
const mapSidoName = sidoName => {
  if (sidoName === '전북특별자치도') return '전라북도';
  if (sidoName === '강원특별자치도') return '강원도';
  return sidoName;
};

// 시도별 좌표 및 위치 조정 값
const sidoCoordinates = {
  서울특별시: { coordinates: [126.9779, 37.5665], dx: 230, dy: -20 },
  인천광역시: { coordinates: [126.7052, 37.4563], dx: -120, dy: -20 },
  세종특별자치시: { coordinates: [127.2894, 36.4808], dx: -120, dy: -10 },
  광주광역시: { coordinates: [126.8526, 35.1595], dx: -100, dy: 150 },
  대전광역시: { coordinates: [127.3845, 36.3504], dx: -140, dy: 120 },
  대구광역시: { coordinates: [128.6014, 35.8714], dx: 140, dy: -40 },
  울산광역시: { coordinates: [129.3114, 35.5384], dx: 80, dy: 30 },
  부산광역시: { coordinates: [129.0756, 35.1796], dx: 30, dy: 90 },
  제주특별자치도: { coordinates: [126.5, 33.489], dx: 80, dy: 0 },
  // 경기도: { coordinates: [127.2, 37.4138], dx: 0, dy: -200 },
  // 충청북도: { coordinates: [127.4292, 36.6372], dx: 60, dy: 0 },
  // 강원도: { coordinates: [128.3445, 37.8228], dx: 100, dy: -30 },
  // 충청남도: { coordinates: [126.8, 36.5184], dx: -160, dy: 30 },
  // 전라북도: { coordinates: [127.1441, 35.7175], dx: -180, dy: 20 },
  // 전라남도: { coordinates: [126.991, 34.8679], dx: -60, dy: 100 },
  // 경상북도: { coordinates: [128.8889, 36.4919], dx: 100, dy: -100 },
  // 경상남도: { coordinates: [128.6922, 35.2383], dx: -10, dy: 100 },
};

const SidoMap = ({ addressesByDateValue }) => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [salesDatas, setSalesDatas] = useState(initialSalesData);
  const [position, setPosition] = useState({ coordinates: [127.5, 36], zoom: 1 });

  // useEffect를 사용하여 addressesByDateValue가 변경될 때마다 salesDatas를 업데이트
  useEffect(() => {
    setSalesDatas(initialSalesData);

    if (addressesByDateValue) {
      console.log('addressesByDateValue', addressesByDateValue);
      const newSalesDatas = { ...initialSalesData };
      addressesByDateValue.forEach(address => {
        const sidoName = address?.addressName?.split(',')[1]?.trim();
        const mappedSidoName = mapSidoName(sidoName);
        if (newSalesDatas.hasOwnProperty(mappedSidoName)) {
          newSalesDatas[mappedSidoName] = String(Number(newSalesDatas[mappedSidoName]) + 1);
        }
      });
      setSalesDatas(newSalesDatas);
    }
  }, [addressesByDateValue]);

  // useMemo를 사용하여 salesData를 캐싱 처리 (불필요한 렌더링 방지)
  const salesData = useMemo(() => {
    return salesDatas; // 직접 숫자를 반환
  }, [salesDatas]);

  // 색상 지정 함수
  const getColor = geo => {
    const count = Number(salesData[geo.properties.KOR_NM]) || 0;
    if (count > 10) return salesColors['10+'];
    if (count >= 5) return salesColors['5+'];
    if (count >= 3) return salesColors['3+'];
    return salesColors['0+'];
  };

  // 지도 이동 시 위치 변경 함수
  const handleMoveEnd = useCallback(position => {
    setPosition(position);
  }, []);

  const getTotalSales = useMemo(() => {
    return Object.values(salesDatas).reduce((acc, curr) => acc + Number(curr), 0);
  }, [salesDatas]);

  return (
    <div className='flex rounded-2xl p-6 bg-white drop-shadow-lg shadow-lg col-span-2 h-[30dvh]'>
      <div className='w-[30%] p-3 border-r'>
        <h1 className='text-[1dvw] font-bold'>지역별 판매 현황</h1>
        <p className='text-[0.9dvw] text-gray-500 mb-4'>지역별 판매 현황을 확인할 수 있습니다.</p>
        <div className='flex flex-col mt-4'>
          <h2 className='text-sm font-bold mb-2'>판매 현황</h2>
          {Object.entries(salesColors).map(([key, color]) => (
            <div key={key} className='flex items-center mb-1'>
              <div style={{ backgroundColor: color }} className='w-4 h-4 mr-2'></div>
              <span className='capitalize'>{key}</span>
            </div>
          ))}
        </div>
      </div>
      {/* 지도 컴포넌트 */}
      <div className='text-center font-bold text-lg absolute right-8'>총 {getTotalSales}건 판매</div>
      <ComposableMap className='w-[70%]' projection='geoMercator' projectionConfig={{ scale: 5000 }}>
        <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMoveEnd}>
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
          {Object.entries(sidoCoordinates).map(([sido, { coordinates, dx, dy }]) => (
            <Annotation
              key={sido}
              subject={coordinates}
              dx={dx}
              dy={dy}
              connectorProps={{
                stroke: '#FF5533',
                strokeWidth: 2,
                strokeLinecap: 'round',
              }}
              curve={1}
            >
              <text x={4} textAnchor={dx >= 0 ? 'start' : 'end'} alignmentBaseline='middle' fill='#F53' fontSize={30}>
                <tspan x={dx >= 0 ? 12 : -12} dy='-0.6em' fill='#000'>
                  {sido}
                </tspan>
                <tspan x={dx >= 0 ? 12 : -12} dy='1.2em' color=''>
                  {salesData[sido]}건 판매
                </tspan>
              </text>
            </Annotation>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip id='geo-tooltip' content={tooltipContent} />
    </div>
  );
};

export default SidoMap;
