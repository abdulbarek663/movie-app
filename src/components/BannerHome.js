import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { Link } from "react-router-dom";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const imageURL = useSelector((state) => state.movieData.imageURL);

  //console.log("Banner Home ", bannerData.movieData.bannerData);
  //console.log("Image url ", imageURL.movieData.imageURL);

  const [currentImage, setCurrentImage] = useState(0);

  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((preve) => preve + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerData, imageURL, currentImage]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.map((data, index) => {
          // console.log("DATA", data);
          return (
            <div
              key={data?.id + "bannerHome" + index}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className="h-full w-full">
                <img
                  className="h-full w-full object-cover"
                  src={imageURL + data.backdrop_path}
                  alt={data?.title}
                />
              </div>

              {/* next and previous image */}
              <div className="absolute top-0 h-full w-full hidden items-center justify-between px-3 group-hover:flex">
                <button
                  onClick={handlePrevious}
                  className="bg-white p-1 rounded-full text-xl z-10 text-black hover:bg-neutral-700"
                >
                  <GrPrevious />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white p-1 rounded-full text-xl z-10 text-black hover:bg-neutral-700"
                >
                  <GrNext />
                </button>
              </div>

              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-800 to-transparent"></div>

              <div className="container mx-auto">
                <div className="w-full absolute bottom-0 max-w-md px-4">
                  <h2 className="font-bold text-2xl md:text-4xl text-white drop-shadow-2xl">
                    {data?.title ||
                      data?.original_title ||
                      data?.original_name ||
                      data?.name}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4 pb-1">
                    <p>Language : {data.original_language}</p>
                    <span>|</span>
                    <p>Ratting : {Number(data.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>View : {Number(data.popularity).toFixed(0)}+</p>
                  </div>
                  <Link to={"/" + data?.media_type + "/" + data?.id}>
                    <button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-110 ">
                      Play Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BannerHome;
