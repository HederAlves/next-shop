import React from 'react';

interface CategorySelectProps {
    categories: string[];
    selected: string;
    onChange: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ categories, selected, onChange }) => {
    return (
        <select
            className="border p-1 mt-[2px] rounded text-[10px] sm:text-xs text-black dark:bg-black dark:text-white"
            value={selected}
            onChange={(e) => onChange(e.target.value)}
        >
            {categories.map((cat) => (
                <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
            ))}
        </select>
    );
};

export default CategorySelect;
