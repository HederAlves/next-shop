'use client'

import { useState } from "react";

export interface SelectQuantityProps {
  options: number[];
  onSelect: (value: number) => void;
}

const QuantitySelect: React.FC<SelectQuantityProps> = ({ options, onSelect }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setSelected(value);
    onSelect(value);
  };

  return (
    <div>
      <label className="text-xs sm:text-sm mr-2 text-black dark:text-green-600">Mostrar</label>
      <select
        className="border p-1 rounded text-[10px] sm:text-xs text-black dark:bg-black dark:text-white"
        value={selected ?? ""}
        onChange={handlePageSizeChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option} Produtos
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuantitySelect;
