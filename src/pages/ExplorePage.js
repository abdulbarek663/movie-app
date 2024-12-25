import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
  const params = useParams();
  //console.log("params",params.explore);
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      });
      setData((preve) => {
        return [...preve, ...response.data.results];
      });
      setTotalPageNo(response.data.total_pages);
      //console.log("RESPONSE", response.data.results);
    } catch (error) {
      //console.log("ERROR", error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetWidth) {
      setPageNo((preve) => preve + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-16 py-5">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg font-semibold my-3 lg:text-xl">
          Popular {params.explore} Show
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center md:justify-start">
          {data.map((exploreData, index) => {
            return (<Card data={exploreData} index={index+1} key={exploreData.id+'exploreSEction'} media_type={params.explore}/>);
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
