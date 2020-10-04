import React from "react";
import { Route, NavLink } from "react-router-dom";

import Main from "./Main";
import Employees from "./Employees";

export default () => {
  return (
    <>
      <Route exact path="/works/6" component={SixthWork} />
      <Route exact path="/" component={Main} />
      <Route path="/employees" component={Employees} />
    </>
  );
};

const SixthWork = () => (
  <NavLink to="/">
    <div>
      <button className="btn btn-success">Go to last work</button>
    </div>
  </NavLink>
);
