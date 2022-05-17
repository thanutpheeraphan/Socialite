import { Mcu } from "../MCU/mcu.js";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import otherJPG from "../../img/other.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import $ from "jquery";
import { borderRadius } from "@mui/system";

const MCURoom = (props) => {
  const location = useLocation();
  const userName = location.state.name;
  //   const uploadForm = useRef(null);
  //   const newFunc = () => {
  useEffect(() => {
    // const location = useLocation();
    // const testName = location.state.parseResponse.name;
    console.log(props);
    console.log(userName);
    let roomID = props.match.params.roomID;
    console.log(roomID.slice(8));
    const urlParams = new URLSearchParams(window.location.search);
    var meeting_id = urlParams.get("roomID");
    var user_id = userName;

    console.log("Meeting ID: ", meeting_id);
    console.log("User ID: ", user_id);
    if (!user_id || !meeting_id) {
      alert("User id or meeting id is missing!");
      props.history.push({ pathname: `/` });

      // window.location.href('/home');
      return;
    }
    // document.getElementById("meetingContainer").st
    $("meetingContainer").show();
    // console.log(typeof Mcu);
    Mcu._init(user_id, meeting_id);
  });

  //   }

  return (
    <div>
      <body>
        <main
          class=" d-flex flex-column home-wrap"
          style={{
            backgroundColor: "white",
            // test height
            height: "92vh",
          }}
        >
          <div class="g-top text-light">
            <div class="top-remote-video-show-wrap d-flex">
              {/* style={{marginRight: spacing + 'em'}} */}
              <div
                id="meetingContainer"
                class="w-75"
                style={{ display: "none" }}
              >
                <div class="call-wrap" style={{ backgroundColor: "#C7D9BF" }}>
                  <div
                    class="video-wrap"
                    id="divUsers"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <div id="me" class="userbox display-center flex-column">
                      <h2
                        class="display-center"
                        style={{ fontSize: 14 + "px", color: "black" }}
                      ></h2>
                      <div class="display-center">
                        <video autoPlay muted id="locaVideoPlayer"></video>
                      </div>
                    </div>
                    <div
                      id="otherTemplate"
                      class="userbox display-center flex-column"
                      style={{ display: "none" }}
                    >
                      <h2
                        class="display-center"
                        style={{ fontSize: 14 + "px" }}
                      ></h2>
                      <div class="display-center">
                        <video autoPlay muted></video>
                        <audio
                          autoPlay
                          controls
                          style={{ display: "none" }}
                        ></audio>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="g-right-details-wrap text-secondary h-100"
                style={{
                  flexBasis: 25 + "%",
                  zIndex: 1,
                  display: "none",
                  backgroundColor: "#F0F0F0",
                  borderColor: "2px #F0F0F0",
                }}
              >
                <div
                  class="meeting-heading-wrap d-flex justify-content-between align-items-center pe-3 ps-3"
                  style={{
                    height: 6 + "vh",
                    color: "white",
                    backgroundColor: "#114C60",
                  }}
                >
                  <div class="meeting-heading fw-bold ">Meeting Details</div>
                  <div class="meeting-heading-cross display-center cursor-pointer">
                    <span class="material-icons">clear</span>
                  </div>
                </div>

                <div
                  class="people-chat-wrap d-flex justify-content-between align-items-center ms-3 me-3 pe-3 ps-3"
                  style={{
                    height: 7 + "vh",
                    fontSize: 14 + "px",
                  }}
                >
                  <div
                    class="people-heading display-center cursor-pointer"
                    style={{ color: "black" }}
                  >
                    <div
                      class="people-headin-icon display-center me-1"
                      style={{ color: "black" }}
                    >
                      <span class="material-icons">people</span>
                    </div>
                    <div
                      class="people-headin-text display-center"
                      style={{ color: "black" }}
                    >
                      Participant (<span class="participant-count">1</span>)
                    </div>
                  </div>
                  <div class="chat-heading d-flex just-content-round align-items-center cursor-pointer">
                    <div class="chat-heading-icon display-center me-1">
                      <span class="material-icons" style={{ color: "black" }}>
                        message
                      </span>
                    </div>
                    <div class="chat-heading-text" style={{ color: "black" }}>
                      Chat
                    </div>
                  </div>
                </div>
                <div
                  class="in-call-chat-wrap me-3 ms-3 ps-3 pe-3"
                  style={{
                    fontSize: 14 + "px",
                    height: 69 + "vh",
                    // overflowY: "scroll",
                    // backgroundColor: "grey",
                    // opacity: "0.1"
                  }}
                >
                  <div class="in-call-wrap-up" style={{ display: "none" }}>
                    <div
                      class="in-call-wrap d-flex justify-content-between align-items-center mb-3"
                      style={{ color: "black" }}
                    >
                      <div class="participant-img-name-wrap display-center cursor-pointer">
                        <div class="participant-img">
                          <img
                            src={otherJPG}
                            alt=""
                            class="border border-secondary"
                            style={{
                              height: 40 + "px",
                              width: 40 + "px",
                              borderRadius: 50 + "%",
                            }}
                          />
                        </div>
                        <div
                          class="participant-name ms-2"
                          style={{ color: "black" }}
                        >
                          You
                        </div>
                      </div>
                      <div class="participant-action-wrap display-center">
                        <div class="participant-action-dot display-center me-2 cursor-pointer">
                          <span
                            class="material-icons"
                            style={{ color: "black" }}
                          >
                            more_vert
                          </span>
                        </div>
                        <div class="participant-action-pin display-center me-2 cursor-pointer">
                          <span
                            class="material-icons"
                            style={{ color: "black" }}
                          >
                            push_pin
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="chat-show-wrap text-secondary  flex-column justify-content-between h-100"
                    style={{ fontSize: 14 + "px", display: "flex" }}
                  >
                    <div
                      class="chat-message-show mb-3"
                      id="messages"
                      style={{
                        overflowY: "auto",
                        height: "35.5vw",
                        // marginLeft: "auto",
                        // paddingBottom: "1vw",
                      }}
                    ></div>
                    <div
                      class="chat-message-sent d-flex justify-content-between align-items-center"
                      style={{ marginBottom: 35 + "px" }}
                    >
                      <div
                        class="chat-message-sent-input"
                        style={{ width: 85 + "%" }}
                      >
                        <input
                          type="text"
                          name=""
                          class="chat-message-sent-input-field w-100"
                          id="msgbox"
                          placeholder="Send a message to everyone"
                          style={{
                            borderBottom: 1 + "px solid teal",
                            border: "none",
                            backgroundColor: "white",
                          }}
                        />
                      </div>
                      <div
                        class="chat-message-sent-action display-center"
                        id="btnsend"
                        style={{ color: "#114C60", cursor: "pointer" }}
                      >
                        <span class="material-icons">send</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="g-top-left text-secondary d-flex align-items-center justify-content-between ps-2 pe-2 mt-4"
              style={{
                color: "white",
                borderRadius: "20px",
                backgroundColor: "#1B9370",
                width: "12vw",
                right: "1vw",
              }}
            >
              <div class="top-left-participant-wrap pt-3 ps-5 ">
                <div
                  class="top-left-participant-icon"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <span
                    class="material-icons ps-4"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    people
                  </span>
                  <div></div>
                </div>
                <div
                  class="top-left-participant-count participant-count"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  1
                </div>
              </div>
              <div
                class="top-left-chat-wrap pt-3 d-flex"
                style={{
                  cursor: "pointer",
                }}
              >
                <span class="material-icons ">message</span>
              </div>
              <div class="top-left-time-wrap"></div>
            </div>
          </div>
          <div
            class="g-bottom m-0 d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#114C60" }}
          >
            <div class="bottom-left d-flex" style={{ height: 10 + "vh" }}>
              <div
                class="g-details border border-success mb-2"
                style={{
                  display: "none",
                  minHeight: 19.5 + "vh",
                }}
              >
                <div class="g-details-heading d-flex justify-content-between align-items-center border-bottom pb-1"></div>
                <div class="g-details-heading-show-wrap">
                  <div class="g-details-heading-show">
                    <div style={{ fontWeight: 600, color: "gray" }}>
                      Joining Info
                    </div>
                    <div
                      class="meeting_url"
                      style={{ padding: 5 + "px 0" }}
                      data-toggle="tooltip"
                      data-placement="top"
                    ></div>
                    <div style={{ cursor: "pointer" }}>
                      <span
                        class="material-icons"
                        style={{ fontSize: 14 + "px" }}
                      >
                        content_copy
                      </span>
                      <span class="copy_info fw-bold">
                        Copy Joining Info{" "}
                        <span
                          style={{
                            display: "none",
                            backgroundColor: "aquamarine",
                            borderRadius: 5 + "px",
                          }}
                          class="link-conf fw-bold p-1"
                        >
                          Link Copied
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="display-center cursor-pointer meeting-details-button">
                Room Details
                <span class="material-icons">keyboard_arrow_down</span>
              </div>
            </div>
            {/* bottomBar */}
            <div
              class="bottom-middle d-flex just-content-center align-items-center"
              style={{ height: 10 + "vh" }}
            >
              <div
                class="mic-toggle-wrap action-icon-style display-center me-2 cursor-pointer"
                id="miceMuteUnmute"
              >
                <span class="material-icons" style={{ width: 100 + "%" }}>
                  mic_off
                </span>
              </div>

              <div class="end-call-wrap action-icon-style display-center me-2 cursor-pointer">
                <span class="material-icons text-danger">call</span>
              </div>

              <div
                class="video-toggle-wrap action-icon-style display-center cursor-pointer"
                id="videoCamOnOff"
              >
                <span class="material-icons" style={{ width: 100 + "%" }}>
                  videocam_off
                </span>
              </div>
            </div>
            <div
              class="bottom-right d-flex just-content-center align-items-center me-3"
              id="screenShare-wrap"
              style={{ height: 10 + "vh" }}
            >
              <div
                class="present-now-wrap d-flex just-content-center flex-column align-items-center me-5 cursor-pointer"
                id="ScreenShareOnOf"
                style={{ color: "white" }}
              >
                <span class="material-icons">present_to_all</span>
                <div>Present Now</div>
              </div>

              <div
                class="option-wrap cursor-pointer display-center"
                style={{ height: 10 + "vh", position: "relative" }}
              >
                <div class="recording-show">
                  <button class="btn btn-dark text-danger start-record">
                    Start Recording
                  </button>
                </div>
                <div class="option-icon">
                  <span class="material-icons">more_vert</span>
                </div>
              </div>
            </div>
          </div>
          <div class="top-box-show" style={{ display: "none" }}></div>
        </main>
      </body>
    </div>
  );
};

export default MCURoom;
