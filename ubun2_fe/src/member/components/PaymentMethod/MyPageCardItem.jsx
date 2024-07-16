const MyPageCardItem = ({ card, icon, selected = false, setIsModalOpen, setIsEdit, setSelectedItem }) => {
  const handleOnButtonClick = e => {
    e.stopPropagation();
    setIsEdit(false);
    setIsModalOpen(true);
    setSelectedItem(card);
  };

  const handleOnClick = () => {
    setIsEdit(true);
    setIsModalOpen(true);
    setSelectedItem(card);
  };

  return (
    <div className='flex items-center p-4' onClick={handleOnClick}>
      <div className='mr-5 flex-shrink-0'>{icon}</div>
      <div>
        <p className='text-xl font-bold'>{`${card?.name}카드`}</p>
        <p className='text-md text-gray-500'>{card?.number}</p>
      </div>
      {selected && (
        <div className='right-10 absolute' onClick={handleOnButtonClick}>
          <div className='px-3 py-1 rounded-lg bg-gray-100'>{card.deleteText}</div>
        </div>
      )}
    </div>
  );
};

export default MyPageCardItem;
