import { FaStar, FaRegStar } from "react-icons/fa";

interface RatingStarsProps {
    rating: number;
    total?: number;
    className?: string;
}

const RatingStars = ({ rating, total = 5, className = "" }: RatingStarsProps) => {
    return (
        <div className={`flex items-center ${className}`}>
            {Array.from({ length: total }, (_, i) =>
                i < rating ? (
                    <FaStar key={i} className="text-yellow-500" />
                ) : (
                    <FaRegStar key={i} className="text-gray-400" />
                )
            )}
        </div>
    );
};

export default RatingStars;
