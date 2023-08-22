import Image from "next/image";
import HomeCarePagination from "../../Common/HomeCarePagination";

export default function HomeCareVideos() {
  return (
    <>
      <div
        id="video"
        className="border border-solid border-homeCareTheme-opacityBorder bg-white rounded-3xl p-5 mb-10"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <h4 className="pt-4 text-[22px] text-center text-black  font-bold mb-6 homecarefont">
          Videos
        </h4>
        <div className="homecarefont pt-4 pb-8 px-4 grid xs:grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="image w-full h-auto py-6">
            <video
              autoPlay={true}
              muted={true}
              className="w-auto h-auto"
              poster="/assets/homecare/video-placeholder.jpg"
            >
              <source src="#" type="video/mp4" />
            </video>
          </div>
          <div className="image w-full h-auto py-6">
            <video
              autoPlay={true}
              muted={true}
              className="w-auto h-auto"
              poster="/assets/homecare/video-placeholder.jpg"
            >
              <source src="#" type="video/mp4" />
            </video>
          </div>
          <div className="image w-full h-auto py-6">
            <video
              autoPlay={true}
              muted={true}
              className="w-auto h-auto"
              poster="/assets/homecare/video-placeholder.jpg"
            >
              <source src="#" type="video/mp4" />
            </video>
          </div>
          <div className="image w-full h-auto py-6">
            <video
              autoPlay={true}
              muted={true}
              className="w-auto h-auto"
              poster="/assets/homecare/video-placeholder.jpg"
            >
              <source src="#" type="video/mp4" />
            </video>
          </div>
          <div className="image w-full h-auto py-6">
            <video
              autoPlay={true}
              muted={true}
              className="w-auto h-auto"
              poster="/assets/homecare/video-placeholder.jpg"
            >
              <source src="#" type="video/mp4" />
            </video>
          </div>
          <div className="image w-full h-auto py-6">
            <video
              autoPlay={true}
              muted={true}
              className="w-auto h-auto"
              poster="/assets/homecare/video-placeholder.jpg"
            >
              <source src="#" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </>
  );
}
