import { faMap, faMessage, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RedTheme() {
  return (
    <div className="bg-white container_fluid w-[575px] h-screen m-auto max-w-full">
      <section
        className="profile_section text-white relative h-[40vh]"
        style={{
          borderRadius: "0 0 300px 300px",
          backgroundImage:
            "-webkit-linear-gradient( 90deg, rgb(141,28,154) 50%, rgb(212,0,0) 150%)",
        }}
      >
        <div className="container h-full inline-flex justify-center items-center pb-12">
          <div className="row profile_row flex flex-wrap -mr-3 -ml-3">
            <div className="profile_name w-full text-center shrink-0 max-w-full">
              <h1 className="store_name text-white">Prismitsystems</h1>
              <h2 className="store_tubelight text-white font-normal">
                "IT Company",
              </h2>
            </div>
            <div className="text-center w-full">
              <div
                className="profile_image w-64 h-64 rounded-50 bg-white flex items-center justify-center  overflow-hidden m-auto xs:top-[67%] md:top-[80%] left-0 right-0 absolute translate-y-(-20%) border-[0.8rem] border-white border-solid "
                style={{
                  boxShadow: "0 0 10px rgb(191 191 191 / 50%)",
                }}
              >
                <img
                  src="/assets/loginScreen/login_img.webp"
                  className="w-full h-full object-cover rounded-50 object-center"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="profile_body pt-32"
          style={{
            border: "4rem 4rem 0 0",
          }}
        >
          <div className="container contact-section mt-20">
            <div className="row justify-content-center justify-center flex flex-wrap m-auto">
              <div className="col-12 w-full">
                <a
                  href="/"
                  className="contact-link mb-8 rounded-xl bg-gray-100  items-center flex"
                >
                  <span className="link-icon w-20 h-20 rounded-2xl mr-4 flex items-center justify-center bg-theme01">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-5xl text-white"
                    />
                  </span>
                  <span className="c-text ml-4 text-black text-2xl">
                    +918238255166
                  </span>
                </a>
              </div>
              <div className="col-12 w-full">
                <a
                  href="/"
                  className="contact-link mb-8 rounded-xl bg-gray-100  items-center flex"
                >
                  <span className="link-icon w-20 h-20 rounded-2xl mr-4 flex items-center justify-center bg-theme01">
                    <FontAwesomeIcon
                      icon={faMessage}
                      className="text-5xl text-white"
                    />
                  </span>
                  <span className="c-text ml-4 text-black text-2xl">
                    samir@shaikh.com
                  </span>
                </a>
              </div>
              <div className="col-12 w-full">
                <a
                  href="/"
                  className="contact-link mb-8 rounded-xl bg-gray-100  items-center flex"
                >
                  <span className="link-icon w-20 h-20 rounded-2xl mr-4 flex items-center justify-center bg-theme01">
                    <FontAwesomeIcon
                      icon={faMap}
                      className="text-5xl text-white"
                    />
                  </span>
                  <span className="c-text ml-4 text-black text-2xl">
                    Mithikhad limbayat surat
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
