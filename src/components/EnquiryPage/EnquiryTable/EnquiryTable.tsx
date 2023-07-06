import { useState } from "react";

export default function EnquiryTable() {
  const [isActive, setIsActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const toggle = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="relative overflow-x-auto py-16">
        <table className="w-full text-left text-black">
          <thead className="text-black font-semibold text-3xl capitalize bg-gray-100 ">
            <tr>
              <th scope="col" className="px-6 py-5 text-2xl">
                Client Name
              </th>
              <th scope="col" className="px-6 py-5 text-2xl">
                Client Email
              </th>
              <th scope="col" className="px-6 py-5 text-2xl">
                Comments
              </th>
              <th scope="col" className="px-6 py-5 text-2xl">
                Ratting
              </th>
              <th scope="col" className="px-6 py-5 text-2xl">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-2xl  text-black">
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-6 font-normal whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="font-normal  px-6 py-6">Silver</td>
              <td className="font-normal  px-6 py-6">Laptop</td>
              <td className="font-normal  px-6 py-6">$2999</td>
              <td className="font-normal  px-6 py-6">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    onChange={toggle}
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                  />
                  <div
                    className={`w-24 h-12 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-3 ${
                      isActive ? "after:left-[20px]" : "after:left-[5px]"
                    } after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
                  ></div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-center pb-16">
        <nav aria-label="Page navigation example" className="py-4">
          <ul className="inline-flex text-base h-10">
            <li>
              <a
                href="#"
                className="py-7 flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex py-7 px-7 items-center justify-center h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex py-7 px-7 items-center justify-center h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                className=" py-7 flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
