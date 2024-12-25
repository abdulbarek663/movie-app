import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { navigation } from "../contants/navigation";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  //console.log("REMOVE SPACE", removeSpace);
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();
  //console.log("Location", location.search.slice(3));

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
      <div className="container mx-auto px-2 flex items-center h-full">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={120} />
        </Link>

        <nav className="hidden md:flex items-center gap-2 ml-5 font-bold">
          {navigation.map((nav, index) => {
            return (
              <div>
                <NavLink
                  key={nav.label+"header"+index}
                  to={nav.href}
                  className={({ isActive }) =>
                    `md:px-2 lg:px-12 hover:text-neutral-500 flex h-full items-center flex-col justify-center ${
                      isActive && "text-green-200"
                    }`
                  }
                >
                  <div>{nav.icon}</div>
                  <p>{nav.label}</p>
                </NavLink>
              </div>
            );
          })}
        </nav>
        <div className="flex items-center ml-auto gap-5">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button
              type="submit"
              className=" px-3 text-2xl active:scale-50 transition-all text-white"
            >
              <IoIosSearch />
            </button>
          </form>
          <div className="rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all">
            <img src={user} alt="user" width={26} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
