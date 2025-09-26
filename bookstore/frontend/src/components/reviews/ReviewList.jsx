// ReviewList.jsx
import RatingStars from '../common/RatingStars';

const ReviewList = ({ reviews }) => {
  return (
    <div className="mt-8 space-y-6">
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{review.title}</h3>
                <div className="flex items-center mt-1">
                  <RatingStars rating={review.rating} />
                  <span className="ml-2 text-gray-500 text-sm">{review.username}</span>
                </div>
              </div>
              <span className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</span>
            </div>
            <div className="mt-2">
              <p className="text-gray-700">{review.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;