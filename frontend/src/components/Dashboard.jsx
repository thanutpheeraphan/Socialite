import React, { Fragment, useState, useEffect } from "react";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
    //   const response = await fetch("http://8183-2001-fb1-44-8cda-4c81-af39-b096-fce3.ngrok.io/dashboard/", {
		const response = await fetch(process.env.REACT_APP_API_URL+"/dashboard/", {
		  
        method: "GET",
        headers: {jwt_token: localStorage.token }
      });

	  const parseResponse = await response.json();

	  setName(parseResponse.user_name)

	//   console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName();
  },[]); //[] is to make 1 request when rendered

  return (
    <Fragment>
      <h1>Dashboard {name} </h1>
    </Fragment>
  );
};

export default Dashboard;
