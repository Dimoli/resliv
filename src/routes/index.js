import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import WorkRefs from "../works/workRefs";
import FirstWork from "../works/1";
import SecondWork from "../works/2";
import ThirdWork from "../works/3";
import FourthNFifthWork from "../works/4&5";
import SixthWorkRoute from "../works/6/";

export default () => {
  return (
    <div className="text-center">
      <Router>
        <Route path="/works" component={WorkRefs} />
        <Switch>
          <Route path="/works/1" component={FirstWork} />
          <Route path="/works/2" component={SecondWork} />
          <Route path="/works/3" component={ThirdWork} />
          <Route path="/works/4&5" component={FourthNFifthWork} />
        </Switch>
        <SixthWorkRoute />
      </Router>
    </div>
  );
};
