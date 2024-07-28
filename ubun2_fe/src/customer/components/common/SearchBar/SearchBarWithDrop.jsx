import {useState, useRef, useEffect} from 'react';
import { initDropdowns } from 'flowbite';
import {columnMapping} from "../Table/tableIndex.js";
import useSkeletonStore from "../../../store/skeletonStore.js";
import useMemberTableStore from "../../../store/MemberTable/memberTableStore.js";

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

const SearchBarWithDrop = ({ tableColumns, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategory, setShowCategory] = useState('카테고리');
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

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(searchTerm, selectedCategory);
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  };

  const {skeletonSearchCategory, skeletonSearchKeyword} = useSkeletonStore()
  const {isReset} = useMemberTableStore()

  const dropdownCategoryScreen = () => {
    if (showCategory !== '카테고리') {
      return showCategory;
    }
    if (skeletonSearchCategory !== null) {
      const categoryKey = getKeyByValue(columnMapping, skeletonSearchCategory);
      return categoryKey || '카테고리';
    }
    return '카테고리';
  };

  const dropdownKeywordScreen = () => {
    if (searchTerm !== '') {
      return searchTerm;
    }
    if (skeletonSearchKeyword !== null) {
      return skeletonSearchKeyword;
    }
    return '';
  };

  useEffect(() => {
    if (skeletonSearchKeyword) {
      setSearchTerm(skeletonSearchKeyword);
    }
  }, [skeletonSearchKeyword]);

  useEffect(() => {
    if (skeletonSearchCategory) {
      setShowCategory(getKeyByValue(columnMapping, skeletonSearchCategory));
    }
  }, [skeletonSearchCategory]);

  useEffect(() => {
    setSearchTerm('')
    setSelectedCategory(null)
    setShowCategory('카테고리')
  }, [isReset]);

  return (
    <form className='max-w-lg mx-auto ' onSubmit={handleSubmit}>
      <div className='flex'>
        <label htmlFor='search-dropdown' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
          Your Email
        </label>
        <button
          ref={dropdownRef}
          id='dropdown-button'
          data-dropdown-toggle='dropdown'
          className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600'
          type='button'
        >
          {dropdownCategoryScreen()}
          <svg className='w-2.5 h-2.5 ms-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
          </svg>
        </button>
        <div id='dropdown' className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'>
          <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdown-button'>
            {tableColumns.map((menu, idx) => {
              return <DropDownMenu key={idx} menuTitle={menu} handleCategorySelect={handleCategorySelect} />;
            })}
          </ul>
        </div>
        <div className='relative w-full'>
          <input
            type='search'
            id='search-dropdown'
            className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300  focus:outline-none dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
            placeholder={ showCategory !== "카테고리" ? 'Search' : '카테고리 선택'}
            required
            value={dropdownKeywordScreen()}
            onChange={handleSearchChange}
          />
          <button
            type='submit'
            className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
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
