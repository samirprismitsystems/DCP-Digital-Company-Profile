import { Controller, useFormContext } from "react-hook-form";

export default function CompanyWorkingHoursField() {
  
  const { control, register } = useFormContext();
  return (
    <>
      <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
        <label className="font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none">
          Working Hours
        </label>
        <div className="select_working_hour flex flex-wrap items-center m-0 ">
          <div className="days_select flex items-center">
            <div className="day font-light text-3xl mr-4 text-black">Day</div>
            <Controller
              name="workingHoursDay"
              control={control}
              defaultValue="All"
              render={({ field }) => (
                <select
                  {...field}
                  placeholder="select working days"
                  className="bg-info-dark rounded-xl focus-within:outline-none mr-4 p-2 text-3xl text-secondary-main"
                >
                  <option value="All">All</option>
                  <option value="mtf">Monday to Friday</option>
                  <option value="mts">Monday to Saturday</option>
                </select>
              )}
            />
          </div>
          <div className="time_select flex items-center">
            <input
              type="time"
              placeholder=""
              className="bg-info-dark text-secondary-main p-2 mr-4 rounded-xl font-light text-3xl focus-within:outline-none"
              {...register("workingHoursFromTime")}
            />
          </div>
          <span className="text-black text-3xl mr-4">TO</span>
          <div className="time_select flex items-center">
            <input
              type="time"
              placeholder=""
              className="bg-info-dark text-secondary-main p-2 mr-4 rounded-xl font-light text-3xl focus-within:outline-none"
              {...register("workingHoursToTime")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
