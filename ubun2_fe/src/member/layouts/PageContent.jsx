import MemHeader from './MemHeader';
import useCurrentLocationStore from '../store/currentLocationStore';
import useMemberStore from '../store/memberStore';
import { Routes, Route } from 'react-router-dom';

import MyPage from '../pages/internal/MyPage';
import StoreList from '../pages/internal/StoreList';
import Cart from '../pages/internal/Cart';
import Store from '../pages/internal/Store';
import Product from '../pages/internal/Product';

function PageContent({ hasFootNav }) {
  const { memberId } = useMemberStore(state => ({ memberId: state.memberId }));

  return (
    <div className='flex flex-col flex-1'>
      <MemHeader />
      <main className={`flex-1 overflow-y-auto ${hasFootNav ? 'mb-[10dvh]' : ''} bg-base-200`}>
        <Routes>
          <Route path='mypage' element={<MyPage />} />
          <Route path='home' element={<StoreList />} />
          <Route path='cart' element={<Cart />} />
          <Route path='store/:customerId' element={<Store />} />
          <Route path='store/:customerId/product/:productId' element={<Product />} />
        </Routes>
      </main>
    </div>
  );
}

export default PageContent;

//