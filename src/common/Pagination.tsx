export default function Pagination({
  data,
  currentPage,
  itemPerPage,
  onNextChange,
  onPrevChange,
}: {
  data: any;
  currentPage: number;
  itemPerPage: number;
  onNextChange: () => void;
  onPrevChange: () => void;
}) {
  return (
    <>
      {data && data.length > 1 && (
        <div className="flex xs:flex-col xs:gap-5 sm:flex-row  sm:justify-between space-x-8 md:justify-end items-center justify-end py-8">
          <div>
            <span className="text-3xl py-4 text-gray-700 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {(currentPage - 1) * itemPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {Math.min(currentPage * itemPerPage, data.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {data.length}
              </span>{" "}
              Entries
            </span>
          </div>

          <div className="inline-flex">
            <button
              onClick={onPrevChange}
              className="py-8 px-8 flex items-center justify-center h-8 text-3xl font-medium text-white bg-gray-800 rounded-bl-xl rounded-tl-xl hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="w-7 h-7 text-3xl mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Prev
            </button>
            <button
              onClick={onNextChange}
              className="flex items-center justify-center h-8 text-3xl font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-br-xl rounded-tr-xl hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white py-8 px-8"
            >
              Next
              <svg
                className="w-7 h-7 text-3xl ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                fontSize={""}
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
