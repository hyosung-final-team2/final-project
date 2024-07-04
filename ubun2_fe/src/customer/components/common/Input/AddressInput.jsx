const AddressInput = ({ disabled = false, infos, title }) => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md ';

  const handleAddressSearch = async () => {
    if (!disabled) {
      let url = '/customer/address-search';
      // 팝업 window의 크기 지정
      const width = 700;
      const height = 760;
      const features = `width=${width},height=${height}`;
      const popup = window.open(url, '_blank', features);
      popup.postMessage({ key: '1' });
    }
  };
  return (
    <div className='p-3'>
      <h3 className='text-xl font-bold mb-4'>{title}</h3>
      <div className='grid auto-cols-auto gap-4' style={{ gridTemplateColumns: '3fr 5fr 5fr 3fr' }}>
        {infos.map((info, index) => (
          <div className='relative' key={index} onClick={info.label !== '상세주소' ? handleAddressSearch : null}>
            <input
              className='w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700'
              placeholder={info.placeholder}
              defaultValue={info.value}
              disabled={disabled}
            />
            <label className='absolute text-xs text-gray-500 left-3 -top-2 bg-white px-1'>{info.label}</label>
          </div>
        ))}
        <button className={`${commonButtonStyles} bg-custom-button-purple text-custom-font-purple hover:text-white hover:bg-custom-font-purple`}>추가</button>
      </div>
    </div>
  );
};

export default AddressInput;
