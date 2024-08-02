const AddressItem = ({ recipientName, memberAddress, recipientPhone, addressNickname, defaultStatus, handleEdit, handleSelect }) => {
  const [zipNo, ...rest] = memberAddress.split(',');
  const address = rest.join(' ') + ` (${zipNo.trim()})`;
  return (
    <div className='mb-4 bg-white' onClick={handleSelect}>
      <div className='flex mb-2'>
        <h3 className='py-1 mr-2 text-xl font-bold text-black'>{addressNickname}</h3>
        {defaultStatus ? <div className='self-center px-3 py-1 text-xs font-bold text-gray-600 bg-gray-200 rounded-full'>최근 배송지</div> : null}
      </div>
      <p className='text-sm '>{recipientName}</p>
      <p className='text-lg text-gray-500'>{address}</p>
      <p className='text-gray-500 text-md'>{recipientPhone}</p>
      <div
        className='text-sm mt-1 text-blue-600'
        onClick={e => {
          e.stopPropagation();
          handleEdit();
        }}
      >
        수정하기
      </div>
    </div>
  );
};

export default AddressItem;
