import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { IPagesInfo } from "@/types/commonTypes";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";
import { useRouter } from "next/router";

export default function Pages() {
  const objForm = useFormContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lstFooterPage, setLstFooterPage] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<any>(
    objForm.getValues("footerPages") || []
  );
  const router = useRouter();

  const loadAgain = (arr: any) => {
    setLstFooterPage(arr);
    if (
      objForm.getValues("isEdit") &&
      selectedOption &&
      selectedOption.length > 0
    ) {
      let newArr: any = [];
      const parseList = JSON.parse(selectedOption);
      let mainList =
        typeof selectedOption === "string" ? parseList : selectedOption;
      for (let item of mainList) {
        if (arr && arr.length > 0) {
          arr.forEach((data: any) => {
            if (parseInt(data.value) === parseInt(item)) {
              let objItem = {
                label: data.label,
                value: data.value,
              };
              newArr.push(objItem);
            }
          });
        }
      }
      setSelectedOption(newArr);
    }
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getAllPagesInfo();
      if (!res.error) {
        let arr: any = [];
        res.pages.forEach((item: IPagesInfo, index: number) => {
          let objItem = {
            label: item.page_name,
            value: item.page_id,
          };
          arr.push(objItem);
        });
        loadAgain(arr);
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) return <h6>Loading....</h6>;
  return (
    <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 mb-16 transition-all duration-300 ease-linear">
      <label
        className={`font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none`}
      >
        Select Footer Pages
      </label>
      <Select
        className="text-4xl"
        defaultValue={selectedOption}
        onChange={(selectedValue) => {
          objForm.setValue("footerPages", selectedValue);
          setSelectedOption(selectedValue);
        }}
        isMulti={true}
        options={lstFooterPage}
        placeholder={"Footer list"}
      />
    </div>
  );
}
