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
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center sm:justify-end gap-2 mt-4 flex-wrap">
      <button
        className="px-3 py-2 bg-lightGray hover:bg-lightGrayHover text-customWhite rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200 text-sm"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Show limited page numbers on mobile */}
      <div className="flex gap-1 sm:gap-2">
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          const isCurrentPage = currentPage === pageNumber;
          const isVisible =
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

          if (!isVisible && totalPages > 5) {
            if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return (
                <span key={index} className="px-2 py-2 text-greyText">
                  ...
                </span>
              );
            }
            return null;
          }

          return (
            <button
              key={index}
              className={`px-3 py-2 rounded-lg transition-colors duration-200 text-sm ${
                isCurrentPage
                  ? "bg-customWhite text-darkBackground font-medium"
                  : "bg-lightGray hover:bg-lightGrayHover text-customWhite"
              }`}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        className="px-3 py-2 bg-lightGray hover:bg-lightGrayHover text-customWhite rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200 text-sm"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
