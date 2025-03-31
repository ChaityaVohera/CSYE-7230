import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { LoginProvider } from "./dashboard/LoginContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Home from "./landingPage/Home";
import Launch from "./landingPage/launch";
import Login from "./login/login";
import Signup from "./login/Signup";
import Dashboard from "./dashboard/Dashboard";
import CreatePost from "./feeds/Feeds";
import Connections from "./connections/Connections";
import Feed from "./feeds/FeedsCard";
// import ViewProfile from "./viewprofile/ViewProfile";
// import ProtectedRoute from "./protectedroute/Protectedroute";
function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    // You might want to perform additional checks on the token if needed
    if (!token) {
      // Redirect to login page if the token is not present
      window.location.replace("/login");
    }
  }, []);
  return (
    <div>
      <Router>
        <LoginProvider>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/launch" element={<Launch />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/dashboard" element={<Dashboard />}></Route>
            <Route exact path="/post" element={<CreatePost />}></Route>
            <Route exact path="/connections" element={<Connections />}></Route>
            <Route exact path="/feed" element={<Feed />}></Route>
            {/* <Route exact path="/viewProfile" element={<ViewProfile />}></Route> */}
          </Routes>
        </LoginProvider>
      </Router>
    </div>
  );
}

export default App;
