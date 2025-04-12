import { useEffect } from "react";

export const useAutoPlay = ({
    enabled,
    interval,
    totalPages,
    onTick,
}: {
    enabled: boolean;
    interval: number;
    totalPages: number;
    onTick: () => void;
}) => {
    useEffect(() => {
        if (!enabled || totalPages <= 1) return;

        const timer = setInterval(onTick, interval);
        return () => clearInterval(timer);
    }, [enabled, interval, totalPages, onTick]);
};
