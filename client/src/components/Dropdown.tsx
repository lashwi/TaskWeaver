import React, { useState } from 'react';

// Define the props for the dropdown component
interface DropdownProps {
  options: string[];
  onChange: (value: string) => void;
}

// The Dropdown component
const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  // State for the selected value
  const [selectedValue, setSelectedValue] = useState(options[0] || '');

  // Function to call when the value changes
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <select value={selectedValue} onChange={handleSelectChange} style={{backgroundColor:'lightgray',margin:"2px", width:"120px"} }>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
