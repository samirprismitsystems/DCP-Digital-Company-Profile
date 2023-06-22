import Link from "next/link";

export default function MobileSideBar({ toggle }: { toggle: () => void }) {
  return (
    <>
      <div className="flex md:hidden">
        <Link href="#" className="btnHoverEffect  w-40 text-white  text-center">
          <button className="lg:hidden py-4 font-semibold text-center text-3xl rounded text-white">
            Login
          </button>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          onClick={toggle}
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-12 h-12 bg-transparent text-black"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
}
