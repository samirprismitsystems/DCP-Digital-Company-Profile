import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { ITestimonial } from "@/types/commonTypes";
import { useEffect, useState } from "react";

export default function TestimonialTable() {
  const [lstTestimonial, setLstTestimonial] = useState<ITestimonial[]>();
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 2,
  });

  const loadData = async () => {
    try {
      const res = await ApiService.getTestimonialList();
      if (!res.error) {
        setLstTestimonial(res.testimonial);
        const totalPages = Math.ceil(
          res.testimonial.length / paginationData.itemsPerPage
        );
        setPaginationData((prevState) => ({
          ...prevState,
          totalPages,
        }));
        return null;
      }
      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const onComplete = () => {
    loadData();
  };

  const toggle = async (tid: any, status: any) => {
    try {
      if (status == 0) {
        status = 1;
      } else {
        status = 0;
      }

      let io = new FormData();
      io.append("testimonial_id", tid);
      io.append("status", status);

      const res = await ApiService.activeDeactiveTestimonialStatus(io);
      if (!res.error) {
        onComplete();
        Utils.showSuccessMessage(res.message);
        return null;
      }

      throw new Error(res.message);
    } catch (error: any) {
      Utils.showErrorMessage(error.message);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPrevChange = () => {
    if (paginationData.currentPage > 1) {
      setPaginationData((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  const onNextChange = () => {
    if (paginationData.currentPage < paginationData.totalPages) {
      setPaginationData((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto pt-16 pb-10">
        <table className="w-full text-left text-white rounded-[0.8rem]">
          <thead className="text-white font-semibold text-3xl capitalize bg-gray-800 ">
            <tr>
              <th scope="col" className="px-6 py-5 text-2xl">
                Client Name
              </th>
              <th scope="col" className="px-6 py-5 text-2xl">
                Client Email
              </th>
              <th scope="col" className="px-6 py-5 text-2xl">
                Comments
              </th>
              <th scope="col" className="px-6 py-5 text-2xl">
                Ratting
              </th>
              <th scope="col" className="px-6 py-5 text-2xl">
                Status
              </th>
            </tr>
          </thead>
          {lstTestimonial &&
            lstTestimonial.length > 0 &&
            lstTestimonial
              .slice(
                (paginationData.currentPage - 1) * paginationData.itemsPerPage,
                Math.min(
                  paginationData.currentPage * paginationData.itemsPerPage,
                  lstTestimonial.length
                )
              )
              .map((item) => (
                <tbody
                  key={item.testimonial_id}
                  className="text-2xl  text-white"
                >
                  <tr className="text-black border-b">
                    <th
                      scope="row"
                      className="px-6 py-6 font-normal whitespace-nowrap"
                    >
                      {item.client_name || "N/A"}
                    </th>
                    <td className="font-normal  px-6 py-6">
                      {item.email_address || "N/A"}
                    </td>
                    <td className="font-normal  px-6 py-6">
                      {item.comment || "N/A"}
                    </td>
                    <td className="font-normal  px-6 py-6">
                      {item.ratting || "N/A"}
                    </td>
                    <td className="font-normal  px-6 py-6">
                      {/* <TestimonialToggle
                        onComplete={onComplete}
                        testimonialID={item.testimonial_id}
                        isActive={item.status === "1"}
                      /> */}
                      <label className="relative inline-flex items-center cursor-pointer">
                        <div
                          onClick={() => {
                            toggle(item.testimonial_id, item.status);
                          }}
                          className={`w-24 h-12 ${
                            !Boolean(parseInt(item.status)) && "bg-gray-200"
                          } peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-3 ${
                            Boolean(parseInt(item.status))
                              ? "after:xs:left-[25px] after:xl:left-[24px] after:xlOne:left-[28px] after:xlTwo:left-[30px]"
                              : "after:left-[5px]"
                          } after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 ${
                            Boolean(parseInt(item.status)) && "bg-blue-600"
                          }`}
                        ></div>
                      </label>
                    </td>
                  </tr>
                </tbody>
              ))}

          {lstTestimonial && lstTestimonial.length <= 0 && (
            <tbody className="text-2xl  text-white">
              <tr aria-rowspan={8} className="text-black text-center border-b">
                <th
                  colSpan={8}
                  className="px-6 py-8 font-normal whitespace-nowrap"
                >
                  No Records Found
                </th>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {lstTestimonial && lstTestimonial.length > 1 && (
        <div className="flex flex-row space-x-8 items-center justify-end pb-8">
          <span className="text-3xl py-4 text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {(paginationData.currentPage - 1) * paginationData.itemsPerPage +
                1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(
                paginationData.currentPage * paginationData.itemsPerPage,
                lstTestimonial.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {lstTestimonial.length}
            </span>{" "}
            Entries
          </span>

          <div className="inline-flex">
            <button
              onClick={onPrevChange}
              className="py-8 px-8 flex items-center justify-center h-8 text-3xl font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
              className="flex items-center justify-center h-8 text-3xl font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white py-8 px-8"
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
