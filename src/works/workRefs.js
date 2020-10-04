import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <NavLink to="/works/1">
        <button type="button" className="btn btn-primary">
          1
        </button>
      </NavLink>
      <NavLink to="/works/2">
        <button type="button" className="btn btn-primary">
          2
        </button>
      </NavLink>
      <NavLink to="/works/3">
        <button type="button" className="btn btn-primary">
          3
        </button>
      </NavLink>
      <NavLink to="/works/4&5">
        <button type="button" className="btn btn-primary">
          4&5
        </button>
      </NavLink>
      <NavLink to="/works/6">
        <button type="button" className="btn btn-primary">
          6
        </button>
      </NavLink>
    </div>
  );
};
