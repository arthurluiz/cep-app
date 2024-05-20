import React from 'react';
import './index.css'

interface InputFormProps {
  value: string;
  onChange: (newValue: string) => void;
}

const InputForm = ({ value, onChange }: InputFormProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div className="input-container">
      <input
        defaultValue={value}
        type="text"
        onBlur={handleInputChange}
        className="input-field"
      />
    </div>
  );
}

export default InputForm;
