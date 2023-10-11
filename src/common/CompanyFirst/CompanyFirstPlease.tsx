import ErrorPlaceholder from "../ErrorPlaceholder";

export default function CompanyFirstPlease() {
  return (
    <>
      <div className="pb-9">
        <ErrorPlaceholder
          link={true}
          error="Please Setup Company Details First!"
        />
      </div>
    </>
  );
}
