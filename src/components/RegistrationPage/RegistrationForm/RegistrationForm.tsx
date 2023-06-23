export default function RegistrationForm() {
  return (
    <>
      <form className="sm:px-16 md:w-3/4 xl:w-4/5 md:m-auto">
        <div className="py-4 grid grid-cols-2 gap-4 items-center">
          <div>
            <label
              className="block mb-4 font-normal px-2 text-black text-3xl"
              htmlFor="username"
            >
              First Name
            </label>
            <input
              className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
              type="text"
              placeholder="Enter Your First Name"
            />
          </div>
          <div>
            <label
              className="block mb-4 font-normal px-2 text-black text-3xl"
              htmlFor="username"
            >
              Last Name
            </label>
            <input
              className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
              type="text"
              placeholder="Enter Your Last Name"
            />
          </div>
        </div>
        <div className="py-8">
          <label
            className="block mb-4 font-normal px-2 text-black text-3xl"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
            type="text"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="py-8">
          <label
            className="block mb-4 font-normal px-2 text-black text-3xl"
            htmlFor="username"
          >
            Mobile No*
          </label>
          <input
            className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
            type="text"
            placeholder="Enter Your Mobile Number"
          />
        </div>
        <div className="py-8">
          <label
            className="block mb-4 font-normal px-2 text-black text-3xl"
            htmlFor="username"
          >
            Create Your Password*
          </label>
          <input
            className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
            type="text"
            placeholder="Enter 6 Digit Password "
          />
        </div>
        <div className="pt-8">
          <label
            className="block mb-4 font-normal px-2 text-black text-3xl"
            htmlFor="username"
          >
            Confirm Your Password*
          </label>
          <input
            className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
            type="text"
            placeholder="Enter 6 Digit Password "
          />
        </div>
        <div className="w-full text-center">
          <button
            type="submit"
            className="border py-4 px-14 text-3xl my-8 btnHoverEffect  text-white text-center"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
