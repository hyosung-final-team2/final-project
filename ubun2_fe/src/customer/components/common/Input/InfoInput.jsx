const InfoInput = ({ disabled = false, infos }) => {
  const handleAddressSearch = async () => {
    if (!disabled) {
      let url = '/address-search';
      // 팝업 window의 크기 지정
      const width = 700;
      const height = 760;
      const features = `width=${width},height=${height}`;
      const popup = window.open(url, '_blank', features);
      popup.postMessage({ key: '1' });
    }
  };
  return (
    <>
      <div className='p-3'>
        <h2 className='text-2xl font-bold mb-4'>주소</h2>
        <div className='grid grid-cols-3 gap-4'>
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
        </div>
      </div>
    </>
  );
};

export default InfoInput;
