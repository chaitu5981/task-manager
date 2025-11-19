const Pagination = ({ page, setPage, totalCount, rowsPerPage }) => {
  const lastPage = Math.ceil(totalCount / rowsPerPage);
  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const goToNextPage = () => {
    if (page < lastPage) setPage(page + 1);
  };
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={goToPrevPage}
        className={`bg-blue-500 text-white p-1 rounded-md px-2 cursor-pointer ${
          page === 1 ? "opacity-50" : ""
        }`}
      >
        Previous
      </button>
      <button
        onClick={goToNextPage}
        className={`bg-blue-500 text-white p-1 rounded-md px-2 cursor-pointer ${
          page === lastPage ? "opacity-50" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
