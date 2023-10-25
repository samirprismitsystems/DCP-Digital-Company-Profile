import Pagination from "@/common/Pagination";
import TableDataNotPresent from "@/common/TableDataNotPresent";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { IAdminUserReview } from "@/types/commonTypes";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminReviewTable() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lstUserReview, setLstUserReview] = useState<IAdminUserReview[]>();
  const [objPagination, setObjPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemPerPage: 2,
  });
  const router = useRouter();

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getAllAdminUserReview();
      if (!res.error) {
        setLstUserReview(res.review);
        setObjPagination((prevState) => ({
          ...prevState,
          totalPages: Utils.getTotalPages(
            res.review,
            objPagination.itemPerPage
          ),
        }));
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onComplete = () => {
    loadData();
  };

  const updateUserReviewStatus = async (userReviewID: any, status: any) => {
    try {
      if (parseInt(status) == 0) {
        status = 1;
      } else {
        status = 0;
      }

      let io = new FormData();
      io.append("review_id", userReviewID);
      io.append("status", status);
      let token = AuthService.getToken();
      io.append("token", token);

      const res = await ApiService.updateUserReviewStatus(io);
      if (!res.error) {
        onComplete();
        Utils.showSuccessMessage(res.message);
        return null;
      }

      throw new Error(res.message);
    } catch (error: any) {
      Utils.showErrorMessage(error.message);
      router.push('/');
    }
  };

  const onPrevChange = () => {
    if (objPagination.currentPage > 1) {
      setObjPagination((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  const onNextChange = () => {
    if (objPagination.currentPage < objPagination.totalPages) {
      setObjPagination((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative w-full overflow-x-auto rounded-2xl">
        <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
          <thead className="text-xs text-gray-700  bg-gray-50">
            <tr className="text-3xl text-primary-main bg-secondary-greyDark text-center p-3">
              <th className="p-4 font-medium">Customer Name</th>
              <th className="p-4 font-medium">Review</th>
              <th className="p-4 font-medium">Edit</th>
              <th className="p-4 font-medium">Active / InActive</th>
            </tr>
          </thead>
          {lstUserReview &&
            lstUserReview.length > 0 &&
            lstUserReview
              .slice(
                (objPagination.currentPage - 1) * objPagination.itemPerPage,
                Math.min(
                  objPagination.currentPage * objPagination.itemPerPage,
                  lstUserReview.length
                )
              )
              .map((item, index: number) => (
                <tbody
                  key={index}
                  className="text-2xl text-center border-0 p-[10px] align-middle text-secondary-dark"
                >
                  {index % 2 == 0 ? (
                    <tr className="bg-white border-0">
                      <td className="p-4 text-2xl">{item.user_name}</td>
                      <td className="p-4 text-2xl w-2/5">
                        {item.user_message}
                      </td>
                      <td className="p-4 text-2xl">
                        <button
                          onClick={() => {
                            router.push(`edituserreview/${item.review_id}`);
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-secondary-main text-3xl text-center"
                            icon={faEdit}
                          />
                        </button>
                      </td>
                      <td className="p-4 text-2xl">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <div
                            onClick={() => {
                              updateUserReviewStatus(
                                item.review_id,
                                item.status
                              );
                            }}
                            className={`xs:w-24 h-12 xlTwo:w-28 xlThree:w-24 ${
                              !Boolean(parseInt(item.status)) && "bg-white"
                            } border border-secondary-main peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-secondary-main after:content-[''] after:absolute after:top-3 ${
                              Boolean(parseInt(item.status))
                                ? "after:xs:left-[27px] after:xl:left-[22px] after:xlThree:left-[29px] after:xlThree:h-[28px] after:xlOne:left-[25px] after:xlTwo:left-[32px]"
                                : "after:left-[1px]"
                            } after:bg-secondary-main after:lg:top-[1px] after:xlOne:top-[1.2px] after:top-[2px] after:border-secondary-main after:border after:rounded-full after:xs:h-[20px] after:xlOne:h-[19px] after:xlTwo:h-[20px] after:xlThree:h-[29px] after:lg:h-[22px] after:xl:h-[16px] after:h-[26px] after:xlThree:w-12 after:w-10 after:transition-all dark:border-gray-600 ${
                              Boolean(parseInt(item.status)) && "bg-white"
                            }`}
                          ></div>
                        </label>
                      </td>
                    </tr>
                  ) : (
                    <tr className="bg-primary-main border-red-100">
                      <td className="p-4 text-2xl">{item.user_name}</td>
                      <td className="p-4 text-2xl">{item.user_message}</td>
                      <td className="p-4 text-2xl">
                        <button
                          onClick={() => {
                            router.push(`edituserreview/${item.review_id}`);
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-secondary-main text-3xl text-center"
                            icon={faEdit}
                          />
                        </button>
                      </td>
                      <td className="p-4 text-2xl rounded-b-l-xl">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <div
                            onClick={() => {
                              updateUserReviewStatus(
                                item.review_id,
                                item.status
                              );
                            }}
                            className={`xs:w-24 h-12 xlTwo:w-28 xlThree:w-24 ${
                              !Boolean(parseInt(item.status)) && "bg-white"
                            } border border-secondary-main peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-secondary-main after:content-[''] after:absolute after:top-3 ${
                              Boolean(parseInt(item.status))
                                ? "after:xs:left-[27px] after:xl:left-[22px] after:xlThree:left-[29px] after:xlThree:h-[28px] after:xlOne:left-[25px] after:xlTwo:left-[32px]"
                                : "after:left-[1px]"
                            } after:bg-secondary-main after:lg:top-[1px] after:xlOne:top-[1.2px] after:top-[2px] after:border-secondary-main after:border after:rounded-full after:xs:h-[20px] after:xlOne:h-[19px] after:xlTwo:h-[20px] after:xlThree:h-[29px] after:lg:h-[22px] after:xl:h-[16px] after:h-[26px] after:xlThree:w-12 after:w-10 after:transition-all dark:border-gray-600 ${
                              Boolean(parseInt(item.status)) && "bg-white"
                            }`}
                          ></div>
                        </label>
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}

          <TableDataNotPresent
            rows={8}
            isLoading={isLoading}
            data={lstUserReview}
          />
        </table>
      </div>
      {lstUserReview && lstUserReview.length > 1 && (
        <Pagination
          onNextChange={onNextChange}
          onPrevChange={onPrevChange}
          data={lstUserReview && lstUserReview}
          currentPage={objPagination.currentPage}
          itemPerPage={objPagination.itemPerPage}
        />
      )}
    </>
  );
}
