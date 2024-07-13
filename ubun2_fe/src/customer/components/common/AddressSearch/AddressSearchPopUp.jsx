import React, { useState, useCallback } from 'react';
import { Card, TextInput, Badge } from 'flowbite-react';
import fetchAddressData from '../../../api/addressApi';
import debounce from 'lodash/debounce';
import TablePagination from '../Pagination/TablePagination';

const AddressSearchPopUp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const resultsPerPage = 5;

  const debouncedFetchAddress = useCallback(
    //여러번 반복 실행될 경우, 정해진 지연시간동안 마지막에 딱 1번만 호출.
    debounce(async term => {
      if (term.length < 2) return; // 최소 2글자 이상일 때만 검색
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
  // 팝업 창이 열릴 때 주소를 고정
  window.addEventListener('load', () => {
    const originalURL = window.location.href;

    const preventNavigation = event => {
      if (window.location.href !== originalURL) {
        window.location.href = originalURL;
      }
    };

    window.addEventListener('popstate', preventNavigation);
    window.addEventListener('hashchange', preventNavigation);
    window.addEventListener('beforeunload', () => {
      window.removeEventListener('popstate', preventNavigation);
      window.removeEventListener('hashchange', preventNavigation);
    });
  });

  // postData 함수는 그대로 유지
  const postData = result => {
    // 부모로 데이터 전송
    console.log(window.opener);
    window.opener.postMessage({ type: 'ADDRESS_SELECTED', result }, '*');
    window.close();
  };

  return (
    <div className='m-7 mt-9'>
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
      {searchResults.length > resultsPerPage && (
        <div className='flex overflow-x-auto sm:justify-center mt-4'>
          <TablePagination totalPages={3} />
        </div>
      )}
    </div>
  );
};

export default AddressSearchPopUp;
