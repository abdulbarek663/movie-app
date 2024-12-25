import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({data, trending, index, media_type}) => {
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const mediaType = data.media_type ?? media_type;
  // console.log("DAta ", data);
  // console.log("TITLE",data.data.title);
  // console.log("ORIGINAL_NAME",data.data.original_name);
  // console.log("ORIGINAL_TITLE",data.data.original_title);
  //console.log("Data.DATA",data.data);

  return (
    <Link
      to={"/" + mediaType + "/" + data?.id}
      className="w-full min-w-[230px] max-w-[230px] h-80 block overflow-hidden rounded relative hover:scale-110 transition-all"
    >
      
      {/* {
            data?.poster_path ? (
                <img
                    src={imageURL+data?.poster_path}
                />
            ) : (
                <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>
                    No image found
                </div>
            )

        } */}

      <img
        src={imageURL + data?.poster_path || data?.backdrop_path}
        alt={"img not Found"}
      />
      <div className="">
        <div className="absolute top-2 left-0">
          {trending && (
            <div className="py-1 px-3 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden">
              # {index}
            </div>
          )}
        </div>
        <div className="absolute left-1 bottom-1 w-full h-12 overflow-hidden bg-neutral-700">
          <h2 className="text-white font-semibold text-ellipsis line-clamp-1">
            
            Name :-
            {data?.title ||
              data?.original_title ||
              data?.name ||
              data?.original_name}
          </h2>
          <div className="text-sm flex justify-between">
            <p>
              
              Release :
              {moment(
                data?.release_date || data?.first_air_date
              ).format("MMM Do YY")}
            </p>
            <p className="pr-2 text-white">
              
              Rating : {Number(data?.vote_average).toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
