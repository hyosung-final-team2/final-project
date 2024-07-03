const BreadCrumbItem = ({ isCurrent, crumbTitle }) => {
  return (
    <li>
      <div className='flex items-center'>
        <svg className='rtl:rotate-180 w-3 h-3 text-gray-400 mx-1' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 6 10'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 9 4-4-4-4' />
        </svg>
        <a
          href='#'
          className={`ms-1 text-sm font-medium ${
            isCurrent ? 'text-gray-500' : 'text-gray-700'
          } hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white`}
        >
          {crumbTitle}
        </a>
      </div>
    </li>
  );
};

export default BreadCrumbItem;
