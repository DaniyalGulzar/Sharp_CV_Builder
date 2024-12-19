import React from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const halfWindow = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= halfWindow + 1) {
      for (let i = 1; i <= maxVisiblePages - 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage > totalPages - halfWindow) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = currentPage - halfWindow; i <= currentPage + halfWindow; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  return (
    <nav>
      <ul className="pagination list-none flex justify-center items-center space-x-2">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="bg-gray-300 p-2 rounded-md hover:bg-gray-400"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <BiLeftArrow />
          </button>
        </li>

        {getPageNumbers().map((number, index) =>
          typeof number === "number" ? (
            <li
              key={index}
              onClick={() => onPageChange(number)}
              className={`page-item cursor-pointer ${
                number === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
              } p-2 px-3 rounded-md hover:bg-blue-400`}
            >
              <button
                className={`${number === currentPage ? "text-white" : "text-black"}`}
              >
                {number}
              </button>
            </li>
          ) : (
            <li key={index} className="page-item p-2 bg-gray-300 rounded-md">
              <span className="text-black">...</span>
            </li>
          )
        )}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="bg-gray-300 p-2 rounded-md hover:bg-gray-400"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <BiRightArrow />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
