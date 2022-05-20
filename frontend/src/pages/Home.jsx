import React, { Fragment, useState, useEffect, useRef } from "react";
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
import "../components/SearchBar/SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import iconPanel from "../img/iconPanel.svg";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import joinPic from "../img/Join.svg";
import searchPic from "../img/searchpic.svg";
import spiralDown from "../img/spiralDown.svg";

import Clock from "react-live-clock";
import clockpic from "../img/clock.svg";

import {
  BsFillChatDotsFill,
  BsChatDots,
  BsFillPersonFill,
  BsChatDotsFill,
  BsFillLockFill,
} from "react-icons/bs";
import logo from "../img/socialiteicon.svg";
import user1 from "../img/user1.jpg";
import user2 from "../img/user2.jpg";
import { fontFamily, fontSize } from "@mui/system";
import { Hidden } from "@mui/material";
import usePagination from "@mui/material/usePagination/usePagination";

function Home(props) {
  const [createRoomInputs, setRoomInputs] = useState({
    room_name: "",
    password: "",
  });
  const { room_name, password, tag } = createRoomInputs;
  const [user_id, setId] = useState("");
  let room_link;
  const status = true;
  const room_member = 1;

  const [name, setName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [tags, setTags] = useState([]);
  const [room, setRoomOffset] = useState(0);

  var time = new Date();
  var lTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      let queryInput = searchInput;
      if (!queryInput) {
        queryInput = "";
      }
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/rooms/searchroom/?name=${queryInput}`
      );
      //   const response = await fetch( `http://localhost:5000/rooms/searchroom/?name=${name}`);

      const parseResponse = await response.json();
      console.log(parseResponse);
      setData(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };
  const joinRoomFunc = async (link) => {
    // var room_id = window.prompt("Enter the room ID");
    // props.history.push({ pathname: `/room/?roomID=${room_id}` });
    room_link = link;
    const action = "join";
    try {
      const body = {
        room_link,
        action,
      };
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/rooms/userjoined",
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (response.status == 200) {
        props.history.push({
          pathname: `/room/?roomID=${link}`,
          state: { name },
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const create = () => {
    console.log(user_id);
    console.log(name);
    console.log(room_name);
    console.log(password);
    console.log(status);
    console.log(tags);

    addToDb();
  };

  const ClipisText = (props) => {
    const { children } = props;

    return (
      <div
        style={{
          //overflow
          // overflow: "hidden",
          textOverflow: "clip",
          // maxWidth: 100,
          maxLength: 8,
          fontSize: "1.4vw",
          paddingLeft: ".1vw",
        }}
      >
        {children}
      </div>
    );
  };

  const addToDb = async () => {
    // e.preventDefault();

    // console.log(eight_digit_value);
    const newValue = uuid();
    // var eight_digit_value = Math.floor(Math.random() * 100000000);
    room_link = newValue;

    try {
      const body = {
        user_id,
        room_name,
        password,
        room_link,
        status,
        room_member,
        tags,
      };
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/rooms/createroom",
        // "http://localhost:5000/rooms/createroom",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const parseResponse = await response.json();
      console.log(parseResponse);
      //   console.log(response);

      if (response.status == 200) {
        props.history.push({
          pathname: `/room/?roomID=${room_link}`,
          state: { name },
        });
        // props.history.push({pathname: `/room/${room_link}`, search: '?query=abc', state:{parseResponse} });
        // toast.success("Room created");
      } else {
        toast.error(parseResponse);
      }
    } catch (err) {
      console.error(err.message);
      toast("Room name already exists!");
    }
  };

  const getRoomData = (item) => {
    console.log(item);
  };
  const getName = async (e) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/dashboard/",
        {
          method: "GET",
          headers: { jwt_token: localStorage.token },
        }
      );

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
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/rooms/getrooms",
        {
          method: "GET",
        }
      );

      const parseResponse = await response.json();

      setData(parseResponse);
      console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    onGetData();
    // onSubmitForm();
    getName();
  }, [user_id]);

  // test tag input
  const addTag = (e) => {
    // if (e.key === "Enter") {
    //   if (e.target.value.length > 0) {
    //     setTags(oldArray => [...oldArray, e.target.value]);

    //     // setTags([...tags, e.target.value]);
    //     // setTags([...tags, e.target.value]);
    //     // e.target.value = "";
    //   }
    // }
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  };
  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
  // const roomsInPage = 10;
  // const handlePageClick = (event, page) => {
  //   const newPage = (page - 1) * roomsInPage;
  //   setRoomOffset(newPage);
  // };

  return (
    <section id="container">
      <item-a>
        <div className="search">
          <form className="searchInputs" onSubmit={onSubmitForm}>
            <input
              type="text"
              placeholder="Search by tag or name..."
              // className="form-control"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSubmitForm}
            />
            {/* <button className="btn btn-success">Search</button> */}
            <div className="searchIcon">
              <SearchIcon onClick={onSubmitForm} />
            </div>
          </form>
        </div>
      </item-a>

      <item-b>
        {data.length != 0 ? (
          <div>
            <ul class="grid-container">
              {data.map((item, index) => (
                <div
                  className="Box_Layout"
                  style={{
                    height: "15.5vw",
                    width: "22vw",
                    top: "3vw",
                    left: "5vw",
                    // marginLeft: "4vw",
                    // marginTop: "2vw",
                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "center",
                  }}
                >
                  <div
                    className={style.roomCardContainer}
                    value={item.room_name}
                    key={index}
                    //   onClick={() => getRoomId(item.room_name)}
                    // onClick={() => {
                    //   getName();
                    //   getRoomData(item);
                    //   joinRoom(item);
                    // }}
                    onClick={() => {
                      joinRoomFunc(item.room_link);
                    }}
                    //   onClick={() => console.log(item.room_name +"  "+item.room_link)} //join room function
                  >
                    {/* Room Title */}
                    <div className={style.upperIndex}>
                      <div
                        style={{
                          fontSize: "1.8vw",
                          marginBottom: ".5vw",
                          fontWeight: "600",
                          fontFamily: "'Open Sans', sans-serif",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {item.room_name}
                        {/* LockRoom condition? */}
                        {item.password != "" ? (
                          <BsFillLockFill
                            style={{ marginRight: "1vw", marginTop: ".5vw" }}
                          />
                        ) : (
                          <></>
                        )}
                        {/* LockRoom */}
                        <BsFillLockFill
                          style={{ marginRight: "1vw", marginTop: ".5vw" }}
                        />
                      </div>
                    </div>

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
                          <span
                            className="mr-2"
                            style={{
                              paddingRight: ".5vw",
                              paddingTop: "2vw",
                            }}
                          >
                            {item.room_member}
                          </span>{" "}
                          {/* <span className="mx-1"></span> */}
                          <span
                            style={{
                              paddingRight: ".5vw",
                              paddingTop: "1.6vw",
                              fontSize: "2vw",
                            }}
                          >
                            <BsFillPersonFill />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chip */}
                  <div
                    style={{
                      // position: "static",
                      // display: "flex",
                      // paddingLeft: "0vw",
                      marginBottom: "3vw",
                      // paddingTop: ".3vw"
                    }}
                    className="d-flex align-items-center"
                  >
                    {item.tags.map((data, index) => (
                      <li
                        style={{
                          // marginTop: "1vw",
                          fontSize: "2vw",
                          paddingLeft: "1vw",
                          display: "list-item",
                        }}
                      >
                        <Chip
                          label={<ClipisText>{item.tags[index]}</ClipisText>}
                          onClick={() =>
                            console.log("item.tags[index]: ", item.tags[index])
                          }
                          color="primary"
                          style={{
                            // marginLeft: "-3.0vw",
                            position: "relative",
                            maxWidth: "10vw",
                            padding: ".1vw",
                            maxHeight: "3vw",
                            // marginBottom: "0vw",
                            // paddingLeft: 15,
                            // paddingRight: 15,
                            // paddingBottom: 3,
                            backgroundColor: "#114C60",
                          }}
                        />
                      </li>
                    ))}
                  </div>
                </div>
              ))}
            </ul>
            <div class="d-flex justify-content-center mt-5">
              {/* <Pagination
                count={Math.ceil(data.length / 10)}
                color="primary"
                style={{
                  marginTop: "2vw",
                  width: "auto",
                  height: "4vw",
                }}
                size="large"
                // onChange={handlePageClick}
              /> */}
            </div>
          </div>
        ) : (
          <div className="NoRoom">
            <CircularProgress color="primary" thickness="4" size="3.5vw" />
            {/* <p>No rooms found</p> */}
            {/* <button>test</button> */}
          </div>
        )}
      </item-b>

      <item-c>
        <div class=" " style={{ position: "sticky", top: "3vw" }}>
          <div class="d-flex justify-content-center mt-4" style={{}}>
            <img
              src={iconPanel}
              alt=""
              class=""
              style={{
                width: "12vw",
              }}
            />
          </div>
          <div>
            <Divider
              class="mt-2"
              variant="middle"
              style={{ color: "#65E291" }}
            />
            <div
              class="d-flex justify-content-center"
              style={{
                color: "#114C60",
                fontSize: "1.6vw",
                fontWeight: "bold",
              }}
            >
              {"Hi, " + name}
            </div>
            <img
              src={clockpic}
              style={{
                width: "2.5vw",
                marginTop: "1vw",
                marginLeft: "6.7vw",
              }}
            />
            <div
              class="d-flex justify-content-center mt-4 "
              style={{
                color: "#114C60",
                fontSize: "1.3vw",
                fontWeight: "bold",
              }}
            >
              <Clock
                format={"HH:mm:ss"}
                ticking={true}
                timezone={"Asia/Bangkok"}
              />
            </div>
            <Divider
              class="mt-4 "
              variant="middle"
              style={{ color: "#65E291" }}
            />
            <div class="d-flex justify-content-center mt-5 mb-4">
              <img
                src={joinPic}
                style={{
                  width: "3.5vw",
                  marginLeft: "1vw",
                }}
              />
              <div
                style={{
                  marginLeft: "1.0vw",
                  marginRight: ".5vw",
                  fontSize: "1vw",
                  alignItems: "center",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Join room by tapping on the room card.
              </div>
            </div>
            <Divider
              class="mt-2"
              variant="middle"
              style={{ color: "#65E291" }}
            />
            <div class="d-flex justify-content-center mt-5 mb-4">
              <img
                src={searchPic}
                style={{
                  width: "3.5vw",
                  marginLeft: "1vw",
                }}
              />
              <div
                style={{
                  marginLeft: "1.0vw",
                  marginRight: ".5vw",
                  paddingBottom: "1vw",
                  fontSize: "1vw",
                  alignItems: "center",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Use the searchbar to search for a room.
              </div>
            </div>
            <Divider
              class="mt-4"
              variant="middle"
              style={{ color: "#65E291" }}
            />
            <div class="d-flex justify-content-center mt-1 mb-4">
              <div
                style={{
                  paddingBottom: ".5vw",
                  fontSize: "1vw",
                  alignItems: "center",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Create room here.
              </div>
              <img className="beatdown" src={spiralDown} />
            </div>
          </div>
        </div>
        {/* <Fab
          onClick={joinRoomFunc}
          variant="extended"
          aria-label="add"
          style={{
            position: "fixed",
            right: 10,
            bottom: 70,
            background: "rgba(45, 52, 54, 1)",
            color: "#fff",
            fontSize: 15,
          }}
        >
          Join Room
        </Fab> */}
        {/* build icon */}

        <Fab
          //   onClick={handleShow}
          onClick={handleShow}
          variant="extended"
          aria-label="add"
          style={{
            position: "fixed",
            right: 10,
            bottom: 10,
            background: "#114C60",
            color: "#fff",
            fontSize: 15,
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Create Room
        </Fab>

        {/* Create Room Box */}
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header className="modal-style" closeButton>
            <Modal.Title>Create Room</Modal.Title>
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

                <div className="tag-container">
                  {tags.map((tag, index) => {
                    return (
                      <div key={index} className="tag">
                        <span className="text">{tag} </span>
                        <span className="close" onClick={() => removeTag(tag)}>
                          &times;
                        </span>
                      </div>
                    );
                  })}
                  <input
                    type="tag"
                    name="tag"
                    className="tags-input"
                    placeholder="Enter tags"
                    onKeyDown={addTag}
                    // value={tag}
                    onChange={(e) => onChange(e)}
                  />
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
                {/* <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Create Room
                  </Button>
                </Modal.Footer> */}
                {/* <TagsInput /> */}
              </form>
              <div>
                <button className="create-button" onClick={create}>
                  Create
                </button>
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
      </item-c>
    </section>
    //   <section id="container">
    //     <item-a/>
    //     <item-b/>
    //     <item-c/>

    // </section>
  );
}

export default Home;
