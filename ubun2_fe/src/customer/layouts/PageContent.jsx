import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import routes from '../routes';

const PageContent = () => {
  return (
    <div className='drawer-content flex flex-col py-7 px-4 main_bg_page'>
      <Header />
      <main className='flex-1 overflow-y-auto md:pt-4 py-4 px-6  bg-base-200 rounded-b-3xl main_shadow main_glass'>
        <Routes>
          {routes.map((route, key) => {
            return <Route key={key} exact={true} path={`${route.path}`} element={<route.component />} />;
          })}
          {/* <Route path='*' element={<Page404 />} /> */}
        </Routes>

        <div className='h-16'></div>
      </main>
    </div>
  );
};

export default PageContent;
