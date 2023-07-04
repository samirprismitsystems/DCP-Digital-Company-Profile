import { useRouter } from "next/router";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-white">
      <h1 className="text-center text-5xl md:text-7xl pb-6 text-white">
        Page Not Found
      </h1>
      <h2 className="text-center text-xl md:text-2xl text-white">
        The requested page could not be found.
      </h2>
      <button
        className="mt-8 btnHoverEffect py-3 px-6 text-xl md:text-2xl"
        onClick={() => {
          router.back();
        }}
      >
        Go Back
      </button>
    </div>
  );
}
