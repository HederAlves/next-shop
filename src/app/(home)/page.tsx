'use client'

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import products from '@/data/products.json';
import QuantitySelect from '@/components/ui/filter/QuantitySelect';
import CategorySelect from '@/components/ui/filter/CategorySelect';
import ProductList from '@/components/product/ProductList';

const HomePage = () => {
    const [itemsToShow, setItemsToShow] = useState<number>(8);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('todos');
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('search')?.toLowerCase() || '';

    const categories = ['todos', ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => selectedCategory === 'todos' || p.category === selectedCategory)
            .filter(p => !searchTerm || p.name.toLowerCase().includes(searchTerm));
    }, [selectedCategory, searchTerm]);

    const indexOfLastProduct = currentPage * itemsToShow;
    const indexOfFirstProduct = indexOfLastProduct - itemsToShow;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / itemsToShow);
    const totalItems = filteredProducts.length;

    const handleSelect = (value: number) => {
        setItemsToShow(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="min-h-screen px-6 pb-0 bg-gray-100 dark:bg-[#0c0d0f] dark:text-white">
            <div className="flex justify-between items-center px-4 pt-4">
                <QuantitySelect
                    options={[8, 16, 24]}
                    onSelect={handleSelect}
                />
                <CategorySelect
                    categories={categories}
                    selected={selectedCategory}
                    onChange={(value) => {
                        setSelectedCategory(value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <ProductList
                products={currentProducts}
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsToShow}
                totalItems={totalItems}
                indexOfFirstProduct={indexOfFirstProduct}
                indexOfLastProduct={indexOfLastProduct}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default HomePage;
