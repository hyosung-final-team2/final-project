import React, { forwardRef } from 'react';

const InfoItem = forwardRef(
  ({ label, value, inputStyle, labelStyle, placeholder, disabled = false, onChange, isSelectable, onFocus, type, maxLength, onInputComplete }, ref) => {
    const handleKeyUp = e => {
      if (maxLength && e.target.value.length >= maxLength && onInputComplete) {
        onInputComplete();
      }
    };

    return (
      <div className='mx-6'>
        <div className='mb-1'>
          <label htmlFor={label} className={`${labelStyle}`}>
            {label}
          </label>
        </div>
        <input
          ref={ref}
          className={`${inputStyle} w-full rounded-lg p-3`}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={isSelectable}
          onChange={onChange}
          onFocus={onFocus}
          onKeyUp={handleKeyUp}
          type={type}
          maxLength={maxLength}
        />
      </div>
    );
  }
);

export default InfoItem;
