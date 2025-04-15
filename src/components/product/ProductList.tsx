'use client'

import ProductCard from '@/components/product/ProductCard';
import Pagination from '@/components/ui/navegation/Pagination';

interface ProductListProps {
    products: any[];
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    indexOfFirstProduct: number;
    indexOfLastProduct: number;
    onPageChange: (page: number) => void;
}

const ProductList = ({
    products,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    indexOfFirstProduct,
    indexOfLastProduct,
    onPageChange,
}: ProductListProps) => {
    return (
        <div className="px-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                indexOfFirstProduct={indexOfFirstProduct}
                indexOfLastProduct={indexOfLastProduct}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default ProductList;
