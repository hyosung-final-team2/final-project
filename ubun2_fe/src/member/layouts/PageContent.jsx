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
// import ChoosePayment from '../pages/internal/ChoosePayment';

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
          <Route path='store/:customerId' element={<Store />} />
          <Route path='store/:customerId/product/:productId' element={<Product />} />
          <Route path='addresses/address-search' element={<AddressSearchMobilePopUp />} />
          {/* <Route path='payments' element={<ChoosePayment />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default PageContent;
