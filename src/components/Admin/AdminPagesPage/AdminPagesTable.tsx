import PageCircularLoading from "@/common/PageCircularLoading";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { IPagesInfo } from "@/types/commonTypes";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPagesTable() {
  const [lstPagesInfo, setLstPagesInfo] = useState<IPagesInfo[]>([]);

  const loadData = async () => {
    try {
      const res = await ApiService.getAllPagesInfo();
      if (!res.error) {
        setLstPagesInfo(res.pages);
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

  const deleteItem = async (itemID: string) => {
    try {
      const isValid = await Utils.showWarningMessage("Do you want to delete?");
      if (isValid.isConfirmed) {
        const res = await ApiService.deletePageItem(parseInt(itemID));
        if (!res.error) {
          onComplete();
          Utils.showSuccessMessage(res.message);
          return null;
        }

        throw new Error(res.message);
      }
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!lstPagesInfo) return <PageCircularLoading />;

  return (
    <>
      <div className="relative w-full overflow-x-auto rounded-2xl">
        <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
          <thead className="text-xs text-gray-700  bg-gray-50">
            <tr className="text-3xl text-primary-main bg-secondary-greyDark text-center p-3">
              <th className="p-4 font-medium">Page Name</th>
              <th className="p-4 font-medium">Template Name</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          {lstPagesInfo.length > 0 &&
            lstPagesInfo.map((item, index: number) => (
              <tbody
                key={index}
                className="text-2xl text-center border-0 p-[10px] align-middle text-secondary-main"
              >
                {index % 2 == 0 ? (
                  <tr className="bg-white border-0">
                    <td className="p-4 text-2xl">{item.page_name}</td>
                    <td className="p-4 text-2xl">{item.template_name}</td>
                    <td className="p-4 text-2xl space-x-5">
                      <Link target="_blank" href={"/dashboard/company"}>
                        <FontAwesomeIcon
                          className="text-secondary-main text-3xl text-center"
                          icon={faEdit}
                        />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          deleteItem(item.page_id);
                        }}
                      >
                        <FontAwesomeIcon
                          className="text-secondary-main text-3xl text-center"
                          icon={faTrash}
                        />
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr className="bg-primary-main border-red-100">
                    <td className="p-4 text-2xl">{item.page_name}</td>
                    <td className="p-4 text-2xl">{item.template_name}</td>
                    <td className="p-4 text-2xl space-x-5">
                      <Link target="_blank" href={"/dashboard/company"}>
                        <FontAwesomeIcon
                          className="text-secondary-main text-3xl text-center"
                          icon={faEdit}
                        />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          deleteItem(item.page_id);
                        }}
                      >
                        <FontAwesomeIcon
                          className="text-secondary-main text-3xl text-center"
                          icon={faTrash}
                        />
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            ))}

          {lstPagesInfo.length <= 0 && (
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
    </>
  );
}
