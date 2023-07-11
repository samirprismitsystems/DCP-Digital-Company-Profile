import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import CompanyTextField from "@/components/CompanyDetailsPage/FormFields/CompanyTextField";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { companyDetailsFormSchema } from "@/services/forms/formSchema";
import { ICompanyDetails, IMap } from "@/types/commonTypes";
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
import AuthService from "@/services/AuthServices";

export default function CompanyDetailsPage() {
  const [objCompanyDetails, setObjCompanyDetails] = useState<ICompanyDetails>();

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
      businessType:
        (objCompanyDetails && objCompanyDetails.business_segment) || "",
      city: objCompanyDetails?.city || "",
      companyEstDate: "",
      country: objCompanyDetails?.country || "India",
      emailID: objCompanyDetails?.company_email || "",
      fullName: "",
      houseNumber: "",
      mapAddress: "",
      state: objCompanyDetails?.state || "",
      workingHours: "",
      alternatePhoneNumber: objCompanyDetails?.company_alternate_contact || "",
    },
    resolver: yupResolver(companyDetailsFormSchema),
  });

  console.log(objForm.formState.errors);
  const onSave = (data: IFormData) => {
    console.log("hi", data);

    try {
      let io = new FormData();
      // let slug = this.$refs.cname.value.replace(/[^a-zA-Z ]/g, "");
      // let company_slug = slug
      //   .replace(" ", "-")
      //   .replace(/\s+/g, "")
      //   .toLowerCase();

      // io.append("user_id", AuthService.getUserEmail());
      // io.append("company_name", this.$refs.cname.value);
      // io.append("company_slug", company_slug);
      // io.append("company_desc", this.$refs.cdesc.value);
      // io.append("established_in", this.$refs.esdate.value);
      // io.append("business_segment", this.$refs.bsegment.value);
      // // io.append('address',this.$refs.address.value);
      // io.append("area", this.$refs.area.value);
      // io.append("city", this.city);
      // io.append("state", this.state);
      // io.append("country", this.country);
      // io.append("post_code", this.$refs.postcode.value);
      // io.append("company_email", this.$refs.cemail.value);
      // io.append("company_contact", this.$refs.cnumber.value);
      // io.append("company_alternate_contact", this.$refs.canumber.value);
      // io.append("working_hours_day", this.workingdays);
      // io.append("working_hours_from", this.$refs.fromtime.value);
      // io.append("working_hours_to", this.$refs.totime.value);
      // io.append("map_lat", this.osmdata.lat);
      // io.append("map_lng", this.osmdata.lon);
      // io.append("isupdate", false);

      // if (this.ischangepic == true) {
      //   io.append("company_logo", this.companydata.logo);
      //   this.ischangepic = false;
      // }

      // if (this.ischangebannerpic == true) {
      //   io.append("company_banner", this.companydata.banner);
      //   this.ischangepic = false;
      // }

      // if (this.isupdate == true) {
      //   io.append("company_id", this.company_id);
      //   io.append("logo", this.logo);
      //   io.append("banner", this.banner);
      //   io.append("isupdate", true);
      // }
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
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

  const loadData = async () => {
    try {
      const res = await ApiService.getCompanyDetailsPageData();
      if (!res.error) {
        setObjCompanyDetails(res.company[0]);
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
  }, []);

  if (!objCompanyDetails) return null;

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
                  <option value={"India"} selected>
                    India
                  </option>
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
          <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
            <label className="font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none">
              Map
            </label>
            <div className="w-full h-[400px] relative z-0">
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
