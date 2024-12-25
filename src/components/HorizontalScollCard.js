import React, { useRef } from "react";
import Card from "../components/Card";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const HorizontalScollCard = ({ data = [], heading , trending , media_type }) => {
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handlePrevious = () => {
    containerRef.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
        {heading}
      </h2>
      <div className="overflow-hidden relative">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-none"
        >
          {data.map((item, index) => {
            return (
              <Card
                key={item.id + "heading" + index}
                data={item}
                index={index + 1}
                trending={trending}
                media_type={media_type}
              />
            );
          })}
        </div>
        <div className="absolute top-0 h-full w-full hidden lg:flex items-center justify-between px-3 group-hover:flex">
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
      </div>
    </div>
  );
};

export default HorizontalScollCard;
