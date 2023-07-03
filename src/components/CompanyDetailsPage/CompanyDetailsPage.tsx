import CompanyTextField from "@/components/CompanyDetailsPage/FormFields/CompanyTextField";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { companyDetailsFormSchema } from "@/services/forms/formSchema";
import { IMap } from "@/types/commonTypes";
import { IStates } from "@/types/companyTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";
import CompanyImageUploader from "./FormFields/CompanyImageUploader";
import CompanyStateAndCitySelector from "./FormFields/CompanyStateAndCitySelector";
import CompanyWorkingHoursSelectorField from "./FormFields/CompanyWorkingHoursField";
import MapInformation from "./MapInformation/MapInformation";

export default function CompanyDetailsPage() {
  const [mapLocation, setMapLocation] = useState<IMap>({
    lat: 21.1875694,
    lon: 72.8147383,
    displayname: "",
  });
  const [lstStates, setState] = useState<IStates[]>();
  type IFormData = yup.InferType<typeof companyDetailsFormSchema>;

  const objForm = useForm({
    defaultValues: {
      aboutCompany: "",
      businessType: "",
      city: "",
      companyEstDate: "",
      country: "",
      emailID: "",
      fullName: "",
      houseNumber: "",
      mapAddress: "",
      state: "",
      workingHours: "",
      alternatePhoneNumber: "",
    },
    resolver: yupResolver(companyDetailsFormSchema),
  });

  const onSave = (data: IFormData) => {
    console.log("hi", data);
  };

  const loadStates = async () => {
    try {
      const res = await ApiService.getStates();
      if (!res.error) {
        setState(res.states);
        return null;
      }
      throw new Error("States are not coming from source");
    } catch (ex: any) {
      if (ex) {
        Utils.showErrorMessage(ex.message);
      }
    }
  };

  const getMapLocation = async () => {
    try {
      console.log(objForm.getValues("mapAddress"));
      const res = await ApiService.getMapLocation(
        objForm.getValues("mapAddress") || ""
      );
      if (res.length === 0) {
        Swal.fire({
          icon: "error",
          title: "No Data Found",
          text: "No Address Found Try Area and City name To Get Map",
        });

        return null;
      }

      if (res.length > 0) {
        setMapLocation({
          lon: res[0].lon,
          lat: res[0].lat,
          displayname: res[0].display_name,
        });

        return null;
      }

      throw new Error("something went wrong while get map location!");
    } catch (Ex: any) {
      Utils.showErrorMessage(Ex.message);
    }
  };

  useEffect(() => {
    loadStates();
  }, []);

  return (
    <div className="right_sidebar_content p-12 bg-white">
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Make Your Business Profile</div>
        <div className="h4 mt-1">
          Please fill up the details to create your profile
        </div>
      </div>
      <FormProvider {...objForm}>
        <form
          className="digital_profile_form form_shadow bg-white rounded-2xl p-10 pb-0 block"
          style={{
            boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
          }}
          onSubmit={objForm.handleSubmit(onSave)}
        >
          <div className="row grid grid-cols-2 gap-8 flex-wrap -mr-3 -ml-3">
            <div className="leftSide px-3">
              <CompanyTextField
                name="fullName"
                title="Full Name / Business Name / Company Name *"
                placeHolder="Enter Your Full Name / Business Name / Company Name"
                type="text"
              />
              <CompanyTextField
                name="businessType"
                title="Business Type / Description *"
                placeHolder="Business Type / Description"
                type="text"
              />
              <div className="grid grid-cols-2 gap-8">
                <CompanyTextField
                  name="phoneNumber"
                  title="Phone No. (WhatsApp No) *"
                  placeHolder="Enter Your WhatsApp No"
                  type="number"
                />
                <CompanyTextField
                  name="alternatePhoneNumber"
                  title="Alternet Phone No. (Optional)"
                  placeHolder="Enter Your Alternet Phone No"
                  type="number"
                />
              </div>
              <CompanyTextField
                name="emailID"
                title="Email Id *"
                placeHolder="Enter Your Email"
                type="email"
              />
            </div>
            <CompanyImageUploader
              bannerPath={objForm.getValues("logoPath")}
              logoPath={objForm.getValues("bannerPath")}
              setBannerPath={(path: string) => {
                objForm.setValue("logoPath", path);
              }}
              setLogoPath={(path: string) => {
                objForm.setValue("bannerPath", path);
              }}
            />
          </div>
          <div className="row grid grid-cols-2 flex-wrap -mr-3 -ml-3 gap-8">
            <div className="leftSide px-3 grid grid-cols-2 gap-8">
              <CompanyTextField
                name="houseNumber"
                title="House No, Street, Area *"
                placeHolder="Enter House No, Street (Area)"
                type="text"
              />
              <div className="form_field border-b-[1px]border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 mb-16 transition-all duration-300 ease-linear">
                <label className="font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none">
                  Country *
                </label>
                <select
                  className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
                  name="cname"
                  placeholder="India"
                  disabled
                >
                  <option value="India">India</option>
                </select>
              </div>
            </div>
            <div className="rightSide grid grid-cols-3 gap-8">
              {lstStates && (
                <CompanyStateAndCitySelector lstStates={lstStates} />
              )}
              <CompanyTextField
                name="postalCode"
                title="Postal Code *"
                placeHolder="Enter Postcode"
                type="number"
              />
            </div>
          </div>

          <CompanyTextField
            name="companyEstDate"
            title="Company Est Date"
            type="date"
          />
          <CompanyWorkingHoursSelectorField
            handleDayChange={(e: any) => {
              objForm.setValue("workingHoursDay", e.target.value);
            }}
            handleFromTime={(e: any) => {
              objForm.setValue("workingHoursFromTime", e.target.value);
            }}
            handleToTime={(e: any) => {
              objForm.setValue("workingHoursToTime", e.target.value);
            }}
          />
          <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
            <label className="font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none">
              About Company
            </label>
            <textarea
              className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
              name="cname"
              placeholder="Add Company Business / Description"
              rows={8}
            />
          </div>
          <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
            <label className="font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none">
              Map Address
            </label>
            <div className="flex items-center justify-center">
              <input
                className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] py-14"
                placeholder="Enter Map Address  Eg. Area, City"
                type={"text"}
                {...objForm.register("mapAddress")}
              />
              <button
                style={{
                  transition: "all 0.3s linear",
                }}
                type="button"
                className="py-4 font-medium text-center text-3xl w-2/12 text-black bg-primary-main hover:bg-secondary-main border-[1px] border-secondary-main rounded-[5rem]"
                onClick={getMapLocation}
              >
                Get Location
              </button>
            </div>
          </div>
          <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
            <label className="font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none">
              Map
            </label>
            <div className="w-full h-[400px] relative">
              <MapInformation
                displayName={mapLocation?.displayname}
                lat={mapLocation?.lat}
                lon={mapLocation?.lon}
                setMapData={({ lat, lon }: any) => {
                  setMapLocation({
                    lat: lat,
                    lon: lon,
                    displayname: "",
                  });
                }}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="form_field pb-16 space-x-8 w-1/4 flex justify-end">
              <button
                style={{
                  transition: "all 0.3s linear",
                }}
                type="submit"
                className="py-4 font-medium text-center text-3xl w-full hover:text-white text-primary-light bg-primary-main hover:bg-secondary-main border-[1px] border-secondary-main rounded-[5rem]"
              >
                Save Changes
              </button>
              <button
                style={{
                  transition: "all 0.3s linear",
                }}
                className="py-4 font-medium text-center text-3xl w-[60%] bg-secondary-main border-[1px] border-secondary-main btnHoverEffect text-white rounded-[5rem]"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
