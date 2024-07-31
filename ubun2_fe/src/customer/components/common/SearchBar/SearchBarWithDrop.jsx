import { initDropdowns } from 'flowbite';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Datepicker from 'react-tailwindcss-datepicker';
import { errorToastStyle } from '../../../../member/api/toastStyle.js';
import useMemberTableStore from '../../../store/MemberTable/memberTableStore.js';
import { columnMapping } from '../Table/tableIndex.js';

const priceInputStyle =
  'p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

const categoryGroups = {
  date: ['createdAt'],
  range: ['totalCost', 'productPrice', 'stockQuantity', 'productDiscount'],
};

const DropDownMenu = ({ menuTitle, handleCategorySelect }) => {
  return (
    <li>
      <button
        onClick={() => handleCategorySelect(menuTitle)}
        type='button'
        className='inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
      >
        {menuTitle}
      </button>
    </li>
  );
};

const PriceRangeInput = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
    onPriceChange(min, max);
  };

  return (
    <div className='relative flex items-center w-full gap-1 ml-3'>
      <input
        type='number'
        placeholder='최소값'
        value={minPrice}
        onChange={e => handlePriceChange(e.target.value, maxPrice)}
        className={priceInputStyle}
        min={0}
      />
      <span>-</span>
      <input
        type='number'
        placeholder='최대값'
        value={maxPrice}
        onChange={e => handlePriceChange(minPrice, e.target.value)}
        className={priceInputStyle}
        min={0}
      />
    </div>
  );
};

const SearchBarWithDrop = ({ tableColumns, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategory, setShowCategory] = useState('카테고리');
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const dropdownRef = useRef(null);

  initDropdowns();

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleCategorySelect = category => {
    const mappedCategory = columnMapping[category] || category;
    setSelectedCategory(mappedCategory);
    setShowCategory(category);
    dropdownRef.current.click();
  };

  const formatDate = date => {
    if (!date) return null;
    const [year, month, day] = date.split('-');
    return `${year}-${month}-${day}`;
  };

  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let searchValue;

    if (categoryGroups.date.includes(selectedCategory)) {
      if (dateRange.startDate || dateRange.endDate) {
        const formattedStartDate = formatDate(dateRange.startDate);
        const formattedEndDate = formatDate(dateRange.endDate);

        if (formattedStartDate && formattedEndDate) {
          searchValue = `${formattedStartDate},${formattedEndDate}`;
        } else if (formattedStartDate) {
          const currentDate = new Date().toISOString().split('T')[0];
          searchValue = `${formattedStartDate},${currentDate}`;
        } else if (formattedEndDate) {
          const pastDate = '1970-01-01';
          searchValue = `${pastDate},${formattedEndDate}`;
        }
      } else {
        toast.error('최소한 하나의 날짜를 선택해주세요.', errorToastStyle);
        return;
      }
    } else if (categoryGroups.range.includes(selectedCategory)) {
      const MIN_VALUE = '0';
      const MAX_VALUE = '1000000000'; // Long.MAX_VALUE in Java

      if (priceRange.min === '' && priceRange.max === '') {
        toast.error('최소한 하나의 값을 입력해주세요.', errorToastStyle);
        return;
      }

      let min = priceRange.min !== '' ? priceRange.min : MIN_VALUE;
      let max = priceRange.max !== '' ? priceRange.max : MAX_VALUE;

      searchValue = `${min},${max}`;
    } else {
      searchValue = searchTerm;
    }

    onSearch(searchValue, selectedCategory);
  };

  const { isReset } = useMemberTableStore();

  useEffect(() => {
    setSearchTerm('');
    setSelectedCategory(null);
    setShowCategory('카테고리');
    setPriceRange({ min: '', max: '' });
    setDateRange({ startDate: null, endDate: null });
  }, [isReset]);

  const renderSearchInput = () => {
    if (categoryGroups.date.includes(selectedCategory)) {
      return (
        <div className='ml-3'>
          <Datepicker
            i18n='ko'
            value={dateRange}
            theme={'light'}
            inputClassName='input input-bordered w-72'
            toggleClassName='invisible'
            onChange={newValue => setDateRange(newValue)}
            showShortcuts={true}
            primaryColor={'white'}
            configs={{
              shortcuts: { today: '오늘', yesterday: '어제', past: p => `${p}일 전`, pastMonth: '저번달', currentMonth: '이번달' },
            }}
            asSingle={false}
            useRange={true}
          />
        </div>
      );
    } else if (categoryGroups.range.includes(selectedCategory)) {
      return <PriceRangeInput onPriceChange={handlePriceChange} />;
    } else {
      return (
        <input
          type='search'
          id='search-dropdown'
          className={`block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:outline-none dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 ${
            !categoryGroups.date.includes(selectedCategory) && !categoryGroups.range.includes(selectedCategory) ? 'rounded-s-lg' : ''
          }`}
          placeholder={showCategory !== '카테고리' ? 'Search' : '카테고리 선택'}
          required
          disabled={showCategory === '카테고리'}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      );
    }
  };

  return (
    <form className='max-w-lg mx-auto' onSubmit={handleSubmit}>
      <div className='flex'>
        <button
          ref={dropdownRef}
          id='dropdown-button'
          data-dropdown-toggle='dropdown'
          className={`flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 ${
            !categoryGroups.date.includes(selectedCategory) && !categoryGroups.range.includes(selectedCategory) ? 'rounded-s-lg' : 'rounded-lg'
          }`}
          type='button'
        >
          {showCategory}
          <svg className='w-2.5 h-2.5 ms-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
          </svg>
        </button>
        <div id='dropdown' className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'>
          <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdown-button'>
            {tableColumns.map((menu, idx) => (
              <DropDownMenu key={idx} menuTitle={menu} handleCategorySelect={handleCategorySelect} />
            ))}
          </ul>
        </div>
        <div className='relative w-full'>
          {renderSearchInput()}
          <button
            type='submit'
            className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            <svg className='w-4 h-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
            </svg>
            <span className='sr-only'>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBarWithDrop;
