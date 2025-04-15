"use client";

import { useParams } from "next/navigation";
import products from "@/data/products.json";
import ProductDetails from "@/components/product/ProductDetails";
import ProductsRelated from "@/components/product/ProductsRelated";
import ProductAbout from "@/components/product/ProductAbout";

export default function ProductPage() {
    const params = useParams();
    const product = products.find(p => String(p.id) === params.id);

    if (!product) {
        return <p className="text-center text-red-500 mt-10">Produto não encontrado!</p>;
    }

    const relatedProducts = products.filter(
        p => p.category === product.category && p.id !== product.id
    );

    return (
        <div className="h-full px-6 pt-8 bg-gray-100 dark:bg-[#0c0d0f] space-y-9">
            <ProductDetails product={product} />

            {relatedProducts.length > 0 && (
                <section>
                    <ProductsRelated products={relatedProducts} />
                </section>
            )}

            {product.about && (
                <section>
                    <ProductAbout text={product.about} />
                </section>
            )}
        </div>
    );
}
