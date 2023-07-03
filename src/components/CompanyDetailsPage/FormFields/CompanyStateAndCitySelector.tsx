import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { ICompanyCityList, IStates } from "@/types/companyTypes";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function CompanyStateAndCitySelector({
  lstStates,
}: {
  lstStates: IStates[];
}) {
  const [lstCity, setLstCity] = useState<ICompanyCityList[]>();
  const objForm = useFormContext();
  const getCityList = async (stateName: string) => {
    console.log(stateName);
    try {
      const res = await ApiService.getCities(stateName);
      if (!res.error) {
        setLstCity(res.cities);
        return null;
      }

      throw new Error("error occurred while getting cities!");
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const stateName = objForm.watch("state");
  
  useEffect(() => {
    if (stateName) {
      getCityList(stateName);
    }
  }, [stateName]);

  if (!lstStates) return null;
  return (
    <>
      <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 mb-16 transition-all duration-300 ease-linear">
        <label
          className={`font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block ${
            objForm.formState.errors["state"] && "text-red-600"
          }`}
        >
          State *
        </label>
        <div className="flex justify-center items-center">
          <input
            className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
            list="browsers"
            type="text"
            placeholder="Select States"
            id="browser"
            {...objForm.register("state")}
          />
          <div className="closeIcon text-4xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-gray-500 hover:cursor-pointer"
              onClick={() => {
                objForm.setValue("state", "");
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <datalist id="browsers">
          {lstStates &&
            lstStates.length > 0 &&
            lstStates.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
        </datalist>
      </div>

      <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 mb-16 transition-all duration-300 ease-linear">
        <label
          className={`font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block ${
            objForm.formState.errors["city"] && "text-red-600"
          }`}
        >
          City *
        </label>
        <div className="flex">
          <input
            className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
            list="cities"
            placeholder="Select City"
            {...objForm.register("city")}
          />
          <div className="closeIcon text-4xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-gray-500 hover:cursor-pointer"
              onClick={() => {
                objForm.setValue("city", "");
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <datalist id="cities">
          {lstCity &&
            lstCity.length > 0 &&
            lstCity.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
        </datalist>
      </div>
    </>
  );
}
