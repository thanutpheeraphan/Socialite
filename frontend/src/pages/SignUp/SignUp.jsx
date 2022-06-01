import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "./SignUp.css";

const SignUp = ({ setAuth }) => {
  const [inputs, setInputs] = useState({ email: "", password: "", name: "" });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    //take every input
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    console.log("In function");

    e.preventDefault();

    try {
      const body = { email, password, name };

      const response = await fetch(
        process.env.REACT_APP_API_URL + "/auth/register",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const parseResponse = await response.json();

      if (response.status != 200) {
        toast.error(parseResponse);
      }
      if (parseResponse.jwtToken) {
        localStorage.setItem("token", parseResponse.jwtToken);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.log("In err catch!");
      // toast(err.message);
      // console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="center">
        <div className="Container cfb">
          <div className="banner-side">
            <h1 className="title-desc">Socialite</h1>
            <div className="form-desc">Smooth voice chat communication</div>
            <div className="form-desc">Come and Connect with other people.</div>
          </div>

          <div className="form-comp cfb">
            <h1 className="registertitle">Register</h1>
            <form className="sign-up-form" onSubmit={onSubmitForm}>
              <label>
                <input
                  class="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </label>
              <label>
                <input
                  class="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </label>
              <label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </label>
              <label></label>
              <button className="register-btn">Register</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
