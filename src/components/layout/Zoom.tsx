"use client";

import { useState, useRef } from "react";

const ImageZoom = ({ src, alt }: { src: string; alt: string }) => {
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0, visible: false });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!imageRef.current) return;

        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPosition({ x, y, visible: true });
    };

    const handleMouseLeave = () => {
        setZoomPosition({ x: 0, y: 0, visible: false });
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="relative z-50 w-fit">
                {/* Imagem original */}
                <div
                    ref={imageRef}
                    className="relative overflow-hidden cursor-crosshair rounded-lg"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={openModal}
                >
                    <img src={src} alt={alt} className="lg:max-w-[450px] lg:max-h-[370px]" />
                </div>

                {/* Área de Zoom sobreposta */}
                {zoomPosition.visible && (
                    <div
                        className="absolute -top-[33px] left-full ml-7 w-[500px] h-[435px] shadow-lg z-[9999] pointer-events-none hidden md:block p-4 bg-white dark:bg-black rounded-lg"
                    >
                        <div
                            className="w-full h-full bg-no-repeat"
                            style={{
                                backgroundImage: `url(${src})`,
                                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                backgroundSize: "400%",
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Modal para exibir imagem em tamanho maior */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 mt-0 md:mt-[90px] lg:mt-[86px] z-[10000] lg:min-w-[54.8vw] lg:max-w-[54.8vw] h-60 lg:-ml-[16px] flex items-center justify-center"
                    onClick={closeModal}
                >
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-auto max-h-[42vh] min-h-[42vh] md:max-h-[78vh] md:min-h-[78vh] lg:max-h-[84vh] lg:min-h-[84vh] rounded-lg"
                    />
                </div>
            )}
        </>
    );
};

export default ImageZoom;
