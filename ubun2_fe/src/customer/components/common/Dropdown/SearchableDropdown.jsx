import React, { useState, useEffect, useRef } from 'react';

const SearchableDropdown = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = options.filter(option => option.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredOptions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredOptions([]);
      setIsOpen(false);
    }
  }, [searchTerm, options]);

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = option => {
    onSelect(option);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <input
        type='text'
        className='w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:ring'
        placeholder='회원 검색'
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {isOpen && filteredOptions.length > 0 && (
        <div className='absolute z-10 right-0 w-auto min-w-full mt-2 bg-white rounded-lg shadow-lg p-2 border-gray-700'>
          <ul className='py-1 overflow-auto max-h-60'>
            {filteredOptions.map(option => (
              <li key={option.id} className='px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap' onClick={() => handleSelect(option)}>
                <div className='flex items-center space-x-4'>
                  <span className='w-24 truncate'>{option.name}</span>
                  <span className='w-48 truncate'>{option.email}</span>
                  <span className='w-32'>{option.phone}</span>
                  <span className='w-24 truncate'>{option.createdAt}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
