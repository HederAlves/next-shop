'use client'

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const { cart } = useCart();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="flex items-center justify-between p-4 shadow-md 
            bg-gradient-to-r
          from-black via-green-500 to-green-400 
          dark:from-black dark:via-green-900 dark:to-black dark:text-white">
            <Link href="/" passHref>
                <h1 className="text-2xl font-bold cursor-pointer text-white">Next-Shop</h1>
            </Link>

            <div className=' flex gap-2 sm:gap-10 items-center mr-2'>
                <ThemeToggle />
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
            </div>
        </header>
    );
};

export default Header;
