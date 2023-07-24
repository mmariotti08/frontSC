import React, { useState } from 'react';
import './CreateReview.css';




const CreateReview = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="create-review-container">
      <h1>Do you want to add a product review?</h1>
      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`star ${value <= (hoverRating || rating) ? 'filled' : ''}`}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleRatingChange(value)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <button className="submit-button">Submit Review</button>
    </div>
  );
};

export default CreateReview;
