const InfoItem = ({ label, value, inputStyle, labelStyle, placeholder, disabled = false, onChange, setIsModalOpen, handleAddressSearch }) => (
  <div className='mx-6'>
    <div className='mb-1'>
      <label htmlFor={label} className={`${labelStyle}`}>
        {label}
      </label>
    </div>
    <input
      className={`${inputStyle} w-full rounded-lg p-3 `}
      defaultValue={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      onFocus={() => {
        setIsModalOpen ? setIsModalOpen(true) : handleAddressSearch;
      }}
    ></input>
  </div>
);

export default InfoItem;
