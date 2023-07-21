export default function RedThemeHeading({ title }: { title: string }) {
  return (
    <div
      className="p-4 mb-8 rounded-3xl mt-16"
      style={{
        backgroundImage:
          "-webkit-linear-gradient( 0deg, rgb(141,28,154) 0%, rgb(212,0,0) 100%)",
      }}
    >
      <h3 className="text-center text-white  font-semibold  m-0 capitalize">
        {title}
      </h3>
    </div>
  );
}
