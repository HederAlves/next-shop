'use client'
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

const Header = () => {
    const { cart } = useCart();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800 dark:text-white">
            <Link href="/" passHref>
                <h1 className="text-2xl font-bold cursor-pointer">Next-Shop</h1>
            </Link>

            <Link href="/cart" passHref>
                <div className="relative">
                    <FiShoppingCart size={40} />
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white text-xs bg-red-500 rounded-full">
                            {totalItems}
                        </span>
                    )}
                </div>
            </Link>
        </header>
    );
};

export default Header;
