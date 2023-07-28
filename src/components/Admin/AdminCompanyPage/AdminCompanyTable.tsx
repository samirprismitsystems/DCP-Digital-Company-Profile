import PageCircularLoading from "@/common/PageCircularLoading";
import Pagination from "@/common/Pagination";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { ICompanyDetails } from "@/types/companyTypes";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminCompanyTable() {
  const [lstCompany, setLstCompany] = useState<ICompanyDetails[]>([]);
  const [objPagination, setObjPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemPerPage: 2,
  });

  const loadData = async () => {
    try {
      const res = await ApiService.getAllCompanies();
      if (!res.error) {
        setLstCompany(res.company);
        setObjPagination((prevState) => ({
          ...prevState,
          totalPages: Utils.getTotalPages(
            res.company,
            objPagination.itemPerPage
          ),
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

  const updateCompanyStatus = async (companyID: any, status: any) => {
    try {
      if (status == 0) {
        status = 1;
      } else {
        status = 0;
      }

      let io = new FormData();
      io.append("company_id", companyID);
      io.append("status", status);

      const res = await ApiService.updateCompanyStatus(io);
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
  }, []);

  if (!lstCompany) return <PageCircularLoading />;
  return (
    <>
      <div className="relative w-full overflow-x-auto rounded-2xl">
        <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
          <thead className="text-xs text-gray-700  bg-gray-50">
            <tr className="text-3xl text-primary-main bg-secondary-greyDark text-center p-3">
              <th className="p-4 font-medium">Company Name</th>
              <th className="p-4 font-medium">ESTD.</th>
              <th className="p-4 font-medium">Company Email</th>
              <th className="p-4 font-medium">Company Contact</th>
              <th className="p-4 font-medium">Edit</th>
              <th className="p-4 font-medium">Active / InActive</th>
            </tr>
          </thead>
          {lstCompany.length > 0 &&
            lstCompany
              .slice(
                (objPagination.currentPage - 1) * objPagination.itemPerPage,
                Math.min(
                  objPagination.currentPage * objPagination.itemPerPage,
                  lstCompany.length
                )
              )
              .map((item, index: number) => (
                <tbody
                  key={index}
                  className="text-2xl text-center border-0 p-[10px] align-middle text-secondary-main"
                >
                  {index % 2 == 0 ? (
                    <tr className="bg-white border-0">
                      <td className="p-4 text-2xl">{item.company_name}</td>
                      <td className="p-4 text-2xl">{item.established_in}</td>
                      <td className="p-4 text-2xl">{item.company_email}</td>
                      <td className="p-4 text-2xl">{item.company_contact}</td>
                      <td className="p-4 text-2xl">
                        <Link target="_blank" href={"/dashboard/company"}>
                          <FontAwesomeIcon
                            className="text-secondary-main text-3xl text-center"
                            icon={faEdit}
                          />
                        </Link>
                      </td>
                      <td className="p-4 text-2xl">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <div
                            onClick={() => {
                              updateCompanyStatus(item.company_id, item.status);
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
                      <td className="p-4 text-2xl">{item.company_name}</td>
                      <td className="p-4 text-2xl">{item.established_in}</td>
                      <td className="p-4 text-2xl">{item.company_email}</td>
                      <td className="p-4 text-2xl">{item.company_contact}</td>
                      <td className="p-4 text-2xl">
                        <Link target="_blank" href={"/dashboard/company"}>
                          <FontAwesomeIcon
                            className="text-secondary-main text-3xl text-center"
                            icon={faEdit}
                          />
                        </Link>
                      </td>
                      <td className="p-4 text-2xl rounded-b-l-xl">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <div
                            onClick={() => {
                              updateCompanyStatus(item.company_id, item.status);
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

          {lstCompany.length <= 0 && (
            <tbody className="text-2xl  text-white">
              <tr aria-rowspan={8} className="text-black text-center border-b">
                <th
                  colSpan={8}
                  className="px-6  py-8 font-medium whitespace-nowrap"
                >
                  No Records Found
                </th>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {lstCompany.length > 1 && (
        <Pagination
          onNextChange={onNextChange}
          onPrevChange={onPrevChange}
          data={lstCompany && lstCompany}
          currentPage={objPagination.currentPage}
          itemPerPage={objPagination.itemPerPage}
        />
      )}
    </>
  );
}
