import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useLocation, Link } from "react-router-dom";
import "./Room.css";
import hangup from "../img/hangup.svg";
import mute from "../img/mute.svg";
import share from "../img/share.svg";
import close from "../img/close.svg";
import { CardImgOverlay } from "reactstrap";
let userStream;
let isAdmin = false;

// console.log(navigator.mediaDevices.getUserMedia.noiseSuppression);

const Container = styled.div`
  padding: 50px;
  display: flex;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  position: relative;
`;

const FunContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  background: #35353F;
`

const StyledVideo = styled.video`
  height: auto;
  width: 100%;
  max-height: 30rem;
  max-width: 50rem;
  padding: 2%;
  position: relative;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Room = (props) => {
  const location = useLocation();
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = props.match.params.roomID;
  const senders = useRef([]);
  const [isHidden, setIsHidden] = useState(true);
  const [isMute, setIsMute] = useState(true);

  const closeRoom = async () => {
    if (isAdmin) {
      try {
        // const id = location.state.parseResponse.room_name;
        const params = location.state.parseResponse.room_link;
		
        const closeRoom = await fetch(
			process.env.REACT_APP_API_URL+"/rooms/close/${params}",
          {
            method: "DELETE",
          }
        );

        props.history.push(`/home`);
        // console.log(location.state.parseResponse.room_name);
      } catch (err) {
        console.error(err.message);
        console.log(err.message);
      }
    }
	else{
		       props.history.push(`/home`);
	}
  };

  const hideCam = () => {
    console.log("hideCam");
    const videoTrack = userStream
      .getTracks()
      .find((track) => track.kind === "video");
    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      setIsHidden(false);
      console.log(isHidden);
    } else {
      videoTrack.enabled = true;
      setIsHidden(true);
      console.log(isHidden);
    }
  };

  const muteMic = () => {
    console.log("muteMic");
    const audioTrack = userStream
      .getTracks()
      .find((track) => track.kind === "audio");
    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      setIsMute(false);
    } else {
      audioTrack.enabled = true;
      setIsMute(true);
    }
  };

  const shareScreen = () => {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
      const screenTrack = stream.getTracks()[0];
      senders.current
        .find((sender) => sender.track.kind === "video")
        .replaceTrack(screenTrack);
      screenTrack.onended = function () {
        senders.current
          .find((sender) => sender.track.kind === "video")
          .replaceTrack(userStream.current.getTracks()[1]);
      };
    });
  };

  useEffect(() => {
    socketRef.current = io.connect("/");
    console.log(socketRef.current);
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream = stream;
        socketRef.current.emit("join room", roomID); //when someone joins room
        socketRef.current.on("all users", (users) => {
          if (!users.length) {
            isAdmin = true;
            console.log("isAdmin");
          }
          console.log("isNotAdmin");
          console.log(users.length, " length");
          //get all the users
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            // userStream.current.getTracks().forEach(track => senders.current.push(track,userStream.current));
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push({
              peerID: userID,
              peer,
            });
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          const peerObj = {
            peer,
            peerID: payload.callerID,
          };

          setPeers((users) => [...users, peerObj]); //array of peer and userID
        });
        // socketRef.current.on("user joined", (payload) => {
        // 	const peer = addPeer(payload.signal, payload.callerID, stream);
        // 	peersRef.current.push({
        // 	  peerID: payload.callerID,
        // 	  peer,
        // 	});

        //   setPeers([...peersRef.current]);
        // });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("user left", (id) => {
          //id of person leaving
          // console.log(id," id");
          const peerObj = peersRef.current.find((p) => p.peerID === id); //find who is leaving
          if (peerObj) {
            peerObj.peer.destroy(); //simple-peer gives us to be able to destroy
          }

          console.log(peersRef.current.length, " length");
          if (peersRef.current.length === 0) {
            console.log("it is 0");
          }
          const peers = peersRef.current.filter((p) => p.peerID !== id); //removing peer from arrays
          peersRef.current = peers;
          setPeers(peers); //all new connected users
          //   console.log(peers.length,"peers left");
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div className="cover">
      <Container>
        <StyledVideo muted ref={userVideo} autoPlay playsInline />
        {peers.map((peer) => {
          return <Video key={peer.peerID} peer={peer.peer} />;
        })}
      </Container>

      <FunContainer>
      
        <div className="btn-container">
          <button className="close-room" onClick={closeRoom}>
            {/* Close Room */}
            <img src={hangup} style={{ width: "2.5vw" }} />
          </button>
        </div>
        <div className="btn-container">
          {isMute ? (
            <button className="mute-mic" onClick={muteMic}>
              {/* Mute microphone */}
              <img src={mute} style={{ width: "2.5vw" }} />
            </button>
          ) : (
            <button className="mute-mic-off" onClick={muteMic}>
              {/* Mute microphone */}
              <img src={mute} style={{ width: "2.5vw" }} />
            </button>
          )}
        </div>

        <div className="btn-container">
          <button className="share" onClick={shareScreen}>
            {/* Share screen */}
            <img src={share} style={{ width: "2.5vw" }} />
          </button>
        </div>

        <div className="btn-container">
          {isHidden ? (
            <button className="camera" onClick={hideCam}>
              {/* Close cam */}

              <img src={close} style={{ width: "2.5vw" }} />
            </button>
          ) : (
            <button className="camera-close" onClick={hideCam}>
              {/* Close cam */}

              <img src={close} style={{ width: "2.5vw" }} />
            </button>
          )}
        </div>
      </FunContainer>
      
    </div>
  );
};

export default Room;
