import { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ initialValue = '', onSearch, className }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className={`flex items-center border ${isFocused ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'} rounded-md overflow-hidden transition-all`}>
        <button 
          type="submit" 
          className="px-3 py-2 text-gray-500 hover:text-gray-700"
          aria-label="Search"
        >
          <FiSearch className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search books..."
          className="flex-1 py-2 px-1 focus:outline-none text-gray-700"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="px-2 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;