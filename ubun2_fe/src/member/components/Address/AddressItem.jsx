const AddressItem = ({ recipientName, memberAddress, recipientPhone, addressNickname, defaultStatus, handleEdit, handleSelect }) => {
  return (
    <div className='mb-4 bg-white' onClick={handleSelect}>
      <div className='flex mb-2'>
        <h3 className='py-1 mr-2 text-xl font-bold text-black'>{addressNickname}</h3>
        {defaultStatus ? <div className='self-center px-3 py-1 text-xs font-bold text-gray-600 bg-gray-200 rounded-full'>현재 배송지</div> : null}
      </div>
      <p className='text-sm '>{recipientName}</p>
      <p className='text-lg text-gray-500'>{memberAddress}</p>
      <p className='text-gray-500 text-md'>{recipientPhone}</p>
      <a
        href='#'
        className='text-sm text-blue-600'
        onClick={e => {
          e.stopPropagation();
          handleEdit();
        }}
      >
        수정하기
      </a>
    </div>
  );
};

export default AddressItem;
