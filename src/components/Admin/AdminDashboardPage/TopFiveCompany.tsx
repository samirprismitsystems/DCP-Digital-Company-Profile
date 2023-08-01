import { ICompanyDetails } from "@/types/companyTypes";

export default function TopFiveCompany({
  lstCompany,
}: {
  lstCompany: ICompanyDetails[];
}) {
  return (
    <>
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-3xl text-primary-main bg-secondary-greyDark text-center p-3">
              <th scope="col" className="px-6 py-3">
                Company Name
              </th>
              <th scope="col" className="px-6 py-3">
                Company ESTD.
              </th>
              <th scope="col" className="px-6 py-3">
                Company Email
              </th>
              <th scope="col" className="px-6 py-3">
                Company Contact
              </th>
            </tr>
          </thead>
          {lstCompany.map((item, index: number) => (
            <tbody
              key={index}
              className="text-2xl text-center p-[10px] align-middle text-secondary-main"
            >
              {index % 2 == 0 ? (
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <td className="px-6 py-4">{item.company_name}</td>
                  <td className="px-6 py-4">{item.established_in}</td>
                  <td className="px-6 py-4">{item.company_email}</td>
                  <td className="px-6 py-4">{item.company_contact}</td>
                </tr>
              ) : (
                <tr className="border-b bg-primary-main">
                  <td className="px-6 py-4">{item.company_name}</td>
                  <td className="px-6 py-4">{item.established_in}</td>
                  <td className="px-6 py-4">{item.company_email}</td>
                  <td className="px-6 py-4">{item.company_contact}</td>
                </tr>
              )}
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}
