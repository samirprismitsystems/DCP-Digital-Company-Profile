export default function HomeCarePagination() {
  return (
    <>
      <ul className="w-full flex pl-0 list-none rounded-[0.5rem] pb-4  justify-center">
        <li className="disabled:bg-[#ededee] disabled:text-white disabled:cursor-not-allowed disabled:border disabled:border-solid disabled:border-[#ededee] border border-solid border-homeCareTheme-primary  text-homeCareTheme-primary  rounded-[4px] mr-4 flex items-center justify-center text-center">
          <button
            className="disabled:text-[#898989]  text-homeCareTheme-primary inline-flex py-1 px-2 min-w-[25px] h-6 items-center justify-center cursor-pointer"
            aria-label="Go to first page"
          >
            «
          </button>
        </li>
        <li className="disabled:bg-[#ededee] disabled:text-white disabled:cursor-not-allowed disabled:border disabled:border-solid disabled:border-[#ededee] border border-solid border-homeCareTheme-primary  text-homeCareTheme-primary  rounded-[4px] mr-4 flex items-center justify-center text-center">
          <button
            className="disabled:text-[#898989]  text-homeCareTheme-primary inline-flex py-1 px-2 min-w-[25px] h-6 items-center justify-center cursor-pointer"
            aria-label="Go to previous page"
          >
            ⟨
          </button>
        </li>
        <li className="flex items-center justify-center text-center active:bg-homeCareTheme-primary active:text-white active:border active:border-solid active:border-homeCareTheme-primary border-solid border border-homeCareTheme-primary   hover:bg-homeCareTheme-primary rounded-[4px]  mr-4">
          <button
            className="inline-flex text-white  py-1 min-w-[25px] h-[25px] items-center justify-center px-2"
            aria-label="Go to page number 1"
          >
            1
          </button>
        </li>
        <li className="flex items-center justify-center text-center  active:bg-homeCareTheme-primary active:text-white active:border active:border-solid active:border-homeCareTheme-primary border-solid border border-homeCareTheme-primary   hover:bg-homeCareTheme-primary rounded-[4px]  mr-4">
          <button
            className="text-black  inline-flex active:text-white  py-1 min-w-[25px] h-[25px] items-center justify-center px-2"
            aria-label="Go to page number 1"
          >
            2
          </button>
        </li>
        <li className="flex items-center justify-center text-center active:bg-homeCareTheme-primary active:text-white active:border active:border-solid active:border-homeCareTheme-primary border-solid border border-homeCareTheme-primary   hover:bg-homeCareTheme-primary rounded-[4px]  mr-4">
          <button
            className="text-black  inline-flex active:text-white  py-1 min-w-[25px] h-[25px] items-center justify-center px-2"
            aria-label="Go to page number 1"
          >
            3
          </button>
        </li>
        <li className="flex items-center justify-center text-center disabled:bg-[#ededee] disabled:text-white disabled:cursor-not-allowed disabled:border disabled:border-solid disabled:border-[#ededee] border border-solid border-homeCareTheme-primary  text-homeCareTheme-primary  rounded-[4px] mr-4">
          <button
            className="disabled:text-[#898989]  text-homeCareTheme-primary inline-flex py-1 px-2 min-w-[25px] h-6 items-center justify-center cursor-pointer"
            aria-label="Go to next page"
          >
            ⟩
          </button>
        </li>
        <li className="flex items-center justify-center text-center disabled:bg-[#ededee] disabled:text-white disabled:cursor-not-allowed disabled:border disabled:border-solid disabled:border-[#ededee] border border-solid border-homeCareTheme-primary  text-homeCareTheme-primary  rounded-[4px] mr-4">
          <button
            className="disabled:text-[#898989]  text-homeCareTheme-primary inline-flex py-1 px-2 min-w-[25px] h-6 items-center justify-center cursor-pointer"
            aria-label="Go to last page"
          >
            »
          </button>
        </li>
      </ul>
    </>
  );
}
