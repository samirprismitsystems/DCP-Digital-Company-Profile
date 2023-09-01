import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function AdminSocialLinkSelector({
  indexNumber,
  lstSocialMediaColor,
  selectedColorId,
}: {
  indexNumber: number;
  selectedColorId: number;
  lstSocialMediaColor: any;
}) {
  const [selectedColor, setSelectedColor] = useState("");
  const objForm = useFormContext();

  useEffect(() => {
    if (lstSocialMediaColor && selectedColorId) {
      const selectedColorObject = lstSocialMediaColor.find(
        (color: any) => color.socialmedia_color_id === selectedColorId
      );

      if (selectedColorObject) {
        objForm.setValue(
          `adminSocialMediaInfo.${indexNumber}.socialmedia_color`,
          selectedColorObject.socialmedia_color_id
        );
        setSelectedColor(selectedColorObject.socialmedia_color_id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lstSocialMediaColor, selectedColorId]);

  return (
    <>
      <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black my-4 transition-all duration-300 ease-linear">
        <div className="flex">
          <select
            className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
            onChange={(e: any) => {
              if (Boolean(e.target.value)) {
                objForm.setValue(
                  `adminSocialMediaInfo.${indexNumber}.socialmedia_color`,
                  e.target.value
                );

                setSelectedColor(e.target.value);
              } else {
                objForm.setValue(
                  `adminSocialMediaInfo.${indexNumber}.socialmedia_color`,
                  "1"
                );

                setSelectedColor("1");
              }
            }}
            value={selectedColor}
          >
            {lstSocialMediaColor &&
              lstSocialMediaColor.map((item: any, index: number) => (
                <option key={index} value={item.socialmedia_color_id}>
                  {item.socialmedia_color_name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </>
  );
}
