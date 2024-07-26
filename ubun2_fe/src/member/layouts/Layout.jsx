import FootNav from './FootNav';
import PageContent from './PageContent';
import { useLocation } from 'react-router-dom';
import useModalStore from '../store/modalStore';

function Layout() {
  const location = useLocation();
  const pathList = location.pathname.split('/');
  const noNavPage = ['cart', 'addresses', 'payments', 'order', 'password', 'order-complete'];
  const { modalState } = useModalStore();

  const showFootNav = !pathList.some(path => noNavPage.includes(path));
  const isModalOpen = modalState ? 'overflow-y-hidden' : 'overflow-y-scroll';

  return (
    <div className={`relative flex flex-col h-dvh mx-auto my-0 ${isModalOpen} `} style={{ minWidth: '320px', maxWidth: '480px' }}>
      <PageContent hasFootNav={showFootNav} pathList={pathList} />
      {showFootNav && <FootNav pathList={pathList} />}
    </div>
  );
}

export default Layout;
