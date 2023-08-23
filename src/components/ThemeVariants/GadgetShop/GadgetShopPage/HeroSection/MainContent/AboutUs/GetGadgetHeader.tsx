export default function GetGadgetHeader({ title }: { title: string }) {
  return (
    <>
      <div className="bg-gadgetTheme-primary p-4 xs:ml-[-3rem] xs:mr-[-1.8rem] md:-mx-12 my-16 text-center">
        <h3 className="text-white capitalize gadgetfontfamily xs:text-[2.9rem] md:text-[2.4rem] font-semibold">
          {title}
        </h3>
      </div>
    </>
  );
}
