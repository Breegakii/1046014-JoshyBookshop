import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
      </div>
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-2xl text-center mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Next <span className="text-blue-300">Favorite Book</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Explore our curated collection across all genres. From bestsellers to hidden gems, we have something for every reader.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Shop Now
            </Link>
            <Link 
              to="/products" 
              className="px-8 py-4 border-2 border-white hover:bg-white hover:text-gray-900 text-white font-medium rounded-lg text-lg transition-all transform hover:scale-105"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scrolling book animation */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </div>
  );
};

export default HeroSection;