import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { IPagesInfo } from "@/types/commonTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";

export default function FooterPageSelector() {
  const objForm = useFormContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lstFooterPage, setLstFooterPage] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<any>(
    objForm.getValues("footer_pages") || []
  );
  const router = useRouter();

  const loadAgain = (arr: any) => {
    setLstFooterPage(arr);
    if (
      objForm.getValues("footer_pages") &&
      objForm.getValues("footer_pages").length > 0
    ) {
      let newArr: any = [];
      let mainList =
        typeof objForm.getValues("footer_pages") === "string"
          ? JSON.parse(objForm.getValues("footer_pages"))
          : objForm.getValues("footer_pages");
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
      const initialValue = objForm.getValues("footer_pages") || [];
      setSelectedOption(initialValue);
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
      // console.log(ex.message);
      router.push('/');
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
          objForm.setValue("footer_pages", selectedValue);
          setSelectedOption(selectedValue);
        }}
        isMulti={true}
        options={lstFooterPage}
        placeholder={"Footer list"}
      />
    </div>
  );
}
