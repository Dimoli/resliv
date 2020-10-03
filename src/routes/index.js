import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import WorkRefs from "../works/workRefs";
import FirstWork from "../works/1";
import SecondWork from "../works/2";
import ThirdWork from "../works/3";
import FourthWork from "../works/4";
import FifthWork from "../works/5";
import SixthWork from "../works/6";

export default () => {
  return (
    <div className="text-center">
      <Router>
        <WorkRefs />
        <Switch>
          <Route path="/1" component={FirstWork} />
          <Route path="/2" component={SecondWork} />
          <Route path="/3" component={ThirdWork} />
          <Route path="/4" component={FourthWork} />
          <Route path="/5" component={FifthWork} />
          <Route path="/6" component={SixthWork} />
        </Switch>
      </Router>
    </div>
  );
};
