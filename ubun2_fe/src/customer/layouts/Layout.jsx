import LeftSidebar from './LeftSideBar';
import PageContent from './PageContent';
import RightSidebar from "./RightSideBar.jsx";

const Layout = () => {

  return (
    <>
      <div className='drawer  lg:drawer-open'>
        <input id='left-sidebar-drawer' type='checkbox' className='drawer-toggle' />
        <PageContent />
        <LeftSidebar />
      </div>

        {/* 알림 사이드바 */}
        <RightSidebar/>
    </>
  );
};

export default Layout;
