export default function GetHeader({ title }: { title: string }) {
  return (
    <div
      className="p-6  rounded-3xl mt-16"
      style={{
        backgroundImage:
          "-webkit-linear-gradient( 0deg, rgb(141,28,154) 0%, rgb(212,0,0) 100%)",
      }}
    >
      <h3 className="c-text text-center text-white  font-medium  m-0 text-5xl capitalize">
        {title}
      </h3>
    </div>
  );
}
