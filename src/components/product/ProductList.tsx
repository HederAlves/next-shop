'use client'

import { useState } from 'react';
import products from '../../data/products.json';
import ProductCard from './ProductCard';
import Pagination from '../layout/Pagination';
import SelectQuantity from '../layout/SelectQuantity';

const ProductList = () => {
    // Estado para controlar o número de produtos a serem exibidos por página
    const [itemsToShow, setItemsToShow] = useState<number>(8);  // Valor inicial 8
    const [currentPage, setCurrentPage] = useState<number>(1); // Página inicial é 1

    // Função para manipular a seleção de quantidade de itens
    const handleSelect = (value: number) => {
        setItemsToShow(value);
        setCurrentPage(1);  // Resetar para a primeira página sempre que a quantidade de itens mudar
    };

    // Calcular os índices de início e fim para a exibição dos produtos
    const indexOfLastProduct = currentPage * itemsToShow;
    const indexOfFirstProduct = indexOfLastProduct - itemsToShow;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Total de páginas, baseado na quantidade total de produtos e na quantidade de itens por página
    const totalPages = Math.ceil(products.length / itemsToShow);

    // Função para alterar a página
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
