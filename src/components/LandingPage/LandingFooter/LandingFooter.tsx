import Image from "next/image";
import Link from "next/link";
import FooterTopContent from "./FooterTopContent";

export default function LandingFooter() {
  return (
    <footer>
      <FooterTopContent />
      <section
        className="w-full xs:flex-col xs:text-center p-12 border-t border-primary-lightDark flex md:flex-row md:justify-between md:text-left item-center px-16"
        style={{
          backgroundColor: "rgba(18, 110, 131, 0.5)",
        }}
      >
        <div className="col-md-6 col-sm-12  left-col md:w-[50%]">
          <p className="xs:mb-2  text-white">
            Copyright @2023{" "}
            <Link href="/" className="text-primary-lightDark">
              Digital Company Profile
            </Link>
            . All rights reserved
          </p>
        </div>
        <div className="sm:mt-2 xs:mt-4 md:w-[50%]">
          <div className="xs:flex-col xs:items-center flex md:justify-end md:item-center space-x-4 md:flex-row lg:items-center">
            <Link
              href="https://www.prismitsystems.com/"
              className="text-primary-lightDark xs:mb-4 md:mb-0 text-[1.8rem]"
            >
              A Prism I. T. Systems Enterprise
            </Link>
            <Image
              width={57}
              height={38}
              src="/assets/landingpage/landing/company_logo.png"
              alt="Prism I. T. Systems"
              title="Prism I. T. Systems"
            />
          </div>
        </div>
      </section>
    </footer>
  );
}
