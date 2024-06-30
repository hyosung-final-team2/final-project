import routes from '../routes/sidebar';
import { NavLink, Link, useLocation } from 'react-router-dom';
import SidebarSubmenu from './SidebarSubmenu';

const LeftSidebar = () => {
  const location = useLocation();

  const close = e => {
    document.getElementById('left-sidebar-drawer').click();
  };

  return (
    <div className='drawer-side  z-30'>
      <label htmlFor='left-sidebar-drawer' className='drawer-overlay'></label>
      <ul className='menu  pt-8 px-6 w-80 bg-base-100 min-h-full  gap-6 text-base-content main_bg_sidebar'>
        <li className='mb-4 font-semibold text-xl'>
          <Link to={'/customer/app/dashboard'}>
            <img className='mask mask-squircle w-10' src='/profile.png' />
            HYOSUNG
          </Link>{' '}
        </li>
        {routes.map((route, k) => {
          return (
            <li className='' key={k}>
              {route.submenu ? (
                <SidebarSubmenu {...route} />
              ) : (
                <NavLink end to={route.path} className={({ isActive }) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`}>
                  {route.icon} {route.name}
                  {location.pathname === route.path ? (
                    <span className='absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary ' aria-hidden='true'></span>
                  ) : null}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSidebar;
