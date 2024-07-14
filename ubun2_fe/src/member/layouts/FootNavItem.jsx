import React from 'react';
import { useLocation } from 'react-router-dom';

const NavItem = ({ isSelected, IconSelected, IconUnselected, label, onClick }) => {
  const location = useLocation();
  const pathList = location.pathname.split('/');

  return (
    <div className='flex flex-col justify-center items-center' onClick={onClick}>
      {isSelected ? (
        <>
          <IconSelected className='w-5 h-5' />
          <div className='text-sm'>{label}</div>
        </>
      ) : (
        <>
          <IconUnselected className='w-5 h-5' />
          <div className='text-gray-400 text-sm'>{label}</div>
        </>
      )}
    </div>
  );
};

export default NavItem;
