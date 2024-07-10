import { Pagination } from 'flowbite-react';
import { custumPaginationTheme } from './PaginationStyle';

const TablePagination = ({ totalPages, currentPage, setCurrentPage, containerStyle }) => {

  const onPageChange = page => setCurrentPage(page);

  const handelPageDown = () => {
    if (currentPage === 1) {
      return;
    }

    setCurrentPage(currentPage - 1);
  };

  const handlePageUp = () => {
    if (currentPage === totalPages) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={`flex overflow-x-auto items-center sm:justify-center ${containerStyle}`}>
      {/* left arrow */}
      {totalPages === 1 ? null : (
        <svg
          className={currentPage === 1 ? 'mt-2' : 'cursor-pointer mt-2'}
          onClick={handelPageDown}
          width='35px'
          height='35px'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
          <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
          <g id='SVGRepo_iconCarrier'>
            {' '}
            <path
              d='M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z'
              fill={currentPage === 1 ? '#9DA1A7' : '#0F0F0F'}
            ></path>{' '}
          </g>
        </svg>
      )}

      {/* pagination */}
      <Pagination theme={custumPaginationTheme} currentPage={currentPage || 1} totalPages={totalPages} onPageChange={onPageChange} />

      {/* right arrow  */}
      {totalPages === 1 ? null : (
        <svg
          className={currentPage === totalPages ? 'mt-2' : 'cursor-pointer mt-2'}
          onClick={handlePageUp}
          width='35px'
          height='35px'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          transform='rotate(180)'
        >
          <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
          <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
          <g id='SVGRepo_iconCarrier'>
            {' '}
            <path
              d='M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z'
              fill={currentPage === totalPages ? '#9DA1A7' : '#0F0F0F'}
            ></path>{' '}
          </g>
        </svg>
      )}
    </div>
  );
};
export default TablePagination;
