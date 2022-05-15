import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../img/mainicon.svg";
import { toast } from "react-toastify";

const Navbar = ({ setAuth, isAutheticated }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
	  
	//   const response = await fetch("http://8183-2001-fb1-44-8cda-4c81-af39-b096-fce3.ngrok.io/auth/login", {
      const response = await fetch(process.env.REACT_APP_API_URL+"/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();
	  console.log(parseResponse);

	  if(parseResponse.jwtToken){
		localStorage.setItem("token", parseResponse.jwtToken);
		// console.log(parseResponse);
		setAuth(true);
		// toast.success("Login Successfully!")
	  }
	  else{
		  setAuth(false);
		//   toast.error(parseResponse);
	  }


  
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {


    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
	// toast.success("Logged out successfully!");
  };

  if (isAutheticated == true) {
    console.log("true");
  }

  return (
    <Fragment>
      <nav className="navbar navbar-default navbar-expand-lg navbar-light">
        <div className="navbar-header">
          
          {/* <a href="./home" className="homelogo"> */}
            <img src={logo} alt="logo" className="img_icon"/>
          {/* </a> */}
          <button
            type="button"
            data-target=".navbar-collapse"
            data-toggle="collapse"
            className="navbar-toggle"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

        </div>

        <div
          id="navbarCollapse"
          className="collapse navbar-collapse"
          toggle="collapse"
          data-target=".navbar-collapse"
        >
          <ul className="nav navbar-nav">
            <li>
              <a
                data-toggle="collapse"
                data-target=".navbar-collapse"
                href="/home"
              >
                Home
              </a>
            </li>
            <li>
              <a data-toggle="collapse" data-target=".navbar-collapse" href="/dashboard">
                Dashboard
              </a>
            </li>
            <li>
              <a data-toggle="collapse" data-target=".navbar-collapse" href="/safety">
                Safety
              </a>
            </li>
            <li>
              <a data-toggle="collapse" data-target=".navbar-collapse" href="/support">
                Support
              </a>
            </li>
          </ul>

          {!isAutheticated ? (
            <ul className="nav navbar-nav navbar-right" id="accountDropdown">

              <li>

                <button data-toggle="dropdown" className="login">
                  Login <i className="fas fa-caret-down" />
                </button>

                <ul className="dropdown-menu form-wrapper">
                  <li>
                    <form onSubmit={onSubmitForm}>
                      <p>Sign in</p>

                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          required="required"
                          value={email}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          required="required"
                          value={password}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                      <input
                        type="submit"
                        className="btn btn-success btn-primary btn-block"
                        value="Login"
                      />
                      {/* <div className="form-footer">
                        <p>Forgot Your password?</p>
                      </div> */}
                      <div className="form-footer">
                        <p>
                          Don't have an account?{" "}
                          <Link to="/signup">Sign Up</Link>
                        </p>
                      </div>
                    </form>
                  </li>
                </ul>
              </li>

            </ul>
          ) : (
            <div>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a data-toggle="dropdown" className="dropdown-toggle">
                    Account <i className="fas fa-caret-down" />
                  </a>
                  <ul className="dropdown-menu form-wrapper">
                    <li>
                      <Link to="/forgetPass">
                        <button className="btn btn-primary btn-block">
                          Settings 
                        </button>
                      </Link>
                      <Link>
                        <button
                          onClick={(e) => logout(e)}
                          className="btn btn-primary btn-block"
                        >
                          Logout
                        </button>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;

// function Navbar() {
//   return (
//     <nav className="navbar navbar-default navbar-expand-lg navbar-light">
//       <div className="navbar-header">
//         <a href="/" className="nav-logo">
//           <img src={logo} alt="logo" />
//         </a>

//         <button
//           type="button"
//           data-target=".navbar-collapse"
//           data-toggle="collapse"
//           className="navbar-toggle"
//         >
//           <span class="navbar-toggler-icon"></span>
//         </button>
//       </div>

//       <div
//         id="navbarCollapse"
//         className="collapse navbar-collapse"
//         toggle="collapse"
//         data-target=".navbar-collapse"
//       >
//         <ul className="nav navbar-nav">
//           <li>
//             <a
//               data-toggle="collapse"
//               data-target=".navbar-collapse"
//               href="/dashboard"
//             >
//               Dashboard
//             </a>
//           </li>
//           <li>
//             <a data-toggle="collapse" data-target=".navbar-collapse" href="#">
//               News
//             </a>
//           </li>
//           <li>
//             <a data-toggle="collapse" data-target=".navbar-collapse" href="#">
//               Safety
//             </a>
//           </li>
//           <li>
//             <a data-toggle="collapse" data-target=".navbar-collapse" href="#">
//               Support
//             </a>
//           </li>
//         </ul>

//         <ul className="nav navbar-nav navbar-right">
//           <li>
//             <a data-toggle="dropdown" className="dropdown-toggle" href="#">
//               Account <i className="fas fa-caret-down" />
//             </a>

//             <ul className="dropdown-menu form-wrapper">
//               <li>
//                 <form action="/examples/actions/confirmation.php" method="post">
//                   <p>Sign in</p>

//                   <div className="form-group">
//                     <input
//                       type="email"
//                       name="email"
//                       className="form-control"
//                       placeholder="Email"
//                       required="required"
//                     />
//                   </div>
//                   <div className="form-group">
//                     <input
//                       type="password"
//                       name="password"
//                       className="form-control"
//                       placeholder="Password"
//                       required="required"
//                     />
//                   </div>
//                   <input
//                     type="submit"
//                     className="btn btn-success btn-primary btn-block"
//                     value="Login"
//                   />
//                   <div className="form-footer">
//                     <a href="#">Forgot Your password?</a>
//                   </div>
//                   <div className="form-footer">
//                     <p>
//                       Don't have an account? <a href="register">Signup</a>
//                     </p>
//                   </div>
//                 </form>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
