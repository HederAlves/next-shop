"use client";

import { ReactNode, useState } from "react";

interface ModalProps {
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="absolut w-[500px]">
            {/* Botão para abrir o modal */}
            <div onClick={() => setIsOpen(true)} className="cursor-pointer">
                {children}
            </div>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setIsOpen(false)} // Fecha ao clicar no fundo
                >
                    <div
                        className="bg-white p-4 rounded-lg max-w-3xl relative"
                        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal feche ele
                    >
                        {/* Botão Fechar */}
                        <button
                            className="absolute top-2 right-2 text-xl"
                            onClick={() => setIsOpen(false)}
                        >
                            &times;
                        </button>
                        {/* Conteúdo do modal */}
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
