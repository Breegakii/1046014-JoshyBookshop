import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../api/products';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import HeroSection from '../components/home/HeroSection';
import FeaturedCategories from '../components/home/FeaturedCategories';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        getProducts({paginate: false}),
        getCategories()
      ]);
      setProducts(productsRes.data.slice(0, 4));
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Categories */}
      <FeaturedCategories 
        categories={categories} 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Section Title */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedCategory 
              ? `${categories.find(c => c.id === selectedCategory)?.title} Books`
              : 'Featured Books'}
          </h2>
          {selectedCategory && (
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-blue-600 hover:underline font-medium"
            >
              View All Books →
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Products Grid */}
        {!loading && (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No books found in this category.</p>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse All Books
                </button>
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Can't find what you're looking for?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            We're constantly adding new titles to our collection. Contact us if you're searching for something specific.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="inline-block px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Full Catalogue
            </Link>
            <Link 
              to="/contact" 
              className="inline-block px-8 py-4 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;