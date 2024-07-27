import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchMember } from '../../../api/Address/AddressTable/queris';
import useAddressModalStore from '../../../store/Address/addressModalStore';
import { debounce } from 'lodash';

const SearchableDropdown = ({ onSelect }) => {
  const PAGE_SIZE = 5;

  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setSearchKeyword } = useAddressModalStore();
  const { data: membersData, refetch: refetchMembers } = useSearchMember(1, PAGE_SIZE, 'memberName', searchTerm);

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

  const members = membersData?.data?.data?.content;

  // 디바운스된 검색 함수
  const debouncedSearch = useCallback(
    debounce(term => {
      setSearchKeyword(term);
      if (term.trim() !== '') {
        refetchMembers();
      }
    }, 1000),
    [setSearchKeyword, refetchMembers]
  );

  const handleSearchChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsOpen(term.length > 0);
    debouncedSearch(term);
  };

  const handleSelect = member => {
    onSelect(member);
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
      {isOpen && members?.length > 0 && (
        <div className='absolute z-10 right-0 w-auto min-w-full mt-2 bg-white rounded-lg shadow-lg p-2 border-gray-700'>
          <ul className='py-1 overflow-auto max-h-60'>
            {members.map(member => {
              const selecteMember = {
                memberId: member.memberId,
                name: member.memberName,
                email: member.memberEmail,
                phone: member.memberPhone,
                createdAt: member.createdAt,
              };
              return (
                <li key={member.memberId} className='px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap' onClick={() => handleSelect(selecteMember)}>
                  <div className='flex items-center space-x-4'>
                    <span className='w-24 truncate'>{member.memberName}</span>
                    <span className='w-48 truncate'>{member.memberEmail}</span>
                    <span className='w-32'>{member.memberPhone}</span>
                    <span className='w-24 truncate'>{member.createdAt}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
