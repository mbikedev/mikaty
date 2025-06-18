import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 5, starSize = "h-5 w-5" }) => (
  <div className="flex items-center">
    {[...Array(rating)].map((_, i) => (
      <Star key={i} className={`${starSize} text-yellow-400 fill-yellow-400 mr-0.5`} />
    ))}
  </div>
);

export default StarRating;