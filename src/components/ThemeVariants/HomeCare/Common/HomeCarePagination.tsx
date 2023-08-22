import { useEffect, useState } from "react";

export default function HomeCarePagination({
  totalPages,
  currentPage,
  itemPerPage,
  onNextChange,
  onPrevChange,
  onLastPage,
  onFirstPage,
}: {
  totalPages: any;
  currentPage: number;
  itemPerPage: number;
  onNextChange: (index?: number) => void;
  onPrevChange: (index?: number) => void;
  onLastPage: () => void;
  onFirstPage: () => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  useEffect(() => {
    setSelectedIndex(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setSelectedIndex(currentPage);
  }, []);

  return (
    <>
      <ul className="w-full flex pl-0 list-none rounded-[0.5rem] pb-4  justify-center">
        <li className="disabled:bg-[#ededee] disabled:text-white disabled:cursor-not-allowed disabled:border disabled:border-solid disabled:border-[#ededee] border border-solid border-homeCareTheme-primary  text-homeCareTheme-primary  rounded-[4px] mr-4 flex items-center justify-center text-center">
          <button
            className="disabled:text-[#898989]  text-homeCareTheme-primary inline-flex py-1 px-2 min-w-[25px] h-6 items-center justify-center cursor-pointer"
            aria-label="Go to first page"
            onClick={onFirstPage}
          >
            «
          </button>
        </li>
        <li className="disabled:bg-[#ededee] disabled:text-white disabled:cursor-not-allowed disabled:border disabled:border-solid disabled:border-[#ededee] border border-solid border-homeCareTheme-primary  text-homeCareTheme-primary  rounded-[4px] mr-4 flex items-center justify-center text-center">
          <button
            className="disabled:text-[#898989]  text-homeCareTheme-primary inline-flex py-1 px-2 min-w-[25px] h-6 items-center justify-center cursor-pointer"
            aria-label="Go to previous page"
            onClick={() => {
              onPrevChange();
            }}
          >
            ⟨
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => {
          return (
            <li
              onClick={() => {
                setSelectedIndex(index + 1);
                if (index+1 > selectedIndex) {
                  onNextChange(index);
                } else {
                  onPrevChange(index+1);
                }
              }}
              className={`flex items-center justify-center text-center  active:border active:border-solid active:border-homeCareTheme-primary border-solid border border-homeCareTheme-primary rounded-[4px]  mr-4 ${
                currentPage === index + 1 && "bg-homeCareTheme-primary"
              }`}
            >
              <button
                className={`inline-flex  py-1 min-w-[25px] h-[25px] items-center justify-center px-2 ${
                  currentPage === index + 1 ? "text-white" : "text-black"
                }`}
                aria-label="Go to page number 1"
              >
                {index + 1}
              </button>
            </li>
          );
        })}
        <li className="flex items-center justify-center text-center disabled:bg-[#ededee] disabled:text-white disabled:cursor-not-allowed disabled:border disabled:border-solid disabled:border-[#ededee] border border-solid border-homeCareTheme-primary  text-homeCareTheme-primary  rounded-[4px] mr-4">
          <button
            className="disabled:text-[#898989]  text-homeCareTheme-primary inline-flex py-1 px-2 min-w-[25px] h-6 items-center justify-center cursor-pointer"
            aria-label="Go to next page"
            onClick={() => {
              onNextChange();
            }}
          >
            ⟩
          </button>
        </li>
        <li className="flex items-center justify-center text-center disabled:bg-[#ededee] disabled:text-white disabled:cursor-not-allowed disabled:border disabled:border-solid disabled:border-[#ededee] border border-solid border-homeCareTheme-primary  text-homeCareTheme-primary  rounded-[4px] mr-4">
          <button
            className="disabled:text-[#898989]  text-homeCareTheme-primary inline-flex py-1 px-2 min-w-[25px] h-6 items-center justify-center cursor-pointer"
            aria-label="Go to last page"
            onClick={onLastPage}
          >
            »
          </button>
        </li>
      </ul>
    </>
  );
}
