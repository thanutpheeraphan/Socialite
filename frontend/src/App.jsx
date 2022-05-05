import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import { act } from "react-dom/test-utils";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Button } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components

import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import SignUp from "./pages/SignUp";
import Room from "./components/Room";
import Homepage from "./components/Landing";
import Dashboard2 from "./pages/Dashboard/Dashboard";
import Safety from "./pages/Safety/Safety";
import Support from "./pages/Support/Support";
import MCURoom from "./components/MCURoom/MCURoom";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
	  const response = await fetch("http://localhost:5000/auth/verify", {

    //   const response = await fetch("http://8183-2001-fb1-44-8cda-4c81-af39-b096-fce3.ngrok.io/auth/verify", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseResponse = await response.json();

      parseResponse === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);

      // console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  

  return (
    
    <Fragment>
      <Router>
        <div style={{backgroundColor:'',}}>
        {/* <div style={{backgroundColor:'#86FFCC',}}> */}
          <Navbar setAuth={setAuth} isAutheticated={isAuthenticated} />
          {/* <Switch>
            <Route path="/" exact component={CreateRoom} />
           
          </Switch> */}
          <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              !isAuthenticated ? (
                <Homepage {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/home" />
              )
            }
          />
          <Route
            exact
            path="/signup"
            render={(props) =>
              !isAuthenticated ? (
                <SignUp {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/home"
            render={(props) =>
              isAuthenticated ? (
                <Home {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact path="/safety"
            render={(props) =>
              !isAuthenticated ? (
                <Safety {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact path="/dashboard"
            render={(props) =>
              !isAuthenticated ? (
                <Dashboard2 {...props} setAuth={setAuth}/>
              ) : (
                <Redirect to="/"/>
              )
            }
          />
          <Route
            exact path="/support"
            render={(props) =>
              !isAuthenticated ? (
                <Support {...props} setAuth={setAuth}/>
              ) : (
                <Redirect to="/"/>
              )
            }
          />
          

		   {/* <Route path="/room/:roomID" component={Room} /> */}
		   <Route path="/room/:roomID" component={MCURoom} />
        </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;

/* <div className="App">
			<div className="topRow">
				<header className="App-header">
					<nav className="navigation">
						<a href="/" aria-label="Home">
							Socialite
						</a>
					</nav>
					<button id="logInButton" onClick = {do_something}>
						Log In
					</button>
					<button id="singUpButton" onClick = {do_something}>
						Sign Up
					</button>
					<button id="logOutButton" onClick = {do_something}>
						Log Out
					</button>
				</header>
			</div>
		</div> */
