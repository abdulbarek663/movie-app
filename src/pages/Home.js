import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import HorizontalScollCard from "../components/HorizontalScollCard";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const trendingData = useSelector((state) => state.movieData.bannerData);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: upcomingData } = useFetch("/movie/upcoming");
  const { data: tvPopularData } = useFetch("/tv/popular");
  const { data: tvTopRatedData } = useFetch("/tv/top_rated");
  const { data: tvAiringTodayData } = useFetch("/tv/airing_today");

  return (
    <div className="py-5">
      <BannerHome />
      <HorizontalScollCard
        data={trendingData}
        heading={"Trending"}
        trending={true}
        media_type={"movie"}
      />
      <HorizontalScollCard
        data={nowPlayingData}
        heading={"Now Playing"}
        media_type={"movie"}
      />
      <HorizontalScollCard
        data={topRatedData}
        heading={"Top Rated"}
        media_type={"movie"}
      />
      <HorizontalScollCard
        data={upcomingData}
        heading={"Upcoming"}
        media_type={"movie"}
      />
      <HorizontalScollCard
        data={tvPopularData}
        heading={"Popular Tv Shows"}
        media_type={"tv"}
      />
      <HorizontalScollCard
        data={tvTopRatedData}
        heading={"Top Rated Tv Shows"}
        media_type={"tv"}
      />
      <HorizontalScollCard
        data={tvAiringTodayData}
        heading={"Airing Today Tv Shows"}
        media_type={"tv"}
      />
    </div>
  );
};

export default Home;
