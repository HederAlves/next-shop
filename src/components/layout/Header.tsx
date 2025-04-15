'use client'

import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/contexts/CartContext';
import ThemeToggle from '@/components/ui/button/ThemeToggle';
import ProductSearchInput from '@/components/ui/filter/SearchInput';

const Header = () => {
    const { cart } = useCart();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="flex flex-col sm:flex-row items-center justify-between gap-2 p-4 shadow-md 
            bg-gradient-to-r
            from-black via-green-500 to-green-400 
            dark:from-black dark:via-green-900 dark:to-black dark:text-white">
            <Link href="/" passHref>
                <h1 className="text-2xl font-bold cursor-pointer text-white">Next-Shop</h1>
            </Link>
            <ProductSearchInput />
            <div className='flex justify-around w-full sm:w-auto sm:gap-2 md:gap-8 items-center sm:mr-2'>
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
