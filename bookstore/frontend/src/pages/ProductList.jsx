/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../api/products';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import SearchBar from '../components/common/SearchBar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null
  });
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get all current filters from URL
  const currentFilters = {
    page: parseInt(searchParams.get('page')) || 1,
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    ordering: searchParams.get('ordering') || 'title',
    inStock: searchParams.get('inStock') === 'true'
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories if not already loaded
        if (categories.length === 0) {
          const categoriesRes = await getCategories();
          setCategories(categoriesRes.data);
        }

        // Build query params from all current filters
        const params = {
          page: currentFilters.page,
          category: currentFilters.category || undefined,
          search: currentFilters.search || undefined,
          ordering: currentFilters.ordering,
          in_stock: currentFilters.inStock || undefined
        };

        const productsRes = await getProducts(params);
        setProducts(productsRes.data.results);
        setPagination({
          count: productsRes.data.count,
          next: productsRes.data.next,
          previous: productsRes.data.previous
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams, categories.length]); // Watch searchParams for all changes

  const handleFilterChange = (updatedFilters) => {
    // Merge new filters with existing ones and reset to page 1
    const newParams = {
      ...Object.fromEntries(searchParams),
      ...updatedFilters,
      page: 1 // Reset to first page when filters change
    };
    
    // Remove any undefined or empty values
    Object.keys(newParams).forEach(key => {
      if (newParams[key] === '' || newParams[key] === undefined) {
        delete newParams[key];
      }
    });
    
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    // Keep all current filters, just update the page
    setSearchParams({ 
      ...Object.fromEntries(searchParams),
      page: newPage 
    });
    window.scrollTo(0, 0);
  };

  // Calculate total pages based on count (assuming 12 items per page)
  const itemsPerPage = 12;
  const totalPages = Math.ceil(pagination.count / itemsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Our Book Collection</h1>
          <SearchBar 
            initialValue={currentFilters.search}
            onSearch={(value) => handleFilterChange({ search: value })}
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
                <select
                  value={currentFilters.category}
                  onChange={(e) => handleFilterChange({ category: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Availability</h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={currentFilters.inStock}
                    onChange={(e) => handleFilterChange({ inStock: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">In stock only</span>
                </label>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Sort By</h3>
                <select
                  value={currentFilters.ordering}
                  onChange={(e) => handleFilterChange({ ordering: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="title">Title (A-Z)</option>
                  <option value="-title">Title (Z-A)</option>
                  <option value="price">Price (Low to High)</option>
                  <option value="-price">Price (High to Low)</option>
                  <option value="-last_update">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Count */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">
                {products.length > 0 
                  ? `Showing ${(currentFilters.page - 1) * itemsPerPage + 1}-${Math.min(currentFilters.page * itemsPerPage, pagination.count)} of ${pagination.count} results` 
                  : 'No products found'}
              </p>
              <Link 
                to="/products" 
                className="text-blue-600 hover:underline text-sm"
                onClick={() => {
                  setSearchParams({});
                  window.scrollTo(0, 0);
                }}
              >
                Clear all filters
              </Link>
            </div>

            {/* Loading State */}
            {loading && <LoadingSpinner />}

            {/* Products Grid */}
            {!loading && (
              <>
                {products.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                    <Pagination 
                      currentPage={currentFilters.page}
                      totalPages={totalPages}
                      hasNextPage={!!pagination.next}
                      hasPreviousPage={!!pagination.previous}
                      onPageChange={handlePageChange}
                      className="mt-8"
                    />
                  </>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-4">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <button
                      onClick={() => {
                        setSearchParams({});
                        window.scrollTo(0, 0);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;