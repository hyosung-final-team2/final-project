import Dashboard from '../pages/internal/Dashboard';
import AddressList from '../pages/internal/AddressList';
import MemberList from '../pages/internal/MemberList';
import OrderList from '../pages/internal/OrderList';
import PaymentList from '../pages/internal/PaymentList';
import PendingOrderList from '../pages/internal/PendingOrderList';
import ProductList from '../pages/internal/ProductList';
import StoreInfo from '../pages/internal/StoreInfo';

import Calendar from '../pages/internal/Calendar';

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/member',
    component: MemberList,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/address',
    component: AddressList,
  },
  {
    path: '/payment',
    component: PaymentList,
  },
  {
    path: '/product',
    component: ProductList,
  },
  {
    path: '/order',
    component: OrderList,
  },
  {
    path: '/pendingorder',
    component: PendingOrderList,
  },
  {
    path: '/storeinfo',
    component: StoreInfo,
  },
];

export default routes;
