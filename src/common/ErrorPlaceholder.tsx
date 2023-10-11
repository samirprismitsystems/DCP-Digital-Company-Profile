import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { useDispatch } from "react-redux";

export default function ErrorPlaceholder({
  error,
  link,
}: {
  error: string;
  link?: boolean;
}) {
  const dispatch = useDispatch();

  return (
    <div className="block m-auto w-full text-black bg-red-300 rounded-md p-8 text-2xl">
      {error}{" "}
      {link && (
        <button
          onClick={() => {
            dispatch(
              setSelectedObj({ selectedIndex: 1, selectedTitle: "company" })
            );
            if (typeof window !== "undefined") {
              window.history.replaceState("company", "", `/dashboard/company`);
            }
          }}
          className="ml-4 font-medium underline text-blue-600"
          type="button"
        >
          {"Click here"}
        </button>
      )}
    </div>
  );
}
