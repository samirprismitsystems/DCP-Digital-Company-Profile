import React from "react";
import RedThemeHeading from "./common/RedThemeHeading";

export default function RedThemeAboutUs() {
  return (
    <div className="about_block ">
      <RedThemeHeading title={"About us"} />
      <div className="content_col ">
        <p className="text-2xl text-redThemeGreyTextColor">
          <strong>Since 2009</strong>
        </p>
        <p className="text-redThemeGreyTextColor">
          Good Company For IT. Wording If you need help with IT-related stuff,
          whether it be for specific hardware or software, then you need the
          services provided by an IT company. IT companies are experts or
          professionals when it comes to installing, fixing, updating, and
          troubleshooting any IT-related issues or problems you might have.
        </p>
      </div>
    </div>
  );
}
