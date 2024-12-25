import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import HorizontalScollCard from "../components/HorizontalScollCard";
import useFetch from "../hooks/useFetch";
import VideoPlay from "../components/VideoPlay";

const DetailsPage = () => {
  const params = useParams();

  //console.log("PARAMS",params);

  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);

  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );

  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );

  const { data: recommendationsData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState(" ");

  const handlePlayVideo = (data) => {
    setPlayVideoId(data.id);
    setPlayVideo(true);
  };

  const imageURL = useSelector((state) => state.movieData.imageURL);

  // convert runtime into hour and mint

  //const duration = (data?.runtime/60).toFixed(1)?.split(".")

  const duration = data?.runtime;
  const hour = Math.floor(duration / 60);
  const mint = duration % 60;

  // console.log("PARAMS DATA", data);
  // console.log("PARAMS CASTDATA", castData);

  const directing = castData?.crew
    ?.filter((e) => e?.job === "Director of Photography")
    ?.map((e) => e.name)
    ?.join(", ");

  const art = castData?.crew
    ?.filter((e) => e?.department === "Art")
    ?.map((e) => e.name)
    ?.join(", ");

  const writing = castData?.crew
    ?.filter((e) => e?.department === "Writing")
    ?.map((e) => e.name)
    ?.join(", ");
  //const casting = castData?.crew?.filter((e) => e?.job === "Casting")?.map((e) => e.name)?.join(", ");
  const editing = castData?.crew
    ?.filter((e) => e?.department === "Editing")
    ?.map((e) => e.name)
    ?.join(", ");
  const producer = castData?.crew
    ?.filter((e) => e?.job === "Producer")
    ?.map((e) => e.name)
    ?.join(", ");

  //console.log("WRITER",writer);

  return (
    <div>
      <div className="w-full h-[300px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageURL + data?.backdrop_path}
            alt="NO Img Found!"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/60 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="relative mx-auto lg:mx-0 lg:-mt-28 w-fit min-w-60">
          <img
            src={imageURL + data?.poster_path}
            alt="NO Img Found!"
            className="h-80 w-60 object-cover rounded"
          />
          <button
            onClick={() => handlePlayVideo(data)}
            className="mt-5 w-full py-2 px-4 text-center bg-white text-black rounded font-extrabold text-xl hover:bg-gradient-to-l from-red-500 to-orange-400 hover:scale-105 transition-all"
          >
            Play Now
          </button>
        </div>
        <div className="">
          <h2 className="text-xl lg:text-4xl font-bold text-white">
            {data?.title ||
              data?.name ||
              data?.orginal_name ||
              data?.orginal_title}
          </h2>
          <p className="text-neutral-400">
            {params?.explore} Type : {data?.tagline}
          </p>

          <Divider />

          <div className="flex items-center gap-3">
            <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View : {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration : {hour}h {mint}m
              {/* Duration : {duration[0]}m {duration[1]}h */}
            </p>
          </div>
          <Divider />

          <div>
            <h3 className="text-xl font-bold text-white mb-1 ">Overview</h3>
            <p className="">{data?.overview}</p>
            <Divider />
            <div className="flex gap-3 items-center my-3 text-center">
              <p className="text-lg font-bold text-neutral-400 mb-1">
                Status : {data?.status}
              </p>
              <span>|</span>
              <p className="text-lg font-bold text-neutral-400 mb-1">
                Release_Date :{" "}
                {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p className="text-lg font-bold text-neutral-400 mb-1">
                Revenue : {Number(data?.revenue)}
              </p>
            </div>
            <Divider />
            <div className="">
              {/* <p className="">
                <span className="text-white">Department</span> :{castData?.crew[0]?.department}
              </p>
              <p className="">
                <span className="text-white">Name</span> :{castData?.crew[0]?.name}
              </p>
              <p className="">
                <span className="text-white">Job</span> :{castData?.crew[0]?.job}
              </p> */}
              <p>
                <span className="text-white font-extrabold ">Director :</span>
                {directing}
              </p>
              <Divider />
              <p>
                <span className="text-white font-extrabold ">Artists :</span>
                {art}
              </p>
              <Divider />
              <p>
                <span className="text-white font-extrabold ">Writers :</span>
                {writing}
              </p>
              <Divider />
              <p>
                <span className="text-white font-extrabold ">Editors :</span>
                {editing}
              </p>
              <Divider />
              <p>
                <span className="text-white font-extrabold ">Producers :</span>
                {producer}
              </p>
              {/* <Divider /><p><span className="text-white font-extrabold ">Casting By :</span>{casting}</p> */}
            </div>
            <Divider />
          </div>
          <h2 className="font-bold text-lg">Cast : </h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
            {castData?.cast
              ?.filter((e) => e?.profile_path)
              .map((StarCast, index) => {
                return (
                  <div key={StarCast?.id + index}>
                    <div>
                      <img
                        className="h-28 w-28 rounded-3xl"
                        alt="img not fount !"
                        src={imageURL + StarCast?.profile_path}
                      />
                    </div>
                    <p className="my-2 font-bold text-center text-sm text-neutral-400">
                      {StarCast?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        <HorizontalScollCard
          data={similarData}
          heading={"Similar " + params?.explore}
          media_type={params?.explore}
        />

        <HorizontalScollCard
          data={recommendationsData}
          heading={"Recommendations " + params?.explore}
          media_type={params?.explore}
        />
      </div>
      <Divider />
      {playVideo && (
        <VideoPlay
          data={playVideoId}
          close={() => {
            setPlayVideo(false);
          }}
          media_type={params?.explore}
        />
      )}
    </div>
  );
};

export default DetailsPage;
