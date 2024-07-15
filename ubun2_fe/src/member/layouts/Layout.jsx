import FootNav from './FootNav';
import PageContent from './PageContent';
import { useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const pathList = location.pathname.split('/');
  const noNavPage = ['wegwe', 'a', 'cart', 'addresses', 'payments'];

  const showFootNav = !pathList.some(path => noNavPage.includes(path));

  return (
    <div className='mobile_container flex flex-col h-screen'>
      <PageContent hasFootNav={showFootNav} pathList={pathList} />
      {showFootNav && <FootNav pathList={pathList} />}
    </div>
  );
}

export default Layout;
