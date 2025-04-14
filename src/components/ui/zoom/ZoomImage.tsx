"use client";

import { useState, useRef } from "react";

const ZoomImage = ({ src, alt }: { src: string; alt: string }) => {
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
                        className="fixed top-[105.5px] lg:w-[37vw] lg:h-[452px] lg:pb-8 lg:left-[55.8vw] xl:left-[810px] z-[9999] lg:min-w-[40vw] xl:min-w-[516px] xl:h-[453px] xl:shadow-lg pointer-events-none hidden lg:block p-4 bg-white dark:bg-black rounded-lg"
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
                    className="absolute inset-0 sm:h-90 mt-[87px] md:mt-[20px] xl:mt-[24px] xl:w-[760px] xl:-ml-[166px] z-[10000] lg:min-w-[150px] lg:w-[200px] lg:ml-[35px] flex items-center justify-center"
                    onClick={closeModal}
                >
                    <img
                        src={src}
                        alt={alt}
                        className="w-full lg:min-w-[570px] lg:mr-6 xl:mr-0 max-h-[240px] min-h-[240px] md:max-h-[400px] md:min-h-[400px] lg:max-h-[453px] lg:min-h-[453px] xl:max-h-[500px] xl:min-h-[500px] rounded-lg"
                    />
                </div>
            )}
        </>
    );
};

export default ZoomImage;
