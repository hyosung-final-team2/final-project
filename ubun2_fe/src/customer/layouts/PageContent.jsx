import Header from './Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import routes from '../routes';
import sidebarRoutes from '../routes/sidebar';
import React from 'react';

const PageContent = () => {
  const location = useLocation();

  const currentRoute =
    sidebarRoutes.find(route => route.path === location.pathname) ||
    sidebarRoutes.flatMap(route => route.submenu || []).find(subRoute => subRoute.path === location.pathname);

  return (
    <div className='drawer-content flex flex-col py-7 px-4 main_bg_page'>
      <Header />
      <main className='flex-1 overflow-y-auto  bg-base-200 rounded-b-3xl main_shadow main_glass'>
        <div className='text-3xl pl-4 text-main font-bold' style={{ height: '5%', background: 'white' }}>
          <div className='flex items-center gap-2'>
            {React.cloneElement(currentRoute.icon, { className: 'h-8 w-8' })}
            {currentRoute.name}
          </div>
        </div>
        <Routes>
          {routes.map((route, key) => {
            return <Route key={key} exact={true} path={`${route.path}`} element={<route.component />} />;
          })}
          {/* <Route path='*' element={<Page404 />} /> */}
        </Routes>
      </main>
    </div>
  );
};

export default PageContent;
