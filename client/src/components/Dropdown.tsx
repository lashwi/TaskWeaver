import { useState } from 'react';

interface Props {
  options: string[];
  onChange: (value: string) => void;
  curValue: string;
}

export default function Dropdown({ options, onChange, curValue }: Props) {
  const [selectedValue, setSelectedValue] = useState(curValue || options[0]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <select
      className="border-2 border-surface-150 rounded-md p-1 h-full"
      value={selectedValue}
      onChange={handleSelectChange}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
