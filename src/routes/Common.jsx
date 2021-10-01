import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import PaymentPage from "../components/PaymentPage";
import Purchase from "../components/Purchase";
import SignUp from "../components/SignUp";

export default function Common() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Dashboard}></Route>
        <Route path="/purchases" component={Purchase}></Route>
        <Route path="/payment" component={PaymentPage}></Route>
      </Router>
    </>
  );
}
