import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import CompanyTextField from "@/components/CompanyDetailsPage/FormFields/CompanyTextField";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { companyDetailsFormSchema } from "@/services/forms/formSchema";
import { IMap } from "@/types/commonTypes";
import { IAPICompanyDetailsPage, IStates } from "@/types/companyTypes";
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
  const [isChange, setIsChange] = useState<boolean>(false);
  const [lstStates, setState] = useState<IStates[]>();
  const [mapLocation, setMapLocation] = useState<IMap>();
  const [objImageUploader, setObjImageUploader] = useState<any>();

  type IFormData = yup.InferType<typeof companyDetailsFormSchema>;
  const objForm = useForm({
    defaultValues: {
      aboutCompany: "",
      businessType: "",
      city: "",
      companyEstDate: "",
      country: "India",
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

  const onSave = async (data: IFormData) => {
    try {
      let io: any = new FormData();
      let slug = data.fullName?.replace(/[^a-zA-Z ]/g, "");
      let company_slug = slug
        ?.replace(" ", "-")
        .replace(/\s+/g, "")
        .toLowerCase();

      io.append("user_id", AuthService.getUserEmail());
      io.append("company_name", data.fullName);
      io.append("company_slug", company_slug || data.fullName?.toLowerCase());
      io.append("company_desc", data.aboutCompany);
      io.append("established_in", data.companyEstDate);
      io.append("business_segment", data.businessType);
      io.append("area", data.houseNumber);
      io.append("city", data.city);
      io.append("state", data.state);
      io.append("country", data.country);
      io.append("post_code", data.postalCode);
      io.append("company_email", data.emailID);
      io.append("company_contact", data.phoneNumber);
      io.append("company_alternate_contact", data.alternatePhoneNumber);
      io.append("working_hours_day", data.workingHoursDay);
      io.append("working_hours_from", data.workingHoursFromTime);
      io.append("working_hours_to", data.workingHoursToTime);
      io.append("map_lat", data.mapLocation.lat);
      io.append("map_lng", data.mapLocation.lon);
      io.append("isupdate", true);
      io.append("company_id", data.companyID);
      io.append("logo", data.logoPath);
      io.append("banner", data.bannerPath);

      if (typeof data.company_banner === "object") {
        io.append("company_banner", data.company_banner);
      }
      if (typeof data.company_logo === "object") {
        io.append("company_logo", data.company_logo);
      }
      const res = await ApiService.saveCompanyDetailsPageData(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        onComplete();
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
        objForm.setValue("mapLocation.lat", parseFloat(res[0].lat as any));
        objForm.setValue("mapLocation.lon", parseFloat(res[0].lon));
        objForm.setValue("mapLocation.displayName", res[0].display_name);
        setMapLocation({
          lat: res[0].lat,
          lon: res[0].lon,
          displayname: res[0].display_name,
        });
        setIsChange(true);
        return null;
      }

      throw new Error("something went wrong while get map location!");
    } catch (Ex: any) {
      Utils.showErrorMessage(Ex.message);
    }
  };

  const loadData = async () => {
    try {
      const res = await ApiService.getCompanyDetailsPageData();
      if (!res.error) {
        const result: IAPICompanyDetailsPage = res.company[0];
        Utils.setItem("slug", result.company_slug);
        const defaultValue: IFormData = {
          alternatePhoneNumber: result.company_alternate_contact,
          businessType: result.business_segment,
          city: result.city,
          emailID: result.company_email,
          country: result.country,
          fullName: result.company_name,
          aboutCompany: result.company_desc,
          postalCode: result.post_code,
          state: result.state,
          phoneNumber: result.company_contact,
          houseNumber: result.area,
          companyEstDate: result.established_in,
          mapLocation: {
            lat: parseFloat(result.map_lat),
            lon: parseFloat(result.map_lng),
            displayName: result.area,
          },
          company_banner: result.company_banner,
          company_logo: result.company_logo,
          bannerPath: result.company_banner,
          logoPath: result.company_logo,
          workingHoursDay: result.working_hours_day,
          workingHoursFromTime: result.working_hours_from,
          workingHoursToTime: result.working_hours_to,
          companyID: result.company_id,
        };
        setMapLocation({
          lat: defaultValue.mapLocation.lat || 21.1875694,
          lon: defaultValue.mapLocation.lon || 72.8147383,
          displayname: defaultValue.mapLocation.displayName || "",
        });

        setObjImageUploader({
          banner: defaultValue.company_banner,
          logo: defaultValue.company_logo,
          ID: defaultValue.companyID,
        });

        objForm.reset(defaultValue);
        return null;
      }
      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  useEffect(() => {
    loadStates();
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isChange) {
      setIsChange(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChange]);

  return (
    <>
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
          <div className="row lg:grid lg:grid-cols-1 xl:grid-cols-2 xl:gap-8 lg:gap-8 xs:flex-wrap lg:flex-nowrap -mr-3 -ml-3 xs:flex justify-center">
            <div className="leftSide px-3">
              <CompanyTextField
                name="fullName"
                title="Full Name / Business Name / Company Name *"
                placeHolder="Enter Your Full Name / Business Name / Company Name"
                type="text"
                isRequired={true}
              />
              <CompanyTextField
                name="businessType"
                title="Business Type / Description *"
                placeHolder="Business Type / Description"
                type="text"
                isRequired={true}
              />
              <div className="grid grid-cols-2 gap-8">
                <CompanyTextField
                  name="phoneNumber"
                  title="Phone No. (WhatsApp No) *"
                  placeHolder="Enter Your WhatsApp No"
                  type="number"
                  isRequired={true}
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
                isRequired={true}
              />
            </div>
            {objImageUploader && (
              <CompanyImageUploader
                companyLogo={objImageUploader && objImageUploader.logo}
                companyBanner={objImageUploader && objImageUploader.banner}
                companyID={objImageUploader && objImageUploader.ID}
              />
            )}
            <div className="xs:hidden sm:block sm:mb-8 md:mb-8 lg:hidden"></div>
          </div>
          <div className="row grid md:grid-cols-1  xs:grid-cols-1 lg:grid-cols-2  flex-wrap -mr-3 -ml-3 gap-8">
            <div className="leftSide px-3 grid xs:grid-cols-1  sm:grid-cols-2 gap-8">
              <div className="xs:block sm:hidden lg:mt-8 xs:pt-4"></div>
              <CompanyTextField
                name="houseNumber"
                title="House No, Street, Area *"
                placeHolder="Enter House No, Street (Area)"
                type="text"
                isRequired={true}
              />
              <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black  mb-16 transition-all duration-300 ease-linear">
                <label
                  className={`font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none`}
                >
                  Country *
                </label>
                <select
                  disabled
                  className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
                  placeholder="Select City"
                  defaultValue={"India"}
                >
                  <option value={"India"}>India</option>
                </select>
              </div>
            </div>
            <div className="rightSide grid sm:grid-cols-3 md:grid-cols-3 xs:grid-cols-1 gap-8">
              {lstStates && (
                <CompanyStateAndCitySelector lstStates={lstStates} />
              )}
              <CompanyTextField
                name="postalCode"
                title="Postal Code *"
                placeHolder="Enter Postcode"
                type="number"
                isRequired={true}
              />
            </div>
          </div>
          <CompanyTextField
            name="companyEstDate"
            title="Company Est Date"
            type="date"
          />
          <CompanyWorkingHoursSelectorField />
          <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
            <label className="font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none">
              About Company
            </label>
            <textarea
              className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
              placeholder="Add Company Business / Description"
              rows={8}
              {...objForm.register("aboutCompany")}
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
                className="xs:hidden md:block py-4 font-medium text-center text-3xl w-2/12 md:w-96 text-black bg-primary-main hover:bg-secondary-main border-[1px] border-secondary-main rounded-[5rem]"
                onClick={getMapLocation}
              >
                Get Location
              </button>
            </div>
            <button
              style={{
                transition: "all 0.3s linear",
              }}
              type="button"
              className="xs:visible py-4 md:hidden font-medium text-center text-3xl xs:w-full text-black bg-primary-main hover:bg-secondary-main border-[1px] border-secondary-main rounded-[5rem]"
              onClick={getMapLocation}
            >
              Get Location
            </button>
          </div>
          {mapLocation && (
            <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
              <label className="font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none">
                Map
              </label>
              <div className="w-full h-[400px] relative z-0">
                <MapInformation
                  isChange={isChange}
                  setIsChange={setIsChange}
                  mapLocation={mapLocation}
                />
              </div>
            </div>
          )}
          <div className="w-full flex justify-end">
            <div className="xs:w-full sm:w-[60%] lg:w-[100%] xl:w-[80%]">
              <DashboardCommonButtons />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
