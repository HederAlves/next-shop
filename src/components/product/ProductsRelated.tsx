import { Product } from "@/models/interfaces";
import CarouselCards from "@/components/ui/carousel/CarouselCards";

interface RelatedProductsProps {
    products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
    if (!products.length) return null;

    return (
        <div className="mt-6 xl:mt-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-green-600 mb-4 ml-4">
                Produtos Relacionados
            </h2>
            <CarouselCards products={products} autoPlay={true} interval={4000} />
        </div>
    );
};

export default RelatedProducts;
