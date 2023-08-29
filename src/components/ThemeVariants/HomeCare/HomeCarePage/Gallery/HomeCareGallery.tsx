import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useContext, useEffect, useState } from "react";
import HomeCarePagination from "../../Common/HomeCarePagination";

export default function HomeCareGallery() {
  const lstPortfolio = useContext(ThemeContextApi).portfolio;
  const [objPagination, setObjPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemPerPage: 6,
  });

  const loadData = () => {
    setObjPagination((prevState) => ({
      ...prevState,
      totalPages: Utils.getTotalPages(lstPortfolio, objPagination.itemPerPage),
    }));
  };

  const onPrevChange = (index?: number) => {
    if (index) {
      if (objPagination.currentPage > 1) {
        setObjPagination((prevState) => ({
          ...prevState,
          currentPage: index,
        }));
      }
    } else {
      if (objPagination.currentPage > 1) {
        setObjPagination((prevState) => ({
          ...prevState,
          currentPage: prevState.currentPage - 1,
        }));
      }
    }
  };

  const onNextChange = (index?: number) => {
    if (index) {
      if (objPagination.currentPage < objPagination.totalPages) {
        setObjPagination((prevState) => ({
          ...prevState,
          currentPage: index + 1,
        }));
      }
    } else {
      if (objPagination.currentPage < objPagination.totalPages) {
        setObjPagination((prevState) => ({
          ...prevState,
          currentPage: prevState.currentPage + 1,
        }));
      }
    }
  };

  const onFirstPage = () => {
    if (objPagination.currentPage > 1) {
      setObjPagination((prevState) => ({
        ...prevState,
        currentPage: 1,
      }));
    }
  };

  const onLastPage = () => {
    if (objPagination.currentPage < objPagination.totalPages) {
      setObjPagination((prevState) => ({
        ...prevState,
        currentPage: objPagination.totalPages,
      }));
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        id="gallery"
        className="border border-solid border-homeCareTheme-opacityBorder bg-white rounded-3xl p-5 mb-10"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <h4 className="pt-4 text-[22px] text-center text-black  font-bold mb-6 homecarefont">
          Gallery
        </h4>
        <div className="homecarefont pt-4 pb-8 px-4 grid xs:grid-cols-2 lg:grid-cols-3 gap-4">
          {lstPortfolio
            .slice(
              (objPagination.currentPage - 1) * objPagination.itemPerPage,
              Math.min(
                objPagination.currentPage * objPagination.itemPerPage,
                lstPortfolio.length
              )
            )
            .map((item) => (
              <div key={item.portfolio_id} className="image w-full h-auto py-6">
                <img
                  alt="image.png"
                  src={`${UPLOAD_IMAGE_URI}/${Utils.getCompanyID()}/portfolio/${
                    item.portfolio_image
                  }`}
                  className="max-w-[400px] block m-auto p-4 w-full h-full align-middle"
                />
              </div>
            ))}
        </div>
        {lstPortfolio && (
          <HomeCarePagination
            totalPages={objPagination.totalPages}
            currentPage={objPagination.currentPage}
            itemPerPage={objPagination.itemPerPage}
            onNextChange={onNextChange}
            onPrevChange={onPrevChange}
            onLastPage={onLastPage}
            onFirstPage={onFirstPage}
          />
        )}
      </div>
    </>
  );
}
