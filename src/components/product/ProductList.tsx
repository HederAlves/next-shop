'use client'

import { useState } from 'react';
import products from '../../data/products.json';
import ProductCard from './ProductCard';
import Pagination from '../layout/Pagination';
import SelectQuantity from '../layout/SelectQuantity';

const ProductList = () => {
    const [itemsToShow, setItemsToShow] = useState<number>(8);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleSelect = (value: number) => {
        setItemsToShow(value);
        setCurrentPage(1);
    };

    const indexOfLastProduct = currentPage * itemsToShow;
    const indexOfFirstProduct = indexOfLastProduct - itemsToShow;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / itemsToShow);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="px-4 pt-6">
            <SelectQuantity
                options={[8, 16, 24]}
                onSelect={handleSelect}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsToShow}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ProductList;
