import React from "react";
import { CgCloseO } from "react-icons/cg";
import useFetchDetails from "../hooks/useFetchDetails";

const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData } = useFetchDetails(
    `/${media_type}/${data}/videos`
  );
//   console.log("videoData", videoData);
//   console.log("data", data);

  return (
    <section className="fixed bg-neutral-700 top-0 bottom-0 right-0 left-0 z-40 bg-opacity-40 flex justify-center items-center">
      <div className="bg-black w-full max-h[80vh] max-w-screen-lg aspect-video rounded relative">
        <button
          onClick={close}
          className="absolute -right-1 -top-4 text-3xl z-40"
        >
          <CgCloseO />
        </button>
        <iframe src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`} title={`YouTube video - ${videoData?.results[0]?.name || "Video"}`} className="h-full w-full"/>
      </div>
    </section>
  );
};

export default VideoPlay;
