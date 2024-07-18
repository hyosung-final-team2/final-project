import MemHeader from './MemHeader';
import useCurrentLocationStore from '../store/currentLocationStore';
import useMemberStore from '../store/memberStore';
import { Routes, Route } from 'react-router-dom';

import MyPage from '../pages/internal/MyPage';
import StoreList from '../pages/internal/StoreList';
import Cart from '../pages/internal/Cart';
import Store from '../pages/internal/Store';
import Product from '../pages/internal/Product';
import ChooseAddress from '../pages/internal/ChooseAddress';
import RegisterAddress from '../pages/internal/RegisterAddress';
import AddressSearchMobilePopUp from '../components/Address/AddressSearchMobilePopUp';
import ChoosePayment from '../pages/internal/ChoosePayment';
import EditPayment from '../pages/internal/EditPayment';
import MyPaymentsList from '../pages/internal/MyPaymentsList';
import Order from '../pages/internal/Order';
import InputPassword from '../pages/internal/InputPassword';
import OrderComplete from '../pages/internal/OrderComplete';
import MyOrdersList from '../pages/internal/MyOrdersList';
import MySingleOrderDetail from '../pages/internal/MySingleOrderDetail';

function PageContent({ hasFootNav }) {
  const { memberId } = useMemberStore(state => ({ memberId: state.memberId }));

  return (
    <div className='flex flex-col flex-1 overflow-auto'>
      <MemHeader />
      <main className={` flex-1 overflow-y-auto ${hasFootNav ? 'mb-[10dvh]' : ''} bg-base-200`}>
        <Routes>
          <Route path='mypage' element={<MyPage />} />
          <Route path='home' element={<StoreList />} />
          <Route path='cart' element={<Cart />} />
          <Route path='addresses' element={<ChooseAddress />} />
          <Route path='addresses/register' element={<RegisterAddress />} />
          <Route path='store' element={<Store />} />
          <Route path='store/product/:productId' element={<Product />} />
          <Route path='addresses/address-search' element={<AddressSearchMobilePopUp />} />
          <Route path='payments' element={<ChoosePayment />} />
          <Route path='payments/edit' element={<EditPayment />} />
          <Route path='mypage/payment-list' element={<MyPaymentsList />} />
          <Route path='password' element={<InputPassword />} />
          <Route path='order/:orderId' element={<Order />} />
          <Route path='order-complete/:orderId' element={<OrderComplete />} />
          <Route path='mypage/order-list' element={<MyOrdersList />} />
          <Route path='mypage/single-order/:customerId/:orderId' element={<MySingleOrderDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default PageContent;
