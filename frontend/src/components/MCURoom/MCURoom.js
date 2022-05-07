import {Mcu} from "../MCU/mcu.js";
import React, { useEffect, useRef } from "react";
import otherJPG from "../../img/other.jpg";
import "./style.css";
import $, { getScript } from "jquery";


const MCURoom = (props) => {
  //   const uploadForm = useRef(null);
  //   const newFunc = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    var meeting_id = urlParams.get("roomID");
    var user_id = window.prompt("Enter your username");

    console.log("Meeting ID: ", meeting_id);
    console.log("User ID: ", user_id);
    if (!user_id || !meeting_id) {
      alert("User id or meeting id is missing!");
      props.history.push({ pathname: `/home` });

      // window.location.href('/home');
      return;
    }
    // document.getElementById("meetingContainer").st
    $("meetingContainer").show();
	console.log(typeof(Mcu));
    Mcu._init(user_id, meeting_id);
  });

  //   }

  return (
    <div>
   
      <body>
        <main class=" d-flex flex-column home-wrap">
          <div class="g-top text-light">
            <div class="top-remote-video-show-wrap d-flex">
              {/* style={{marginRight: spacing + 'em'}} */}
              <div
                id="meetingContainer"
                class="w-75"
                style={{ display: "none"}}
              >
                <div class="call-wrap" style={{ backgroundColor: "black" }}>
                  <div
                    class="video-wrap"
                    id="divUsers"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <div id="me" class="userbox display-center flex-column">
                      <h2
                        class="display-center"
                        style={{ fontSize: 14 + "px" }}
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
                class="g-right-details-wrap bg-light text-secondary h-100"
                style={{ flexBasis: 25 + "%", zIndex: 1, display: "none" }}
              >
                <div
                  class="meeting-heading-wrap d-flex justify-content-between align-items-center pr-3 pl-3"
                  style={{ height: 10 + "vh" }}
                >
                  <div class="meeting-heading font-weight-bold ">
                    Meeing Details
                  </div>
                  <div class="meeting-heading-cross display-center cursor-pointer">
                    <span class="material-icons">clear</span>
                  </div>
                </div>
                <div
                  class="people-chat-wrap d-flex justify-content-between align-items-center ml-3 mr-3 pr-3 pl-3"
                  style={{ height: 10 + "vh", fontSize: 14 + "px" }}
                >
                  <div class="people-heading display-center cursor-pointer">
                    <div class="people-headin-icon display-center mr-1">
                      <span class="material-icons">people</span>
                    </div>
                    <div class="people-headin-text display-center">
                      Participant (<span class="participant-count">1</span>)
                    </div>
                  </div>
                  <div class="chat-heading d-flex just-content-round align-items-center cursor-pointer">
                    <div class="chat-heading-icon display-center mr-1">
                      <span class="material-icons">message</span>
                    </div>
                    <div class="chat-heading-text">Chat</div>
                  </div>
                </div>
                <div
                  class="in-call-chat-wrap mr-3 ml-3 pl-3 pr-3"
                  style={{
                    fontSize: 14 + "px",
                    height: 69 + "vh",
                    // overflowY: "scroll",
                  }}
                >
                  <div class="in-call-wrap-up" style={{ display: "none" }}>
                    <div class="in-call-wrap d-flex justify-content-between align-items-center mb-3">
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
                        <div class="participant-name ml-2">You</div>
                      </div>
                      <div class="participant-action-wrap display-center">
                        <div class="participant-action-dot display-center mr-2 cursor-pointer">
                          <span class="material-icons">more_vert</span>
                        </div>
                        <div class="participant-action-pin display-center mr-2 cursor-pointer">
                          <span class="material-icons">push_pin</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="chat-show-wrap text-secondary  flex-column justify-content-between h-100"
                    style={{ fontSize: 14 + "px", display: "flex" }}
                  >
                    <div class="chat-message-show" id="messages"></div>
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
                          }}
                        />
                      </div>
                      <div
                        class="chat-message-sent-action display-center"
                        id="btnsend"
                        style={{ color: "teal", cursor: "pointer" }}
                      >
                        <span class="material-icons">send</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="g-top-left bg-light text-secondary w-25 d-flex align-items-center justify-content-between pl-2 pr-2">
              <div class="top-left-participant-wrap pt-2 cursor-pointer">
                <div class="top-left-participant-icon">
                  <span class="material-icons">people</span>
                </div>
                <div class="top-left-participant-count participant-count">
                  1
                </div>
              </div>
              <div class="top-left-chat-wrap pt-2 cursor-pointer">
                <span class="material-icons">message</span>
              </div>
              <div class="top-left-time-wrap"></div>
            </div>
          </div>
          <div class="g-bottom bg-light m-0 d-flex justify-content-between align-items-center">
            <div class="bottom-left d-flex" style={{ height: 10 + "vh" }}>
              <div
                class="g-details border border-success mb-2"
                style={{ display: "none", minHeight: 19.5 + "vh" }}
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
                      <span class="copy_info font-weight-bold">
                        Copy Joining Info{" "}
                        <span
                          style={{
                            display: "none",
                            backgroundColor: "aquamarine",
                            borderRadius: 5 + "px",
                          }}
                          class="link-conf font-weight-bold p-1"
                        >
                          Link Copied
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="display-center cursor-pointer meeting-details-button">
                Meeting Details
                <span class="material-icons">keyboard_arrow_down</span>
              </div>
            </div>
            <div
              class="bottom-middle d-flex just-content-center align-items-center"
              style={{ height: 10 + "vh" }}
            >
              <div
                class="mic-toggle-wrap action-icon-style display-center mr-2 cursor-pointer"
                id="miceMuteUnmute"
              >
                <span class="material-icons" style={{ width: 100 + "%" }}>
                  mic_off
                </span>
              </div>
              <div class="end-call-wrap action-icon-style display-center mr-2 cursor-pointer">
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
              class="bottom-right d-flex just-content-center align-items-center mr-3"
              id="screenShare-wrap"
              style={{ height: 10 + "vh" }}
            >
              <div
                class="present-now-wrap d-flex just-content-center flex-column align-items-center mr-5 cursor-pointer"
                id="ScreenShareOnOf"
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
