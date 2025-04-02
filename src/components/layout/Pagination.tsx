import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, itemsPerPage, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center justify-between bg-gray-100 dark:bg-[#0c0d0f] mt-2 py-3">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={handlePrevious}
                    className="relative w-6/12 text-center items-center rounded-md border border-black px-4 py-2 text-sm font-medium 
                    bg-gradient-to-r 
                    from-green-500 via-green-500 to-green-500
                    dark:from-black dark:via-green-900 dark:to-black
                    hover:from-green-900 hover:via-green-900 hover:to-green-900
                    dark:hover:from-green-900 dark:hover:via-green-900 dark:hover:to-green-900
                      focus:outline-none text-white"
                >
                    Anterior
                </button>
                <button
                    onClick={handleNext}
                    className="relative ml-3 w-6/12 text-center items-center rounded-md border border-black px-4 py-2 text-sm font-medium 
                    bg-gradient-to-r 
                    from-green-500 via-green-500 to-green-500
                    dark:from-black dark:via-green-900 dark:to-black
                    hover:from-green-900 hover:via-green-900 hover:to-green-900
                    dark:hover:from-green-900 dark:hover:via-green-900 dark:hover:to-green-900
                      focus:outline-none  text-white"
                >
                    Próxima
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm pl-1 flex gap-1 text-gray-700 dark:text-green-600">
                        Mostrando do <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>ao{' '}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalPages * itemsPerPage)}</span> de{' '}
                        <span className="font-medium">{totalPages * itemsPerPage}</span> produtos
                    </p>

                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs dark:hover:text-black" aria-label="Pagination">
                        <button
                            onClick={handlePrevious}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 dark:text-white hover:dark:text-black ring-1 ring-gray-300 dark:ring-white ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only bg-">Anterior</span>
                            <svg className="w-5 h-5" fill="currentColor" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`relative inline-flex items-center px-4 py-2 dark:text-white text-sm font-semibold text-gray-900 ring-1 ring-gray-300 dark:ring-white ring-inset hover:bg-gray-50 dark:hover:text-black focus:z-20 focus:outline-offset-0 ${currentPage === page
                                    ? 'bg-blue-500 dark:bg-blue-800 text-white hover:text-black dark:hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                    : ''
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={handleNext}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 dark:text-white hover:dark:text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Próxima</span>
                            <svg className="w-5 h-5" fill="currentColor" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
