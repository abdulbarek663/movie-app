import { MdMovie } from "react-icons/md";
import { LuTv } from "react-icons/lu";
//import { PiVideoLight } from "react-icons/pi";

import { FaHome } from "react-icons/fa";

export const navigation = [
  {
    label: "Movies",
    href: "movie",
    icon: <MdMovie />,
  },
  {
    label: "TV Shows",
    href: "tv",
    icon: <LuTv />,
  },
  // { 
  //   label: "Web Series", 
  //   href: "tv", 
  //   icon: <PiVideoLight /> },
];

export const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: <FaHome />,
  },
  ...navigation,
];
