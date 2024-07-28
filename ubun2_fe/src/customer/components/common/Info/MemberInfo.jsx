import React, { useState } from 'react';
import SearchableDropdown from '../Dropdown/SearchableDropdown';
import InputLabel from '../Input/InputLabel';
import useAddressModalStore from '../../../store/Address/addressModalStore';
import useAddressStore from '../../../store/Address/useAddressStore';

const MemberInfo = ({ member, onlyInfo = true, title, searchable = false }) => {
  const { setSelectedMember, selectedMember } = useAddressModalStore();
  const { setSelectedMemberId } = useAddressStore();

  const handleSelectMember = member => {
    setSelectedMember(member);
    setSelectedMemberId(member.memberId);
  };

  return (
    <div className='p-3'>
      <div className='mb-3 flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-main'>{title}</h1>
        {searchable && <SearchableDropdown onSelect={handleSelectMember} />}
      </div>
      {onlyInfo ? (
        <div className='grid grid-cols-2 gap-3'>
          <InputLabel labelTitle='회원명' defaultValue={member ? member.name : selectedMember?.name} disabled={onlyInfo} />
          <InputLabel labelTitle='이메일' defaultValue={member ? member.email : selectedMember?.email} disabled={onlyInfo} />
          <InputLabel labelTitle='전화번호' defaultValue={member ? member.phone : selectedMember?.phone} disabled={onlyInfo} />
          <InputLabel labelTitle='가입일' defaultValue={member ? member.createdAt : selectedMember?.createdAt?.split('T')[0]} disabled={onlyInfo} />
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-3'>
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
