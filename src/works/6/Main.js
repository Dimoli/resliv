import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
  return (
    <div>
      <nav className="navbar fixed-top justify-content-start bg-primary">
        <NavLink
          className="text-white mx-2"
          title="Yoy already on main page"
          data-placement="top"
          to="/"
        >
          Main
        </NavLink>
        <NavLink className="text-white mx-2" to="/employees">
          Employees
        </NavLink>
        <NavLink className="text-white mx-2" to="/works">
          Other works
        </NavLink>
      </nav>
    </div>
  );
};
