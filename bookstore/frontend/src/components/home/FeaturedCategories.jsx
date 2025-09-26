const FeaturedCategories = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
      <div className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(selectedCategory === category.id ? null : category.id)}
                className={`px-4 py-2 rounded-full ${selectedCategory === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default FeaturedCategories;