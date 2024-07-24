import DashboardStats from './DashboardItem/DashboardStats';

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon';
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon';
import DashboardTopBar from './DashboardItem/DashboardTopBar';
import DashboardLineChart from './DashboardItem/DashBoardLineChart';
import DashboardPieChart from './DashboardItem/DashboardPieChart';
import SidoMap from './DashboardItem/SidoMap';
import DashboardAreaChart from './DashboardAreaChart';
import RecentOrdersTable from './DashboardItem/RecentOrdersTable/RecentOrders';
import { useState } from 'react';
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

  const startDate = dateValue.startDate;
  const endDate = dateValue.endDate;

  const { data: ordersCount } = useGetOrdersCount(startDate, endDate);
  const { data: ordersCountAndRevenue } = useGetOrdersCountAndRevenue(startDate, endDate);
  const { data: productCount } = useGetProductCount();
  const { data: customerCount } = useGetCustomerCount();
  const { data: topSellingProducts } = useGetTopSellingProducts(startDate, endDate);
  const { data: ordersByDate } = useGetOrdersByDate(startDate, endDate);
  const { data: addressesByDate } = useGetAddressesByDate(startDate, endDate);

  const ordersCountValue = ordersCount?.data?.data; //기간별 주문 횟수
  const ordersCountAndRevenueValue = ordersCountAndRevenue?.data?.data; //기간별 주문 횟수와 총액
  const productCountValue = productCount?.data?.data; //상품수
  const customerCountValue = customerCount?.data?.data; //회원수
  const topSellingProductsValue = topSellingProducts?.data?.data; //많이 팔린 상품 탑 5
  const ordersByDateValue = ordersByDate?.data?.data; //기간별 주문 목록
  const addressesByDateValue = addressesByDate?.data?.data; //기간별 주소 목록

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
      title: '미승인 주문 건수',
      value: `${pendingOrderCount}건`,
      icon: <CircleStackIcon className='w-8 h-8' />,
      description: '클릭하시면 주문을 확인하실 수 있습니다.',
      bgColor: 'bg-custom-dashboard-pending-bg',
      hoverBgColor: 'bg-custom-dashboard-pending-hover',
      textColor: 'text-white',
      handleOnclick: handlePendingOrderClick,
    },
    {
      title: '총 주문 건수',
      value: `${totalOrderCount}건`,
      icon: <CreditCardIcon className='w-8 h-8' />,
      description: `${startDate} ~ ${endDate}`,
      bgColor: 'bg-custom-dashboard-orders-bg',
      hoverBgColor: 'bg-custom-dashboard-orders-hover',
      textColor: 'text-white',
      handleOnclick: handleOrdersByDateClick,
    },
    {
      title: '회원 수',
      value: `${customerCountValue?.memberCount}명`,
      icon: <UserGroupIcon className='w-8 h-8' />,
      description: '↗︎ 2300 (22%)',
      bgColor: 'bg-custom-dashboard-members-bg',
      hoverBgColor: 'bg-custom-dashboard-members-hover',
      textColor: 'text-white',
      handleOnclick: handleMembersClick,
    },
    {
      title: '상품 개수',
      value: `${productCountValue?.totalCount}개`,
      icon: <UsersIcon className='w-8 h-8' />,
      description: '↙ 300 (18%)',
      bgColor: 'bg-custom-dashboard-products-bg',
      hoverBgColor: 'bg-custom-dashboard-products-hover',
      textColor: 'text-white',
      handleOnclick: handleProductsClick,
    },
  ];

  return (
    <>
      <div className='px-4 h-full bg-white'>
        <DashboardTopBar dateValue={dateValue} setDateValue={setDateValue} />
        <div className='grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-4 mb-4'>
          {statsData.map((d, k) => {
            return <DashboardStats key={k} {...d} />;
          })}
        </div>
        <div className='grid lg:grid-cols-4 gap-4 mb-4'>
          <DashboardLineChart ordersCountAndRevenueValue={ordersCountAndRevenueValue} />
          <DashboardAreaChart ordersCountValue={ordersCountValue} />
          <DashboardPieChart topSellingProductsValue={topSellingProductsValue} />
        </div>
        <div className='grid lg:grid-cols-4 gap-4'>
          <SidoMap addressesByDateValue={addressesByDateValue} />
          <RecentOrdersTable ordersByDateValue={ordersByDateValue} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
