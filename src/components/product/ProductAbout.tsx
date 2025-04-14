interface ProductAboutProps {
    text: string;
}

const ProductAbout = ({ text }: ProductAboutProps) => {
    return (
        <div className="p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-green-600 mb-4">
                Sobre este produto
            </h2>
            <p className="text-gray-700 dark:text-white">
                {text}
            </p>
        </div>
    );
};

export default ProductAbout;
