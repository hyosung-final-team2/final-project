import MemHeader from './MemHeader';
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
import SetPassword from '../pages/internal/SetPassword.jsx';
import OrderComplete from '../pages/internal/OrderComplete';
import MyOrdersList from '../pages/internal/MyOrdersList';
import MySingleOrderDetail from '../pages/internal/MySingleOrderDetail';
import MySubscriptionOrderDetail from '../pages/internal/MySubscriptionOrderDetail';
import { useState } from 'react';
import SlideUpModal from '../components/common/SlideUpModal.jsx';
import Notification from '../components/notification/Notification.jsx';

function PageContent({ hasFootNav }) {
  const { memberId } = useMemberStore(state => ({ memberId: state.memberId }));
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const modalButtonStyle = 'bg-main text-white';

  return (
    <div className='flex flex-col flex-1 overflow-auto'>
      <MemHeader setIsAlarmOpen={setIsAlarmOpen} />
      <main className={` flex-1 overflow-y-auto ${hasFootNav ? 'mb-[10dvh]' : ''} bg-base-100`}>
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
          <Route path='password/set' element={<SetPassword />} />
          <Route path='password/update' element={<SetPassword />} />
          <Route path='order' element={<Order />} />
          <Route path='order-complete' element={<OrderComplete />} />
          <Route path='mypage/order-list' element={<MyOrdersList />} />
          <Route path='mypage/single-order/:customerId/:orderId' element={<MySingleOrderDetail />} />
          <Route path='mypage/subscription-order/:customerId/:orderId' element={<MySubscriptionOrderDetail />} />
        </Routes>
      </main>

      {/* 회원 가입 완료 모달*/}
      <SlideUpModal isOpen={isAlarmOpen} headerText='미확인 알림' setIsModalOpen={setIsAlarmOpen} buttonText='확인' buttonStyle={modalButtonStyle}>
        <Notification />
      </SlideUpModal>
    </div>
  );
}

export default PageContent;
