import React from "react";

export default function Footer() {
  return (
    <section
      className="w-full xs:flex-col xs:text-center p-12 border-t border-primary-lightDark flex md:flex-row md:justify-between md:text-left item-center px-16"
      style={{
        backgroundColor: "rgba(18, 110, 131, 0.5)",
      }}
    >
      <div className="col-md-6 col-sm-12  left-col md:w-[50%]">
        <p className="xs:mb-2">
          Copyright @2021{" "}
          <a href="/" className="text-primary-lightDark">
            Digital Company Profile
          </a>
          . All rights reserved
        </p>
      </div>
      <div className="sm:mt-2 xs:mt-4 md:w-[50%]">
        <p className="xs:flex-col xs:items-center flex md:justify-end md:item-center space-x-4 md:flex-row">
          <a
            href="https://www.prismitsystems.com/"
            className="text-primary-lightDark xs:mb-10 sm:mb-6"
          >
            A Prism I. T. Systems Enterprise
          </a>
          <img
            src="assets/landing/company_logo.png"
            width="57"
            height="38"
            alt="Prism I. T. Systems"
            title="Prism I. T. Systems"
          />
        </p>
      </div>
    </section>
  );
}
