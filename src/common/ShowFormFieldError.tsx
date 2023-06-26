export default function ShowFormFieldError({ error }: { error: string }) {
  return (
    <div>
      <h1 className="text-red-500 text-2xl mt-4 font-medium">{error}</h1>
    </div>
  );
}
