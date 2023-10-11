export default function ShowFormFieldError({ error }: { error: string }) {
  return (
    <>
      <h1 className="text-red-500 text-2xl mt-4 font-medium text-lef">
        {error}
      </h1>
    </>
  );
}
