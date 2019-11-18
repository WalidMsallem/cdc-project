import React from "react";
import "./App.css";
import Login from "./comopnents/login";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./comopnents/frontOffice/Home";
import Contact from "./comopnents/frontOffice/Contact";
import ProjectsList from "./comopnents/frontOffice/ProjectsList";
import Cent from "./comopnents/frontOffice/Cent";
import Forums from "./comopnents/frontOffice/Forum";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/privateRoute";
import Dashboard from "./comopnents/dashboard";
/** */
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Footer from "./comopnents/frontOffice/Footer";
import axios from "axios";
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/projects" component={ProjectsList} />
        <Route exact path="/cent" component={Cent} />
        <Route exact path="/forums" component={Forums} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
