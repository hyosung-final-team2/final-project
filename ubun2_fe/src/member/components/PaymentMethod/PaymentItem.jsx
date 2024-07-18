const PaymentItem = ({ icon, title, subtitle, selected = false, checkedIcon, isEdit, onClick }) => (
  <div className='flex items-center p-4 ' onClick={onClick}>
    <div className='mr-5 flex-shrink-0'>{icon}</div>
    <div>
      <div className='flex pb-1'>
        <p className='text-xl font-bold'>{title}</p>
        {isEdit ? <input className='border-b-2 border-main w-4/12 h-1/2 ml-3' /> : ''}
      </div>
      <p className='text-md text-gray-500'>{subtitle}</p>
    </div>
    {selected && <div className='right-10 absolute'>{checkedIcon}</div>}
  </div>
);

export default PaymentItem;
