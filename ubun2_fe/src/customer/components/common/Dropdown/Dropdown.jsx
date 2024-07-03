import { Button } from 'flowbite-react';

const Dropdown = ({ label }) => {
  return (
    <div className='flex border-solid border-gray-300 items-center'>
      <Button color='gray' id='dropdownDefaultButton' data-dropdown-toggle='dropdown' type='button'>
        {label}{' '}
        <svg className='w-2.5 h-2.5 ms-3 self-center' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
        </svg>
      </Button>

      <div id='dropdown' className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'>
        <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDefaultButton'>
          <li>
            <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
              Dashboard
            </a>
          </li>
          <li>
            <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
              Settings
            </a>
          </li>
          <li>
            <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
              Earnings
            </a>
          </li>
          <li>
            <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
