import GetHeader from "../common/GetHeader";

export default function PortfolioContactUs() {
  const onSave = async (e: any) => {
    e.preventDefault();
    console.log("contact form");
  };

  return (
    <div className="contact-box" id="contactus">
      <GetHeader title="Contact Us" />
      <form onSubmit={onSave} className="c-text pt-9 pb-32 -mb-12">
        <input
          required={true}
          type="text"
          className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
          placeholder="Enter Your Name"
        />
        <input
          required={true}
          type="text"
          className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
          placeholder="Enter Your Mobile Number"
        />
        <input
          required={true}
          type="email"
          className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
          placeholder="Enter Your Email"
        />
        <textarea
          className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
          cols={5}
          rows={5}
          required={true}
          placeholder="Enter Your Feedback"
        />
        <button
          type="submit"
          className="w-full max-h-[375px] bg-[#4d4d4d] text-center py-6 px-8 capitalize text-4xl c-text text-white rounded-lg"
          onClick={() => {
            console.log("data submitted");
            // onSave()
          }}
          style={{
            borderRadius: "13px",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
