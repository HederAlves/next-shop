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
                <div
                    ref={imageRef}
                    className="relative overflow-hidden cursor-crosshair rounded-lg"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={openModal}
                >
                    <img src={src} alt={alt} className="h-[300px] md:h-[400px] lg:h-[404px] max-w-[200px] sm:max-w-[555px] md:max-w-[56vw] max-h-[140px] lg:max-w-[380px] xl:max-w-[574px] md:max-h-[430px]" />
                </div>

                {zoomPosition.visible && (
                    <div
                        className="fixed -top-4 lg:w-[37vw] lg:h-[452px] lg:pb-8 lg:left-[52vw] xl:left-[770px] z-[9999] lg:min-w-[38.5vw] xl:min-w-[500px] xl:h-[453px] xl:shadow-lg pointer-events-none hidden lg:block p-4 bg-white dark:bg-black rounded-lg"
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

            {isModalOpen && (
                <div
                    className="fixed inset-0 sm:h-90 -mt-[16px] -md:mt-[20px] xl:mt-[1px] z-[10000] lg:min-w-[55.2vw] lg:max-w-[54.8vw] lg:-ml-[16px] flex items-center justify-center"
                    onClick={closeModal}
                >
                    <img
                        src={src}
                        alt={alt}
                        className="w-full lg:min-w-[580px] lg:mr-6 xl:mr-0 max-h-[240px] min-h-[240px] md:max-h-[450px] md:min-h-[450px] lg:max-h-[453px] lg:min-h-[453px] xl:max-h-[500px] xl:min-h-[500px] rounded-lg"
                    />
                </div>
            )}
        </>
    );
};

export default ImageZoom;
