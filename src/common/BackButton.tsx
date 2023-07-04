import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => {
          router.back();
        }}
        className="text-white cursor-pointer bg-[#666666] border-0 hover:transition-all hover:duration-300 hover:ease-linear rounded-xl text-[2rem] min-w-[12rem] mb-16 px-10 py-3 font-semibold"
      >
        <FontAwesomeIcon
          size="1x"
          className="mr-4 font-bold"
          icon={faArrowLeft}
        />
        Back
      </button>
    </>
  );
}
