import LeftSidebar from './LeftSideBar';
import PageContent from './PageContent';

const Layout = () => {
  return (
    <>
      <div className='drawer  lg:drawer-open'>
        <input id='left-sidebar-drawer' type='checkbox' className='drawer-toggle' />
        <PageContent />
        <LeftSidebar />
      </div>
    </>
  );
};

export default Layout;
