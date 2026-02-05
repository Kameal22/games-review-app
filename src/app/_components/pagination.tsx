"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex items-center justify-start gap-1 sm:gap-2 mt-4 flex-wrap max-w-full overflow-x-auto">
      <button
        className="px-2 sm:px-3 py-1 bg-gray-700 text-white rounded-md disabled:opacity-50 cursor-pointer text-sm flex-shrink-0"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        Poprzednia
      </button>

      {/* Show limited page numbers on mobile */}
      <div className="flex gap-1 sm:gap-2 flex-wrap">
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          const isCurrentPage = currentPage === pageNumber;
          // Show first, last, current, and adjacent pages
          const isVisible =
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

          // Show ellipsis for gaps
          if (!isVisible && totalPages > 5) {
            if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return (
                <span
                  key={index}
                  className="px-1 sm:px-2 py-1 text-gray-400 text-sm"
                >
                  ...
                </span>
              );
            }
            return null;
          }

          if (!isVisible) return null;

          return (
            <button
              key={index}
              className={`px-2 sm:px-3 py-1 rounded-md text-sm flex-shrink-0 ${
                isCurrentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-white"
              }`}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        className="px-2 sm:px-3 py-1 bg-gray-700 text-white rounded-md disabled:opacity-50 cursor-pointer text-sm flex-shrink-0"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Następna
      </button>
    </div>
  );
};

export default Pagination;
