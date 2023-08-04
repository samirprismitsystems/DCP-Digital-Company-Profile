export default function RemoveItem({ onChange, label }: any) {
  return (
    <>
      <div className="flex w-full xs:flex-wrap sm:flex-nowrap space-x-6">
        <button
          className="font-medium add_btn cursor-pointer  bg-white text-secondary-main rounded-xl sm:min-w-[15rem] xs:min-w-full py-5 px-9 text-2xl text-center mb-16 capitalize border-solid border-[1px] border-primary-light"
          style={{
            transition: "all 0.3s linear",
          }}
          type="button"
          onClick={onChange}
        >
          {label ? label : "Remove"}
        </button>
      </div>
    </>
  );
}
