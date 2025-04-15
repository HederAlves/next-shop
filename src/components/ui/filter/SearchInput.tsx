import { useState } from 'react';
import { useRouter } from 'next/navigation';
import productsData from '@/data/products.json';

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const router = useRouter();

    const filteredSuggestions = searchTerm.trim()
        ? Array.from(
            new Map(
                productsData
                    .filter((product) =>
                        product.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((product) => [product.name, product])
            ).values()
        ).slice(0, 4)
        : [];

    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        router.push(`/?search=${encodeURIComponent(searchTerm.trim())}`);
        setShowSuggestions(false);
        setSearchTerm('');
    };

    const handleSelectSuggestion = (name: string) => {
        setSearchTerm(name);
        setShowSuggestions(false);
        router.push(`/?search=${encodeURIComponent(name)}`);
    };

    return (
        <div className="relative w-full max-w-xs">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar produto..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => {
                        if (searchTerm.trim()) setShowSuggestions(true);
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSearch();
                        }
                    }}
                    className="w-full px-4 py-2 bg-white dark:bg-black text-black dark:text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 font-semibold"
                >
                    Buscar
                </button>
            </div>

            {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="absolute left-0 right-0 bg-white dark:bg-black text-black dark:text-white border border-gray-300 mt-1 rounded-md shadow-lg z-[800] max-h-60 overflow-y-auto">
                    {filteredSuggestions.map((product) => (
                        <li
                            key={product.id}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer"
                            onClick={() => handleSelectSuggestion(product.name)}
                        >
                            {product.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
