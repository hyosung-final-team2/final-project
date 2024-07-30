import BreadCrumbItem from './BreadCrumbItem';
import { useLocation } from 'react-router-dom';
import routes from '../../../routes/sidebar';
import useCustomerStore from "../../../store/customerStore.js";

const BreadCrumb = () => {
  const findPathNames = (routes, currentPath) => {
    const pathNames = [];

    const searchRoutes = (routes, currentPath, breadcrumb = []) => {
      for (const route of routes) {
        if (route.path === currentPath) {
          return [...breadcrumb, route.name];
        }

        if (route.submenu) {
          const result = searchRoutes(route.submenu, currentPath, [...breadcrumb, route.name]);
          if (result) {
            return result;
          }
        }
      }
      return null;
    };

    const result = searchRoutes(routes, currentPath);
    if (result) {
      pathNames.push(...result);
    }

    return pathNames;
  };

  const currentPath = useLocation().pathname;
  const names = findPathNames(routes, currentPath);

  const { businessName } = useCustomerStore()
  return (
    <nav className='flex pl-4' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
        <li className='inline-flex items-center'>
          <a href='#' className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'>
            <svg className='w-3 h-3 me-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
              <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
            </svg>
            {businessName}
          </a>
        </li>
        {names.map((item, idx) => {
          return <BreadCrumbItem key={idx} isCurrent={idx === names.length - 1} crumbTitle={item} />;
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
