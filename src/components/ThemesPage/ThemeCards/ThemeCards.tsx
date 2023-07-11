import { useState } from "react";

export default function ThemeCards() {
  const [isSelected, setIsSelected] = useState(false);
  const toggle = () => {
    console.log(isSelected);
    setIsSelected(!isSelected);
  };

  return (
    <div className="flex flex-wrap flex-col">
      <div className="flex items-center justify-between mb-2">
        <h5>
          Theme #<span className="count">1</span>
        </h5>
      </div>
      <div
        style={{
          border: "1px solid #ccc",
          boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgb(255, 255, 255)",
        }}
        className="item_div p-6 rounded-xl"
      >
        <div className="item_image mb-4 w-full h-[20rem] border-0 bg-primary-main">
          <img
            src=""
            alt="image"
            className="w-full  h-full object-cover  object-center align-middle border-none"
          />
        </div>
        <div data-v-1dcf67d3="">
          <label
            data-v-1dcf67d3=""
            className="flex cursor-pointer font-medium relative overflow-hidden not-italic  text-[1.8rem] leading-[1.3] text-black select-none mb-4 shadow-[inset 0 0 0 0.4375em #126e83]"
          >
            <input
              data-v-1dcf67d3=""
              className="absolute hidden z-[-9999px] text-black"
              type="radio"
              value="1"
            />
            <span
              onClick={toggle}
              data-v-1dcf67d3=""
              className={` before:flex before:shadow-[inset 0 0 0 0.4375em #126e83] hover:bg-[#d6d6e5] ${
                isSelected && "bg-[#d6d6e5]"
              } before:border-[1px] before:border-secondary-main before:mr-4  before:shrink-0 before:content-["] before:bg-white before:w-[1.5em] before:h-[1.5em] before:rounded-[50%]   before:transition-all before:duration-[0.25s] before:ease-in before:shadow-${
                isSelected ? "[inset 0 0 0 0.125em #126e83]" : "none"
              }}`}
            >
              Red Theme
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
