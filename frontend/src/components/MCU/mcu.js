import "bootstrap/dist/css/bootstrap.min.css";
import "../MCURoom/style.css";
import $ from "jquery";
import otherJPG from "../../img/other.jpg";
import { toast } from "react-toastify";
const io = require("socket.io-client");

var McuProcess = (function () {
  var peers_connection_ids = [];
  var peers_connection = [];
  var remote_vid_stream = [];
  var remote_aud_stream = [];
  var local_div;
  var serverProcess;
  var audio;
  var isAudioMute = true;
  var rtp_aud_senders = [];
  var video_states = {
    None: 0,
    Camera: 1,
    ScreenShare: 2,
  };
  var video_st = video_states.None;
  var videoCamTrack;
  var rtp_vid_senders = [];
  var default_audio;
  var default_video;
  var default_output = 0;
  var my_connection_id;
  async function _init(SDP_function, my_connid) {
    serverProcess = SDP_function;

    my_connection_id = my_connid;
    eventProcess();
    local_div = document.getElementById("locaVideoPlayer");
  }

  async function setAudio(id) {
    await miceMute();
    default_audio = id;
  }

  async function setVideo(id) {
    await videoProcess(video_states.None);
    default_video = id;
  }

  async function changeOutputDevice(id) {
    default_output = id;
    //change output device here by creating loop for each remote_aud_stream then set it like below
    //var remoteAudioPlayer = document.getElementById("a_" + connid);
    //then attachsinkid to each item using code from audioVideoControlComponent
    //   console.log("remote_aud_stream: ",remote_aud_stream)
    //   console.log("my_connection_id: ",my_connection_id);

    for (const [key, value] of Object.entries(remote_aud_stream)) {
      // console.log(`${key}: ${value}`);
      var remoteAudioPlayer = document.getElementById("a_" + key);
      if (typeof remoteAudioPlayer.sinkId !== "undefined") {
        console.log("inside if");
        remoteAudioPlayer
          .setSinkId(default_output)
          .then(() => {
            console.log(
              `Success, audio output device attached: ${default_output}`
            );
          })
          .catch((error) => {
            let errorMessage = error;
            if (error.name === "SecurityError") {
              errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
            }
            console.error(errorMessage);
            // Jump back to first output device in the list as it's the default.
            // audioOutputSelect.selectedIndex = 0;
          });
      } else {
        console.warn("Browser does not support output device selection.");
      }
    }
    //   remote_aud_stream.forEach((r_stream)=>{
    // 	  console.log("stream: ", r_stream);

    //   });
    //   console.log(typeof(remote_aud_stream));
    //   console.log("peers_connection_ids: ",peers_connection_ids);
    //   console.log("my_connection_id: ",my_connection_id);
    //   console.log("remote_aud_stream: ",remote_aud_stream)
    //   console.log("id: ", default_output);
  }

  async function miceMute() {
    if (!audio) {
      await loadAudio();
    }
    if (!audio) {
      alert("Audio permission has not granted");
      return;
    }
    audio.enabled = false;
    $("#miceMuteUnmute").html(
      "<span class='material-icons' style='width:100%; display: flex; justify-content: center;'>mic_off</span>"
    );
    removeMediaSenders(rtp_aud_senders);
    audio.stop();
    audio = null;
    isAudioMute = true;
  }

  function eventProcess() {
    $("#miceMuteUnmute").on("click", async function () {
      if (!audio) {
        await loadAudio();
      }
      if (!audio) {
        alert("Audio permission has not granted");
        return;
      }
      if (isAudioMute) {
        //true
        audio.enabled = true;
        $(this).html(
          "<span class='material-icons' style='width:100%; display: flex; justify-content: center;'>mic</span>"
        );
        console.log(audio);
        console.log(rtp_aud_senders);
        updateMediaSenders(audio, rtp_aud_senders);
      } else {
        //false
        audio.enabled = false;
        $(this).html(
          "<span class='material-icons' style='width:100%; display: flex; justify-content: center;'>mic_off</span>"
        );
        removeMediaSenders(rtp_aud_senders);
        audio.stop();
        audio = null;
      }
      isAudioMute = !isAudioMute; //!true
    });
    $("#videoCamOnOff").on("click", async function () {
      if (video_st == video_states.Camera) {
        await videoProcess(video_states.None);
      } else {
        await videoProcess(video_states.Camera);
      }
    });
    // $(document).on("click", ".participant-action-dot", function (this) {

    // 	console.log($(this).attr('id'));
    // 	console.log("Clicked: ", initconID);
    // 	console.log(sdp);
    // });

    $("#ScreenShareOnOf").on("click", async function () {
      if (video_st == video_states.ScreenShare) {
        await videoProcess(video_states.None);
      } else {
        await videoProcess(video_states.ScreenShare);
      }
    });
  }

  async function loadAudio() {
    try {
      var astream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: {
          deviceId: default_audio ? { exact: default_audio } : undefined,
        },
      });

      audio = astream.getAudioTracks()[0];
      console.log("audio: ", audio);
      audio.enabled = false;
    } catch (e) {
      console.log(e);
    }
  }

  function connection_status(connection) {
    if (
      connection &&
      (connection.connectionState == "new" ||
        connection.connectionState == "connecting" ||
        connection.connectionState == "connected")
    ) {
      return true;
    } else {
      return false;
    }
  }
  async function updateMediaSenders(track, rtp_senders) {
    for (var con_id in peers_connection_ids) {
      if (connection_status(peers_connection[con_id])) {
        if (rtp_senders[con_id] && rtp_senders[con_id].track) {
          rtp_senders[con_id].replaceTrack(track);
        } else {
          rtp_senders[con_id] = peers_connection[con_id].addTrack(track);
        }
      }
    }
  }

  function removeMediaSenders(rtp_senders) {
    for (var con_id in peers_connection_ids) {
      if (rtp_senders[con_id] && connection_status(peers_connection[con_id])) {
        peers_connection[con_id].removeTrack(rtp_senders[con_id]);
        rtp_senders[con_id] = null;
      }
    }
  }

  function removeVideoStream(rtp_vid_senders) {
    if (videoCamTrack) {
      videoCamTrack.stop();
      videoCamTrack = null;
      local_div.srcObject = null;
      removeMediaSenders(rtp_vid_senders);
    }
  }

  async function videoProcess(newVideoState) {
    if (newVideoState == video_states.None) {
      $("#videoCamOnOff").html(
        "<span class='material-icons' style='width:100%; display: flex; justify-content: center;'>videocam_off</span>"
      );
      $("#ScreenShareOnOf").html(
        '<span class="material-icons">present_to_all</span><div>Present Now</div>'
      );
      video_st = newVideoState;

      removeVideoStream(rtp_vid_senders);

      serverProcess(
        JSON.stringify({
          Video_switch_off: "Video_switch_off", //couldbehere not here
        }),
        rtp_vid_senders
      );

      return;
    }
    if (newVideoState == video_states.Camera) {
      $("#videoCamOnOff").html(
        "<span class='material-icons' style='width:100%; '>videocam_on</span>"
      );
    }
    try {
      var vstream = null;
      if (newVideoState == video_states.Camera) {
        console.log("defaul_video: ", default_video);
        vstream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 1920,
            height: 1080,
            deviceId: default_video ? { exact: default_video } : undefined,
          },
          audio: false,
        });
      } else if (newVideoState == video_states.ScreenShare) {
        vstream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            width: 1920,
            height: 1080,
          },
          audio: false,
        });
        vstream.oninactive = (e) => {
          removeVideoStream(rtp_vid_senders);
          $("#ScreenShareOnOf").html(
            '<span class="material-icons ">present_to_all</span><div >Present Now</div>'
          );
        };
      }
      if (vstream && vstream.getVideoTracks().length > 0) {
        console.log("vstream: ", vstream);
        // videoCamTrack = vstream.getVideoTracks()[default_video];
        videoCamTrack = vstream.getVideoTracks()[0];

        console.log("videoTracks: ", vstream.getVideoTracks()); //fix here probably
        if (videoCamTrack) {
          local_div.srcObject = new MediaStream([videoCamTrack]);
          console.log("videoCamTrack: ", videoCamTrack);
          console.log(rtp_vid_senders);
          updateMediaSenders(videoCamTrack, rtp_vid_senders);
        }
      }
    } catch (e) {
      console.log(e);
      return;
    }
    video_st = newVideoState;
    if (newVideoState == video_states.Camera) {
      $("#videoCamOnOff").html(
        '<span class="material-icons" style="width: 100%; display: flex; justify-content: center;">videocam</span>'
      );
      $("#ScreenShareOnOf").html(
        '<span class="material-icons ">present_to_all</span><div >Present Now</div>'
      );
    } else if (newVideoState == video_states.ScreenShare) {
      $("#videoCamOnOff").html(
        '<span class="material-icons" style="width: 100%; display: flex; justify-content: center;">videocam_off</span>'
      );
      $("#ScreenShareOnOf").html(
        '<span class="material-icons text-success">present_to_all</span><div class="text-success">Stop Present Now</div>'
      );
    }
  }

  var iceConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
      {
        urls: "stun:stun1.l.google.com:19302",
      },
    ],
  };

  async function setConnection(connid) {
    console.log("setConnection");
    var connection = new RTCPeerConnection(iceConfiguration);
    console.log("connection: ", connection);

    connection.onnegotiationneeded = async function (event) {
      console.log("setting offer");

      await setOffer(connid);
    };
    connection.onicecandidate = function (event) {
      console.log("oneicecandidate");

      if (event.candidate) {
        serverProcess(
          JSON.stringify({ icecandidate: event.candidate }),
          connid
        );
      }
    };
    connection.ontrack = function (event) {
      console.log("ontrack");

      if (!remote_vid_stream[connid]) {
        console.log("!remote_vid_stream[connid]");
        remote_vid_stream[connid] = new MediaStream();
      }
      if (!remote_aud_stream[connid]) {
        console.log("!remote_aud_stream[connid]");
        remote_aud_stream[connid] = new MediaStream();
      }

      if (event.track.kind == "video") {
        console.log("event.track.kind == video");
        remote_vid_stream[connid]
          .getVideoTracks()
          .forEach((t) => remote_vid_stream[connid].removeTrack(t));
        remote_vid_stream[connid].addTrack(event.track);
        var remoteVideoPlayer = document.getElementById("v_" + connid);
        remoteVideoPlayer.srcObject = null;
        remoteVideoPlayer.srcObject = remote_vid_stream[connid];
        remoteVideoPlayer.load();
      } else if (event.track.kind == "audio") {
        console.log("event.track.kind == audio");
        console.log(
          "remote_aud_stream[connid].getAudioTracks :",
          remote_aud_stream[connid].getAudioTracks()
        );
        remote_aud_stream[connid]
          .getAudioTracks()
          .forEach((t) => remote_aud_stream[connid].removeTrack(t));
        remote_aud_stream[connid].addTrack(event.track);
        console.log("event.track: ", event.track);
        console.log("remote_aud_stream[connid]: ", remote_aud_stream[connid]);
        var remoteAudioPlayer = document.getElementById("a_" + connid);
        remoteAudioPlayer.srcObject = null;
        remoteAudioPlayer.srcObject = remote_aud_stream[connid];
        var tempSinkId =
          "d8ee9b45b85dd0bf36bc09a80a523d5922704f71c614995031dfadb9e37053e4";
        if (typeof remoteAudioPlayer.sinkId !== "undefined") {
          console.log("sinkId 1", remoteAudioPlayer.sinkId);
        } else {
          console.log("sinkId not working");
        }
        //probably set sink id here
        remoteAudioPlayer.load();
      }
    };
    peers_connection_ids[connid] = connid;
    peers_connection[connid] = connection;

    if (
      video_st == video_states.Camera ||
      video_st == video_states.ScreenShare
    ) {
      if (videoCamTrack) {
        console.log("updateMediaSenders");
        updateMediaSenders(videoCamTrack, rtp_vid_senders);
      }
    }

    return connection;
  }
  async function setOffer(connid) {
    var connection = peers_connection[connid];
    var offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
    serverProcess(
      JSON.stringify({
        offer: connection.localDescription,
      }),
      connid
    );
  }
  async function SDPProcess(message, from_connid) {
    message = JSON.parse(message);
    console.log(message);
    if (message.answer) {
      console.log("message is answer");
      await peers_connection[from_connid].setRemoteDescription(
        new RTCSessionDescription(message.answer)
      );
    } else if (message.offer) {
      console.log("message is offer");
      if (!peers_connection[from_connid]) {
        console.log("!peers_connection[from_connid]");
        await setConnection(from_connid);
      }
      await peers_connection[from_connid].setRemoteDescription(
        new RTCSessionDescription(message.offer)
      );
      var answer = await peers_connection[from_connid].createAnswer();
      await peers_connection[from_connid].setLocalDescription(answer);
      serverProcess(
        JSON.stringify({
          answer: answer,
        }),
        from_connid
      );
    } else if (message.icecandidate) {
      console.log("message.icecandidate");

      if (!peers_connection[from_connid]) {
        console.log("!peers_connection[from_connid]");

        await setConnection(from_connid);
      }
      try {
        await peers_connection[from_connid].addIceCandidate(
          message.icecandidate
        );
      } catch (e) {
        console.log(e);
      }
    } else if (message.Video_switch_off) {
      document.querySelector("#v_" + from_connid + "").srcObject = null; //couldbehere not here
    }
  }

  async function closeConnection(connid) {
    peers_connection_ids[connid] = null;
    if (peers_connection[connid]) {
      peers_connection[connid].close();
      peers_connection[connid] = null;
    }
    if (remote_aud_stream[connid]) {
      remote_aud_stream[connid].getTracks().forEach((t) => {
        if (t.stop) t.stop();
      });
      remote_aud_stream[connid] = null;
    }
    if (remote_vid_stream[connid]) {
      remote_vid_stream[connid].getTracks().forEach((t) => {
        if (t.stop) t.stop();
      });
      remote_vid_stream[connid] = null;
    }
  }

  return {
    setNewConnection: async function (connid) {
      await setConnection(connid);
    },
    init: async function (SDP_function, my_connid) {
      await _init(SDP_function, my_connid);
    },
    processClientFunc: async function (data, from_connid) {
      await SDPProcess(data, from_connid);
    },
    closeConnectionCall: async function (connid) {
      await closeConnection(connid);
    },
    setAudio: async function (index) {
      await setAudio(index);
    },
    setVideo: async function (id) {
      await setVideo(id);
    },
    changeOutputDevice: async function (id) {
      await changeOutputDevice(id);
    },
  };
})();

export var Mcu = (function () {
  var socket = null;
  var user_id = "";
  let meeting_id;
  let host;

  function init(uid, mid) {
    user_id = uid;
    meeting_id = mid;
	host = uid;
    console.log("uid: ", uid);
    console.log("mid: ", mid);
    $("#meetingContainer").show();
    $("#me h2").text(user_id + "(Me)");

    event_process_for_signaling_server();
    eventHandling();
  }

  function event_process_for_signaling_server() {
    socket = io.connect();
    console.log(socket);
    var SDP_function = function (data, to_connid) {
      //   console.log("data then message: " , data);
      console.log("to_connid: ", to_connid);
      socket.emit("SDPProcess", {
        message: data,
        to_connid: to_connid,
      });
    };
    socket.on("connect", () => {
      if (socket.connected) {
        console.log("SDP_function: ", SDP_function);
        McuProcess.init(SDP_function, socket.id);
        if (user_id != "" && meeting_id != "") {
          socket.emit("userconnect", {
            displayName: user_id,
            meetingid: meeting_id,
          });
        }
      }
    });

    socket.on("inform_other_about_kicked_user", function (data) {
      console.log("inform in client side kick");
      $("#" + data.connId).remove();
      $(".participant-count").text(data.uNumber);
      $("#participant_" + data.connId + "").remove();
      McuProcess.closeConnectionCall(data.connId);
    });

    socket.on("inform_other_about_disconnected_user", function (data) {
      console.log("inform in client side disconnect");
      $("#" + data.connId).remove();
      $(".participant-count").text(data.uNumber);
      $("#participant_" + data.connId + "").remove();
      McuProcess.closeConnectionCall(data.connId);
    });

    socket.on("inform_others_about_me", function (data) {
      addUser(data.other_user_id, data.connId, data.userNumber);
      console.log("setNewConnection: ", data.connId);
      McuProcess.setNewConnection(data.connId);
      // console.log("addUser");
    }); //inform others about me
    socket.on("inform_me_about_other_user", function (other_users) {
      var userNumber = other_users.length;
      var userNumb = userNumber + 1;
      console.log("other_users in mcu.js: ", other_users);
      if (other_users) {
        console.log("in if condition");
        for (var i = 0; i < other_users.length; i++) {
          console.log("running in for loop function");
          addUser(
            other_users[i].user_id,
            other_users[i].connectionId,
            userNumb
          );
          McuProcess.setNewConnection(other_users[i].connectionId);
          console.log("setNewConnection");
        }
      }
      console.log("not in condition");
    });
    socket.on("SDPProcess", async function (data) {
      await McuProcess.processClientFunc(data.message, data.from_connid);
    });

    socket.on("showChatMessage", function (data) {
      var time = new Date();
      var lTime = time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      var div = $("<div>").html(
        "<span class='font-weight-bold mr-3' style='color:black'>" +
          "<b>" +
          data.from +
          "&nbsp;" +
          "</b> " +
          "</span>" +
          lTime +
          "</br>" +
          data.message
      );
      $("#messages").append(div);
    });

    socket.on("you_have_been_kicked", function (data) {
	  console.log("host is ", host);
      console.log("you have been kicked: ", data.connId);
      var newUrl = window.location.origin+"/home";
	  window.location.replace(newUrl);
	  toast("You have been kicked!");
    //   console.log(window.location.origin);
    //   console.log(window.location.origin+"/home");
	//   console.log(window.location.host);
    });
  }

  function eventHandling() {
    $("#btnsend").on("click", function () {
      var msgData = $("#msgbox").val();
      //   if(!msgData?.trim()){
      // 	//str is null, undefined, or contains only spaces
      // 	//do nothing
      // 	console.log("inside trim");
      //  }
      if (msgData?.trim()) {
        socket.emit("sendMessage", msgData);
        var time = new Date();
        var lTime = time.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        var div = $("<div>").html(
          "<span class='d-flex justify-content-end' style='color:black;'>" +
            "<b>" +
            user_id +
            "&nbsp;" +
            "</b>" +
            lTime +
            "</span>" +
            "<div class='d-flex justify-content-end' style='color:grey;'>" +
            msgData +
            "</div>"

          // +
          // msgData
        );
        $("#messages").append(div);
        $("#msgbox").val("");
      } else {
        $("#msgbox").val("");
      }
    });

    var url = window.location.href;
    $(".meeting_url").text(url);

    $("#divUsers").on("dblclick", "video", function () {
      console.log("Double Click");
      this.requestFullscreen();
    });

    $(document).on("click", ".participant-action-dot", function (e) {
      console.log("userId: ", user_id);
      // console.log("test");
      var currentAnchor = $(this);
      console.log("currentAnchor.text: ", currentAnchor.text());
      var disUser = $(this).parent().parent()[0].id;
      //   var disUser1 = $(this).parent();
      //   var disUser2 = disUser1.parent()[0].id;
      var disUserConnectionId = disUser.slice(12);

      console.log(disUser);
      //   console.log(disUser1);
      //   console.log(disUser2);
      console.log(disUserConnectionId);

      // disconnectUser(disUser);
      socket.emit("kick", disUserConnectionId);
      // console.log(io.Socket.sockets.get(socket.id))
      // io.sockets.sockets.forEach((socket) => {
      // 	// If given socket id is exist in list of all sockets, kill it
      // 	if(socket.id === disUser)
      // 		socket.disconnect(true);
      // });
      // socket.disconnect(true);
      // disconnectUser(disUser);
      // var $panel = $('#panel' + $(this).data('panel'));
      // console.log($panel);
      // $("[title*='" + currentAnchor.text() + "']").collapse('show');
      // $('#collapseTwo').collapse('hide');
    });
  }

  function addUser(other_user_id, connId, userNum) {
    console.log("addUser");
    var newDivId = $("#otherTemplate").clone();
    newDivId = newDivId.attr("id", connId).addClass("other");
    newDivId.find("h2").text(other_user_id);
    newDivId.find("video").attr("id", "v_" + connId); //<video id="v_sjdfhlsdfkksd"></video>
    newDivId.find("audio").attr("id", "a_" + connId);
    newDivId.show();
    $("#divUsers").append(newDivId);
    $(".in-call-wrap-up").append(
      '<div class="in-call-wrap d-flex justify-content-between align-items-center mb-3" id="participant_' +
        connId +
        `"> <div class="participant-img-name-wrap display-center cursor-pointer"> <div class="participant-img"> <img src=${otherJPG} alt="" class="border border-secondary" style="height: 40px;width: 40px;border-radius: 50%;"> </div> <div class="participant-name ms-2" style="color:black;"> ` +
        other_user_id +
        '</div> </div> <div class="participant-action-wrap display-center" style="color:black;"> <div class="participant-action-dot display-center me-2 cursor-pointer" style="color:black;"> ' +
        '<span class="material-icons" style="color:black;"> highlight_off </span> </div> </div> </div>'
      // ' <div class="participant-action-pin display-center me-2 cursor-pointer" style="color:black;"> <span class="material-icons"> push_pin </span> </div>' +
    );
    $(".participant-count").text(userNum);
    console.log("connId: ", connId);
    console.log("other_user_id: ", other_user_id);
  }
  function getIDs() {
    var id,
      divs = document.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
      id = divs[i].id; //  .id is a method
      if (i == 13 || i == 14 || i == 15) {
        console.log(id);
      }
    }
  }

  $(document).on("click", ".people-heading", function () {
    $(".in-call-wrap-up").show(300);
    $(".chat-show-wrap").hide(300);
    $(this).addClass("active");
    $(".chat-heading").removeClass("active");
  });
  $(document).on("click", ".chat-heading", function () {
    $(".in-call-wrap-up").hide(300);
    $(".chat-show-wrap").show(300);
    $(this).addClass("active");
    $(".people-heading").removeClass("active");
  });
  $(document).on("click", ".meeting-heading-cross", function () {
    $(".g-right-details-wrap").hide(300);
  });
  $(document).on("click", ".top-left-participant-wrap", function () {
    $(".people-heading").addClass("active");
    $(".chat-heading").removeClass("active");
    $(".g-right-details-wrap").show(300);
    $(".in-call-wrap-up").show(300);
    $(".chat-show-wrap").hide(300);
  });
  $(document).on("click", ".top-left-chat-wrap", function () {
    $(".people-heading").removeClass("active");
    $(".chat-heading").addClass("active");
    $(".g-right-details-wrap").show(300);
    $(".in-call-wrap-up").hide(300);
    $(".chat-show-wrap").show(300);
  });
  $(document).on("click", ".end-call-wrap", function () {
    $(".top-box-show")
      .css({
        display: "block",
      })
      .html(
        '<div class="top-box align-vertical-middle profile-dialogue-show"> <h3 class="mt-3" style="text-align:center;color:white;font-size: 2vw ">Leave Meeting</h3> ' +
          '<hr> <div class="call-leave-cancel-action d-flex justify-content-center align-items-center w-100">' +
          '<button class="call-leave-action btn btn-danger mt-4 me-5 w-25 " onClick=location.href="/home" style="font-size: 1.5vw" }>Leave</button> ' +
          '<button class="call-cancel-action btn btn-secondary mt-4 w-25 " style="font-size: 1.5vw">Cancel</button> </div> </div>'
        // '<div class="top-box align-vertical-middle profile-dialogue-show"> <h3 class="mt-3" style="text-align:center;color:white;">Leave Meeting</h3> <hr> <div class="call-leave-cancel-action d-flex justify-content-center align-items-center w-100"> <a href="/home"><button class="call-leave-action btn btn-danger me-5">Leave</button></a> <button class="call-cancel-action btn btn-secondary">Cancel</button> </div> </div>'
      );
  });
  $(document).mouseup(function (e) {
    var container = new Array();
    container.push($(".top-box-show"));
    $.each(container, function (key, value) {
      if (!$(value).is(e.target) && $(value).has(e.target).length == 0) {
        $(value).empty();
      }
    });
  });
  $(document).mouseup(function (e) {
    var container = new Array();
    container.push($(".g-details"));
    container.push($(".g-right-details-wrap"));
    $.each(container, function (key, value) {
      if (!$(value).is(e.target) && $(value).has(e.target).length == 0) {
        $(value).hide(300);
      }
    });
  });
  $(document).on("click", ".call-cancel-action", function () {
    $(".top-box-show").html("");
  });

  $(document).on("click", ".copy_info", function () {
    console.log($(".meeting_url").text());
    var roomlink = $(".meeting_url").text();
    navigator.clipboard.writeText(roomlink);
    $(".link-conf").show();
    setTimeout(function () {
      $(".link-conf").hide();
    }, 3000);
  });

  $(document).on("click", ".meeting-details-button", function () {
    $(".g-details").toggle();
  });

  $(document).on("click", ".option-wrap", function () {
    console.log("option-wrap");
    $(".a-v-details").toggle();
  });

  //   $(document).on("click", "#setChanges", function () {
  //     // console.log($("#videoSource").find(":selected").val());
  // 	// console.log($("#videoSource").find(":selected").val());
  // 	var videoSourceIndex = $("#videoSource").find(":selected").val();
  // 	var audioSourceIndex = $("#audioSource").find(":selected").val();
  // 	var audioOutputIndex = $("#audioOutput").find(":selected").val();

  // 	McuProcess.setVideo(videoSourceIndex);
  // 	McuProcess.setAudio(audioSourceIndex);
  // 	McuProcess.changeOutputDevice(audioOutputIndex);

  //     console.log("setChanges");
  //   });

  $(document).on("change", "select#audioSource", function () {
    var audioSourceIndex = $("#audioSource").find(":selected").val();
    McuProcess.setAudio(audioSourceIndex);

    console.log("audioSource");
  });
  $(document).on("change", "select#audioOutput", function () {
    var audioOutputIndex = $("#audioOutput").find(":selected").val();
    McuProcess.changeOutputDevice(audioOutputIndex);
    console.log("audioOutput");
  });
  $(document).on("change", "select#videoSource", function () {
    var videoSourceIndex = $("#videoSource").find(":selected").val();
    McuProcess.setVideo(videoSourceIndex);

    console.log("videoSource");
  });

  return {
    _init: function (uid, mid) {
      init(uid, mid);
    },
  };
})();
