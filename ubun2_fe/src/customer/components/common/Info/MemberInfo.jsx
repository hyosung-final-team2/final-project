import React, { useState } from 'react';
import SearchableDropdown from '../Dropdown/SearchableDropdown';
import InputLabel from '../Input/InputLabel';

const MemberInfo = ({ member, onlyInfo = true, title, searchable = false }) => {
  const [selectedMember, setSelectedMember] = useState(member);

  const users = [
    { id: 1, name: '홍길동', email: 'own123@naver.com', phone: '010-2471-1256', createdAt: '2024-06-24' },
    { id: 2, name: '박혁거세', email: 'popcovrn123@naver.com', phone: '010-2451-1256', createdAt: '2024-06-24' },
    { id: 3, name: '이순신', email: 'popcoqrn123@naver.com', phone: '010-9451-1256', createdAt: '2024-06-24' },
    { id: 4, name: '주몽', email: 'qpopewrn123@naver.com', phone: '010-2761-1256', createdAt: '2024-06-24' },
    { id: 5, name: '콩길동', email: 'qbsdu@naver.com', phone: '010-5351-5656', createdAt: '2024-06-24' },
    { id: 6, name: '박길동', email: 'pwepcborn123@naver.com', phone: '010-5781-1256', createdAt: '2024-06-24' },
    { id: 7, name: '이길박', email: 'poqwey123@naver.com', phone: '010-9641-1256', createdAt: '2024-06-24' },
    // ... 더 많은 사용자 데이터
  ];

  const handleSelectMember = member => {
    setSelectedMember(member);
  };

  return (
    <div className='p-3'>
      <div className='mb-3 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        {searchable && <SearchableDropdown options={users} onSelect={handleSelectMember} />}
      </div>
      {onlyInfo ? (
        <div className='grid grid-cols-2 gap-6'>
          <InputLabel labelTitle='회원명' defaultValue={selectedMember.name} disabled={onlyInfo} />
          <InputLabel labelTitle='이메일' defaultValue={selectedMember.email} disabled={onlyInfo} />
          <InputLabel labelTitle='전화번호' defaultValue={selectedMember.phone} disabled={onlyInfo} />
          <InputLabel labelTitle='가입일' defaultValue={selectedMember.createdAt} disabled={onlyInfo} />
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-6'>
          <InputLabel labelTitle='회원명' disabled={onlyInfo} />
          <InputLabel labelTitle='이메일' disabled={onlyInfo} />
          <InputLabel labelTitle='전화번호' disabled={onlyInfo} />
          <InputLabel labelTitle='가입일' disabled={onlyInfo} />
        </div>
      )}
    </div>
  );
};

export default MemberInfo;
