import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, getProductReviews } from '../api/products';
import ProductDetail from '../components/products/ProductDetail';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { FiArrowLeft } from 'react-icons/fi';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productRes, reviewsRes] = await Promise.all([
          getProduct(id),
          getProductReviews(id, { page: 1 })
        ]);
        setProduct(productRes.data);
        setReviews(reviewsRes.data.results);
        setPagination({
          count: reviewsRes.data.count,
          next: reviewsRes.data.next,
          previous: reviewsRes.data.previous
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const loadMoreReviews = async () => {
    if (!pagination.next) return;
    
    try {
      setReviewsLoading(true);
      const response = await fetch(pagination.next);
      const data = await response.json();
      
      setReviews(prev => [...prev, ...data.results]);
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous
      });
    } catch (error) {
      console.error('Error loading more reviews:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleReviewSubmit = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
    // Update count when new review is added
    setPagination(prev => ({ 
      ...prev, 
      count: prev.count + 1 
    }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FiArrowLeft className="mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:sticky lg:top-4 lg:h-fit">
          <ProductDetail product={product} />
        </div>
        
        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <ReviewForm productId={id} onReviewSubmit={handleReviewSubmit} />
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Reviews ({pagination.count})</h2>
              {reviews.length > 0 && (
                <div className="text-sm text-gray-500">
                  Showing {reviews.length} of {pagination.count}
                </div>
              )}
            </div>
            
            <ReviewList reviews={reviews} />
            
            {pagination.next && (
              <div className="mt-6 text-center">
                <Button
                  onClick={loadMoreReviews}
                  loading={reviewsLoading}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Load More Reviews
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;