import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";


const Register = ({setAuth})=>{

	const [inputs , setInputs] = useState({email:"", password:"",name:""})

	const {email , password, name} = inputs;

	const onChange = (e) => {
		//take every input
		setInputs({...inputs,[e.target.name] : e.target.value});
	}

	const onSubmitForm = async(e) => {
		console.log("In function");

		e.preventDefault();

		try{
			const body = {email,password,name};
			
			const response = await fetch("http://localhost:5000/auth/register",
			// const response = await fetch("http://8183-2001-fb1-44-8cda-4c81-af39-b096-fce3.ngrok.io/auth/register",
			{
				method:"POST",
				headers:{"Content-type": "application/json"},
				body: JSON.stringify(body)
			});

			
			const parseResponse = await response.json();

			if(parseResponse.jwtToken){
				localStorage.setItem("token", parseResponse.jwtToken);
				setAuth(true);
				toast.success("Registered Successfully");
			}
			else{
				setAuth(false);
				toast.error(parseResponse);
			}

		}
		catch(err){
			console.error(err.message)
		}
	}

	return (
		<Fragment>
			<h1 >Register</h1>
			<form onSubmit={onSubmitForm}>
				<input type="email" 
					name="email" 
					placeholder="Email" 
					className="form-control my-3"
					value={email}
					onChange={e => onChange(e)}
				/>
				<input type="password" 
					name="password" 
					placeholder="Password" 
					className="form-control my-3"
					value={password}
					onChange={e => onChange(e)}
				/>
				<input type="text" 
					name="name" 
					placeholder="Name" 
					className="form-control my-3"
					value={name}
					onChange={e => onChange(e)}
				/>

				<button className="btn btn-success btn-block">Register</button>
			</form>
			<Link to="/">Login</Link>

		</Fragment>
	);
}

export default Register;

 