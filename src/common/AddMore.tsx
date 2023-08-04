export default function AddMore({ onClick, label }: any) {
  return (
    <>
      <button
        className="font-medium add_btn cursor-pointer  bg-white text-secondary-main rounded-xl sm:min-w-[15rem] xs:min-w-full py-5 px-9 text-2xl text-center mb-16 capitalize border-solid border-[1px] border-primary-light"
        style={{
          transition: "all 0.3s linear",
        }}
        type="button"
        onClick={onClick}
      >
        {label ? label : "Add More"}
      </button>
    </>
  );
}
