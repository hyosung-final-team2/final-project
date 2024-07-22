import React, { useState, useCallback } from 'react';
import { TextInput, Badge } from 'flowbite-react';
import fetchAddressData from '../../api/addressApi';
import debounce from 'lodash/debounce';
import useAddressStore from '../../store/address/AddressStore';
import { useNavigate } from 'react-router-dom';

const AddressSearchMobilePopUp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { setSelectedAddress, setAddressData } = useAddressStore();
  const navigate = useNavigate();

  const debouncedFetchAddress = useCallback(
    debounce(async term => {
      if (term.length < 2) return;
      try {
        const data = await fetchAddressData(term);
        if (data && data.results && data.results.juso) {
          setSearchResults(data.results.juso);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('주소 검색 중 오류 발생:', error);
        setSearchResults([]);
      }
    }, 300),
    []
  );

  const handleChange = e => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    setTimeout(() => debouncedFetchAddress(newTerm), 100);
  };

  const postData = result => {
    setSelectedAddress(result);
    setAddressData(prevData => ({
      ...prevData,
      address: result.roadAddr,
    }));
    navigate(-1);
  };

  return (
    <div className='p-7 pt-9 bg-white h-full border-x'>
      <h5 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-3'>주소 검색</h5>
      <div className='mb-4'>
        <TextInput id='address' type='text' placeholder='도로명, 지번, 건물명 검색' value={searchTerm} onChange={handleChange} />
      </div>

      {searchResults.length > 0 ? (
        <div className='border-b pl-1 pb-3'>
          {searchTerm} 검색결과 ({searchResults.length}건)
        </div>
      ) : (
        ''
      )}
      {!searchTerm && (
        <div className='p-3'>
          <div className='text-custom-font-purple text-xl font-semibold pb-2'>검색 예시</div>
          <div className='text-md'>- 도로명 + 건물번호</div>
          <div className='text-md text-gray-400 pb-3'>예) 광평로 281, 창경궁로 254</div>
          <div className='text-md'>- 동/읍/면/리 + 번지</div>
          <div className='text-md text-gray-400'>예) 수서동 715, 명륜2가 41-4</div>
        </div>
      )}
      {searchResults.length > 0
        ? searchResults.map((result, index) => (
            <div className='border-b p-2 hover:bg-gray-100 cursor-pointer pl-3 py-3' key={index} onClick={() => postData(result)}>
              <h6 className='text-lg font-semibold'>{result.zipNo}</h6>
              <div className='flex text-sm text-gray-900 my-2'>
                <Badge color='indigo' size='lg'>
                  도로명
                </Badge>
                <div className='ml-2'>{result.roadAddr}</div>
              </div>
              <div className='flex text-sm text-gray-600 my-2'>
                <Badge color='gray' size='lg'>
                  구주소
                </Badge>

                <div className='ml-2'>{result.jibunAddr}</div>
              </div>
            </div>
          ))
        : searchTerm.length > 1 && <p className='mt-4'>검색 결과가 없습니다.</p>}
    </div>
  );
};

export default AddressSearchMobilePopUp;
