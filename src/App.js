import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageUrl } from "./store/movieSlice";

function App() {
  const dispatch = useDispatch();
  // console
  const fetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");

      dispatch(setBannerData(response.data.results));

      // console.log("response", response.data.results);
    } catch (error) {
      // console.log("error", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageUrl(response.data.images.secure_base_url+"original"));
      //console.log("fetchConfiguration",response.data.images.secure_base_url+"original")
    } catch (error) {}
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  return (
    <main className="pb-14 md:pb-0">
      <Header />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
