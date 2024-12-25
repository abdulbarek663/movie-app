import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation();
  //console.log("LOCATION", location.search.slice(3));

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const query = location?.search?.slice(3);

  // const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // const response = await axios.get("/search/collection", {
        const response = await axios.get("/search/multi", {
        params: {
          query: location?.search?.slice(3),
          page: page,
        },
      });
      setData((preve) => {
        return [...preve, ...response.data.results];
      });
      // setTotalPageNo(response.data.total_pages);
      //console.log("RESPONSE", response.data.results);
    } catch (error) {
      //console.log("ERROR", error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [location?.search]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetWidth) {
      setPage((preve) => preve + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-16 py-5">
      {/* <div> 
         <input type="text" placeholder='Search here...' onChange={(e)=> navigate(`/search?q=${e.target.value}`)}/>
      </div> */}
      <div className="container mx-auto">
        <h3 className="capitalize text-lg font-semibold my-3 lg:text-xl">
          Search Results
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center md:justify-start">
          {data.map((searchData, index) => {
            return (
              <Card
                data={searchData}
                //index={index + 1}
                key={`${searchData.id}-${index}`}
                media_type={searchData.media_type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
