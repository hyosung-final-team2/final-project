import React from 'react';

const CardItem = ({ logo, name, setSelectedItem, setIsModalOpen, path }) => {
  const handleItemSelect = item => {
    setSelectedItem(item);
    setIsModalOpen(false);
  };
  return (
    <div className='flex flex-col items-center justify-center p-4 rounded-xl bg-gray-100' onClick={() => handleItemSelect(name)}>
      <img className='h-10 w-10' src={`/src/assets/images/png/${path}`} alt='' />

      <span className='text-sm font-medium mt-3'>{name}</span>
    </div>
  );
};

export default CardItem;
