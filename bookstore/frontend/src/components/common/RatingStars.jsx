import { useState } from 'react';

const RatingStars = ({ rating = 0, editable = false, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleClick = (value) => {
    if (editable && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (editable) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = hoverRating ? star <= hoverRating : star <= rating;
        return (
          <button
            key={star}
            type="button"
            className={`text-2xl ${filled ? 'text-yellow-400' : 'text-gray-300'} ${editable ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={!editable}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;