import DashboardStats from './DashboardItem/DashboardStats';

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import ProductsIcon from '@heroicons/react/24/outline/ArchiveBoxIcon';
import PendingOrdersCount from '../../../assets/images/pending.svg';
import OrdersCount from '../../../assets/images/order.svg';
import html2canvas from 'html2canvas-pro';
import DashboardTopBar from './DashboardItem/DashboardTopBar';
import DashboardLineChart from './DashboardItem/DashBoardLineChart';
import DashboardPieChart from './DashboardItem/DashboardPieChart';
import SidoMap from './DashboardItem/SidoMap';
import DashboardAreaChart from './DashboardItem/DashboardAreaChart';
import RecentOrdersTable from './DashboardItem/RecentOrdersTable/RecentOrders';
import { useState, useCallback, useRef } from 'react';
import {
  useGetTopSellingProducts,
  useGetAddressesByDate,
  useGetCustomerCount,
  useGetOrdersByDate,
  useGetOrdersCount,
  useGetOrdersCountAndRevenue,
  useGetProductCount,
} from '../../api/Dashboard/queries';
import { useNavigate } from 'react-router-dom';
import SkeletonDashboardIndex from './Skeleton/SkeletonDashboardIndex';
import SkeletonDashboardStats from './Skeleton/SkeletonDashboardStats';
import { calculateDaysBetween } from './DashboardItem/calculateDaysBetween';

const formatDate = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState(() => {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 7); // 7일 전 (1주일)
    return {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };
  });
  const dashboardRef = useRef(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const startDate = dateValue.startDate;
  const endDate = dateValue.endDate;

  const { data: ordersCount, refetch: refetchOrdersCount, isLoading: ordersCountIsLoading } = useGetOrdersCount(startDate, endDate);
  const {
    data: ordersCountAndRevenue,
    refetch: refetchOrdersCountAndRevenue,
    isLoading: ordersCountAndRevenueIsLoading,
  } = useGetOrdersCountAndRevenue(startDate, endDate);
  const { data: productCount, refetch: refetchProductCount, isLoading: productCountisLoading } = useGetProductCount();
  const { data: customerCount, refetch: refetchCustomerCount, isLoading: customerCountisLoading } = useGetCustomerCount();
  const { data: topSellingProducts, refetch: refetchTopSellingProducts, isLoading: topSellingProductsIsLoading } = useGetTopSellingProducts(startDate, endDate);
  const { data: ordersByDate, refetch: refetchOrdersByDate, isLoading: ordersByDateIsLoading } = useGetOrdersByDate(startDate, endDate);
  const { data: addressesByDate, refetch: refetchAddressesByDate, isLoading: addressesByDateIsLoading } = useGetAddressesByDate(startDate, endDate);

  const handleRefresh = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
    refetchOrdersCount();
    refetchOrdersCountAndRevenue();
    refetchProductCount();
    refetchCustomerCount();
    refetchTopSellingProducts();
    refetchOrdersByDate();
    refetchAddressesByDate();
  }, [
    refetchOrdersCount,
    refetchOrdersCountAndRevenue,
    refetchProductCount,
    refetchCustomerCount,
    refetchTopSellingProducts,
    refetchOrdersByDate,
    refetchAddressesByDate,
  ]);

  const ordersCountValue = ordersCount?.data?.data; //기간별 주문 횟수
  const ordersCountAndRevenueValue = ordersCountAndRevenue?.data?.data; //기간별 주문 횟수와 총액
  const productCountValue = productCount?.data?.data; //상품수
  const customerCountValue = customerCount?.data?.data; //회원수
  const topSellingProductsValue = topSellingProducts?.data?.data; //많이 팔린 상품 탑 5
  const ordersByDateValue = ordersByDate?.data?.data; //기간별 주문 목록
  const addressesByDateValue = addressesByDate?.data?.data; //기간별 주소 목록

  const captureAndSaveImage = useCallback(async () => {
    if (!dashboardRef.current) return;

    try {
      const elementsWithOklch = dashboardRef.current.querySelectorAll('[style*="oklch"]');
      elementsWithOklch.forEach(el => {
        const style = window.getComputedStyle(el);
        const backgroundColor = style.backgroundColor;
        el.dataset.originalBg = el.style.backgroundColor;
        el.style.backgroundColor = backgroundColor;
      });

      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: null, // 투명 배경을 사용
        onclone: clonedDoc => {
          // 클론된 문서에서 Tailwind 클래스를 인라인 스타일로 변환
          const elementsWithTailwind = clonedDoc.querySelectorAll('[class*="bg-"]');
          elementsWithTailwind.forEach(el => {
            const style = window.getComputedStyle(el);
            el.style.backgroundColor = style.backgroundColor;
          });
        },
      });

      elementsWithOklch.forEach(el => {
        el.style.backgroundColor = el.dataset.originalBg;
        delete el.dataset.originalBg;
      });

      const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

      const link = document.createElement('a');
      link.download = 'dashboard.png';
      link.href = image;
      link.click();
    } catch (error) {
      console.error('이미지 캡처 중 오류 발생:', error);
    }
  }, []);

  const totalOrderCount = ordersCountValue?.reduce((acc, cur) => acc + cur.orderCount + cur.subscriptionOrderCount, 0); //총 주문 건수
  const pendingOrderCount = ordersByDateValue?.filter(order => order.orderStatus === 'PENDING').length; //미승인 주문 건수

  const handlePendingOrderClick = () => {
    navigate('/customer/app/pendingorder');
  };

  const handleOrdersByDateClick = () => {
    navigate('/customer/app/order');
  };

  const handleMembersClick = () => {
    navigate('/customer/app/member');
  };

  const handleProductsClick = () => {
    navigate('/customer/app/product');
  };

  const statsData = [
    {
      id: 'pending-orders',
      title: '미승인 주문 건수',
      value: `${pendingOrderCount}건`,
      icon: <PendingOrdersCount className='w-8 h-8' />,
      description: '클릭해서 주문 확인',
      bgColor: 'bg-white',
      hoverBgColor: 'bg-gray-200',
      textColor: 'text-main',
      handleOnclick: handlePendingOrderClick,
      isLoading: ordersByDateIsLoading,
    },
    {
      id: 'total-orders',
      title: '총 주문 건수',
      value: `${totalOrderCount}건`,
      icon: <OrdersCount className='w-8 h-8' />,
      description: `${startDate}~${endDate}`,
      bgColor: 'bg-white',
      hoverBgColor: 'bg-gray-200',
      textColor: 'text-main',
      handleOnclick: handleOrdersByDateClick,
      isLoading: ordersCountIsLoading,
    },
    {
      id: 'members-count',
      title: '회원 수',
      value: `${customerCountValue?.memberCount}명`,
      icon: <UserGroupIcon className='w-8 h-8' />,
      description: '',
      bgColor: 'bg-white',
      hoverBgColor: 'bg-gray-200',
      textColor: 'text-main',
      handleOnclick: handleMembersClick,
      isLoading: customerCountisLoading,
    },
    {
      id: 'products-count',
      title: '상품 개수',
      value: `${productCountValue?.totalCount}개`,
      icon: <ProductsIcon className='w-8 h-8' />,
      description: '',
      bgColor: 'bg-white',
      hoverBgColor: 'bg-gray-200',
      textColor: 'text-main',
      handleOnclick: handleProductsClick,
      isLoading: productCountisLoading,
    },
  ];

  const daysBetween = calculateDaysBetween(dateValue);

  if (
    ordersCountIsLoading ||
    ordersCountAndRevenueIsLoading ||
    productCountisLoading ||
    customerCountisLoading ||
    topSellingProductsIsLoading ||
    ordersByDateIsLoading ||
    addressesByDateIsLoading
  ) {
    return <SkeletonDashboardIndex />;
  }

  return (
    <div className='px-4 pb-4 h-[95%] bg-white' key={refreshKey}>
      <DashboardTopBar dateValue={dateValue} setDateValue={setDateValue} onRefresh={handleRefresh} captureAndSaveImage={captureAndSaveImage} />
      <div ref={dashboardRef}>
        <div className='grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-4 mb-4 text-ellipsis'>
          {statsData.map((d, k) => {
            return <DashboardStats key={k} {...d} />;
          })}
        </div>
        <div className='grid lg:grid-cols-4 gap-4 mb-4'>
          <DashboardLineChart ordersCountAndRevenueValue={ordersCountAndRevenueValue} daysBetween={daysBetween} />
          <DashboardAreaChart ordersCountValue={ordersCountValue} daysBetween={daysBetween} />
          <DashboardPieChart topSellingProductsValue={topSellingProductsValue} daysBetween={daysBetween} />
        </div>
        <div className='grid lg:grid-cols-4 gap-4'>
          <SidoMap addressesByDateValue={addressesByDateValue} />
          <RecentOrdersTable ordersByDateValue={ordersByDateValue} daysBetween={daysBetween} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
