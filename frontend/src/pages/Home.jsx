import React, { Fragment, useState, useEffect } from "react";
// import data from "../data/roomCard.json";
import style from "../style/roomCard.module.css";
import "../pages/modal.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import "../components/Navbar/Navbar.css";
import { parse, v1 as uuid } from "uuid";
import { toast } from "react-toastify";
import SearchBar from "../components/SearchBar/SearchBar";
import RooMockData from "../data/MockData.json";

import {
  BsFillChatDotsFill,
  BsChatDots,
  BsFillPersonFill,
  BsChatDotsFill,
} from "react-icons/bs";
import logo from "../img/socialiteicon.svg";
import user1 from "../img/user1.jpg";
import user2 from "../img/user2.jpg";

function Home(props) {
  const [createRoomInputs, setRoomInputs] = useState({
    room_name: "",
    password: "",
  });
  const { room_name, password ,tag} = createRoomInputs;
  const [user_id, setId] = useState("");
  let room_link;
  const status = true;
  const room_member = 1;

  const [name, setName] = useState("");

  const createRoomFunc = () => {
	var eight_digit_value = Math.floor(Math.random()*100000000);
	props.history.push({pathname: `/room/?roomID=${eight_digit_value}`});
  };
  const joinRoomFunc = () => {
	var room_id = window.prompt("Enter the room ID");  
	props.history.push({pathname: `/room/?roomID=${room_id}`});
  };
  const create = () => {


    console.log(user_id);
	console.log(name);
    console.log(room_name);
    console.log(password);
    console.log(status);

    addToDb();
  };

  const addToDb = async () => {
    // e.preventDefault();

	// console.log(eight_digit_value);
	var eight_digit_value = Math.floor(Math.random()*100000000);
    room_link = eight_digit_value;

    try {
      const body = {
        user_id,
        room_name,
        password,
        room_link,
        status,
        room_member,
      };
	  const response = await fetch(process.env.REACT_APP_API_URL+"/rooms/createroom", {
    //   const response = await fetch("http://8183-2001-fb1-44-8cda-4c81-af39-b096-fce3.ngrok.io/rooms/createroom", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();
      console.log(parseResponse);

      if (parseResponse.status == true) {
		props.history.push({pathname: `/room/?roomID=${room_link}`, state:{name} });
        // props.history.push({pathname: `/room/${room_link}`, search: '?query=abc', state:{parseResponse} });
        // toast.success("Room created");
      } else {
        toast.error(parseResponse);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getRoomData = (item) => {
    console.log(item);
  };
  const getName = async (e) => {
    try {

      const response = await fetch(process.env.REACT_APP_API_URL+"/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseResponse = await response.json();
      console.log(parseResponse);
      setName(parseResponse.user_name);
      setId(parseResponse.user_id);

      //   console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [show, setShow] = useState(false);

  const [data, setData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   const [createRoomInputs, setRoomInputs] = useState({
  //     roomName: "",
  //     password: "",
  //   });

  //   const { roomName, password } = createRoomInputs;

  //   const onCreateRoom = async (e) => {
  //     // e.preventDefault();

  //     try {
  //       const body = { email, password };

  //       const response = await fetch("http://localhost:5000/auth/login", {
  //         method: "POST",
  //         headers: { "Content-type": "application/json" },
  //         body: JSON.stringify(body),
  //       });

  //       const parseResponse = await response.json();

  // 	  if(parseResponse.jwtToken){
  // 		localStorage.setItem("token", parseResponse.jwtToken);
  // 		console.log(parseResponse);
  // 		setAuth(true);
  // 		toast.success("Login Successfully!")
  // 	  }
  // 	  else{
  // 		  setAuth(false);
  // 		  toast.error(parseResponse);
  // 	  }

  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };

  const onChange = (e) => {
    setRoomInputs({ ...createRoomInputs, [e.target.name]: e.target.value });
  };

  const onGetData = async (e) => {
    // e.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_API_URL+"/rooms/getrooms", {
        method: "GET",
      });

      const parseResponse = await response.json();

      setData(parseResponse);
      console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  const joinRoom = (roomInfo) => {
    if (roomInfo.status === true) {
      const body = {
        user_id,
        room_name,
        password,
        room_link,
        status,
        room_member,
      };

    //   const response = await fetch("http://localhost:5000/rooms/userjoined", {
    //     method: "PUT",
    //     headers: { "Content-type": "application/json" },
    //     body: JSON.stringify(body),
    //   });
      props.history.push(`/room/${roomInfo.room_link}`);
    } else {
      toast.error("Room Unavailable");
    }
  };

  useEffect(() => {
    onGetData();
    getName();
  }, []);

  const [tags,setTags] = useState([]);
  const addTag = (e) => {
    if(e.key === "Enter"){
      if(e.target.value.length > 0){
        setTags([...tags, e.target.value]);
        e.target.value = "";
      }
    }
  };
  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
  /*{setAuth} */

  return (
    <div>
      <SearchBar placeholder="Enter Search..." data={RooMockData}/>
      {data.map((item) => (
            <div
              className={style.roomCardContainer}
              value={item.room_name}
              //   onClick={() => getRoomId(item.room_name)}
              onClick={() => {
                getName();
                getRoomData(item);
                joinRoom(item);
              }}
            >
              <h2>{item.room_name}</h2>
              {/* <h3>{item.sub_title}</h3> */}
              <div className={style.roomMembers}>
                {/* <div>
                  <img src={logo} alt="" />
                  <img src={logo} alt="" />
                </div> */}
                <div>
                  {/* {item.members.map((person) => (
                    <p>
                      {person.first_name} {person.last_name} <BsChatDots />
                    </p>
                  ))} */}

                  <p className="d-flex align-items-center">
                    {/* <span className="mr-2">1.8</span> <BsFillPersonFill /> */}
                    <span className="mx-2"></span>
                    {/* mx is margin horizontal  */}
                    <span className="mr-2">{item.room_member}</span>{" "}
                    <span className="mx-1"></span>
                    <BsFillPersonFill />
                  </p>
                </div>
          </div>
        </div>
      ))}
      <div className="bg-[#2f3136] flex flex-col min-w-max">
		  <Fab   
		  onClick={joinRoomFunc}
          variant="extended"
          aria-label="add"
          style={{ position: "fixed", 
          right: 10,
          bottom: 70, 
          background: 'rgba(45, 52, 54, 1)',
          color:'#fff',
          fontSize: 15, }} >
			  Join Room
		  </Fab>
        <Fab
        //   onClick={handleShow}
		  onClick={handleShow}
          variant="extended"
          aria-label="add"
          style={{ position: "fixed", 
          right: 10,
          bottom: 10, 
          background: 'rgba(45, 52, 54, 1)',
          color:'#fff',
          fontSize: 15,        
        }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Create Room
        </Fab>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header className="modal-style" closeButton>
            <Modal.Title style={{fontSize:20}}>Create Room</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              {/* //onSubmit={create} */}
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="room_name"
                    className="form-control"
                    placeholder="Room name"
                    required="required"
                    value={room_name}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                {/* <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    required="required"
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                </div> */}

                <div className="form-group">
                  {tags.map((tag,index) =>{
                    return(
                      <div key={index} className="">
                        {tag} <span onClick={() => removeTag(tag)}>x</span>
                      </div>
                    );
                  })}
                  <input 
                    type="tag"
                    name="tag"
                    className="form-control"
                    onKeyDown={addTag} 
                    value={tag} 
                    onChange={(e) => onChange(e)}/>
                </div>                        
                {/* <div className="form-group">
				<input
                  type="submit"
                  className="form-control btn btn-success btn-primary btn-block"
				  placeholder="Hello"
                //   value="Login"
                />
				 <input
                  type="submit"
                  className="form-control btn btn-success btn-primary btn-block"
                //   value="Login"
                />
				</div> */}
                <div>
                  <Modal.Footer/>
                    {/* <div>
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                    </div> */}

                    {/* <div>
                      <input
                        onClick={create} //onclick to create room
                        variant="primary"
                        type="submit"
                        className="form-control btn btn-primary btn-block"
                        value="Create Room"
                      />
                    </div> */}
                </div>
                {/* <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Create Room
                  </Button>
                </Modal.Footer> */}
              </form>
              <div>
                <button className="create-button" onClick={create}>Create</button>
              </div>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
        </Modal>
      </div>
    </div>
  );
}

export default Home;
