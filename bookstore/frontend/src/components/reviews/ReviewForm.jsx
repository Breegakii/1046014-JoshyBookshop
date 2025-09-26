import { useState, useContext } from 'react';
import reviewsApi from '../../api/reviews';
import RatingStars from '../common/RatingStars';
import AuthContext from '../../context/AuthContext';

const ReviewForm = ({ productId, onReviewSubmit }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear validation error when user types
    if (validationErrors[e.target.name]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: null
      });
    }
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating
    });
    // Clear rating validation error when user selects a rating
    if (validationErrors.rating) {
      setValidationErrors({
        ...validationErrors,
        rating: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (formData.rating === 0) {
      errors.rating = 'Please select a rating';
    }
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Review text is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newReview = await reviewsApi.createProductReview(productId, formData);
      onReviewSubmit(newReview.data);
      setFormData({
        title: '',
        description: '',
        rating: 0
      });
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-blue-50 p-4 rounded-md text-blue-800">
        Please <a href="/login" className="font-semibold hover:underline">sign in</a> to write a review.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating *</label>
          <RatingStars 
            rating={formData.rating} 
            editable={true} 
            onRatingChange={handleRatingChange} 
          />
          {validationErrors.rating && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.rating}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            required
            maxLength="255"
          />
          {validationErrors.title && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">Review *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          ></textarea>
          {validationErrors.description && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.description}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;