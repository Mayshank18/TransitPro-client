import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignupPage from "./Components/SignupPage";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
import ContextProvider  from "./Contexts/ContextProvider.js";
import OrganizationPage from "./Components/OrganizationPage";
import ProfileDashboard from "./Components/ProfileDashboard";
import LandingPage from "./Components/LandingPage"
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword";
import EditDetails from "./Components/EditDetails";
import OtherDetails from "./Components/OtherDetails";
import RFQbutton from "./Components/RFQbutton";
import MyAnalytics from "./Components/MyAnalytics";
import MyQuotation from "./Components/MyQuotation";

function App() {


  return (
    <>
      <Router>
        <ContextProvider>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/signup">
              <SignupPage />
            </Route>
            <Route exact path="/organization" component={OrganizationPage}/>
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/landing" component={LandingPage}/>
            <Route exact path="/profile" component={ProfileDashboard}/>
            <Route exact path="/editdetails" component={EditDetails}/>
            <Route exact path="/otherdetails" component={OtherDetails}/>
            <PrivateRoute exact path="/RFQ" component={RFQbutton}/>
            <PrivateRoute exact path="/Quotations" component={MyQuotation}/>
            <PrivateRoute exact path="/Analytics" component={MyAnalytics}/>
          </Switch>
        </ContextProvider>
      </Router>
    </>
  );
}

export default App;
