import React from "react";
import { mobileNavigation } from "../contants/navigation";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  return (
    <section className="md:hidden fixed bottom-0 backdrop-blur-2xl w-full h-14 bg-black bg-opacity-50 z-40">
      <div className=" flex items-center justify-between h-full">
        {mobileNavigation.map((nav, index) => {
          return (
            <NavLink
              key={nav.label + "mobileNavigation"}
              to={nav.href}
              className={({ isActive }) =>
                `px-4 hover:text-neutral-500 flex h-full items-center flex-col justify-center ${
                  isActive && "text-green-200"
                } `
              }
            >
              <div>{nav.icon}</div>
              <p>{nav.label}</p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default MobileNavigation;
