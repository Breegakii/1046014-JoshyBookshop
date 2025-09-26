const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  className = ''
}) => {
  const maxVisiblePages = 5;
  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
    const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
    
    if (currentPage <= maxPagesBeforeCurrent) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrent;
      endPage = currentPage + maxPagesAfterCurrent;
    }
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        {hasPreviousPage && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={!hasPreviousPage}
          >
            Previous
          </button>
        )}
      </div>
      
      <div className="flex space-x-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded-md ${currentPage === page 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            {page}
          </button>
        ))}
      </div>
      
      <div>
        {hasNextPage && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={!hasNextPage}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;