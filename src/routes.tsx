import { HashRouter, Route } from "react-router-dom";
import React from "react";
import { ExchangeView } from "./components/exchange";

export function Routes() {
  return (
    <>
      <HashRouter basename={"/"}>
        <Route exact path="/" component={ExchangeView} />
      </HashRouter>
    </>
  );
}
