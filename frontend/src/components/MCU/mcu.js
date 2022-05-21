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
  async function _init(SDP_function, my_connid) {
    serverProcess = SDP_function;

    let my_connection_id = my_connid;
    eventProcess();
    local_div = document.getElementById("locaVideoPlayer");
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
        audio.enabled = true;
        $(this).html(
          "<span class='material-icons' style='width:100%;'>mic</span>"
        );
        updateMediaSenders(audio, rtp_aud_senders);
      } else {
        audio.enabled = false;
        $(this).html(
          "<span class='material-icons' style='width:100%;'>mic_off</span>"
        );
        removeMediaSenders(rtp_aud_senders);
        audio.stop();
      }
      isAudioMute = !isAudioMute;
    });
    $("#videoCamOnOff").on("click", async function () {
      if (video_st == video_states.Camera) {
        await videoProcess(video_states.None);
      } else {
        await videoProcess(video_states.Camera);
      }
    });
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
        audio: true,
      });
      audio = astream.getAudioTracks()[0];
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
        "<span class='material-icons' style='width:100%;'>videocam_off</span>"
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
        "<span class='material-icons' style='width:100%;'>videocam_on</span>"
      );
    }
    try {
      var vstream = null;
      if (newVideoState == video_states.Camera) {
        vstream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 1920,
            height: 1080,
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
        videoCamTrack = vstream.getVideoTracks()[0];
        if (videoCamTrack) {
          local_div.srcObject = new MediaStream([videoCamTrack]);
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
        '<span class="material-icons" style="width: 100%;">videocam</span>'
      );
      $("#ScreenShareOnOf").html(
        '<span class="material-icons ">present_to_all</span><div >Present Now</div>'
      );
    } else if (newVideoState == video_states.ScreenShare) {
      $("#videoCamOnOff").html(
        '<span class="material-icons" style="width: 100%;">videocam_off</span>'
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
    var connection = new RTCPeerConnection(iceConfiguration);

    connection.onnegotiationneeded = async function (event) {
      await setOffer(connid);
    };
    connection.onicecandidate = function (event) {
      if (event.candidate) {
        serverProcess(
          JSON.stringify({ icecandidate: event.candidate }),
          connid
        );
      }
    };
    connection.ontrack = function (event) {
      if (!remote_vid_stream[connid]) {
        remote_vid_stream[connid] = new MediaStream();
      }
      if (!remote_aud_stream[connid]) {
        remote_aud_stream[connid] = new MediaStream();
      }

      if (event.track.kind == "video") {
        remote_vid_stream[connid]
          .getVideoTracks()
          .forEach((t) => remote_vid_stream[connid].removeTrack(t));
        remote_vid_stream[connid].addTrack(event.track);
        var remoteVideoPlayer = document.getElementById("v_" + connid);
        remoteVideoPlayer.srcObject = null;
        remoteVideoPlayer.srcObject = remote_vid_stream[connid];
        remoteVideoPlayer.load();
      } else if (event.track.kind == "audio") {
        remote_aud_stream[connid]
          .getAudioTracks()
          .forEach((t) => remote_aud_stream[connid].removeTrack(t));
        remote_aud_stream[connid].addTrack(event.track);
        var remoteAudioPlayer = document.getElementById("a_" + connid);
        remoteAudioPlayer.srcObject = null;
        remoteAudioPlayer.srcObject = remote_aud_stream[connid];
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
    if (message.answer) {
      await peers_connection[from_connid].setRemoteDescription(
        new RTCSessionDescription(message.answer)
      );
    } else if (message.offer) {
      if (!peers_connection[from_connid]) {
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
      if (!peers_connection[from_connid]) {
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
  };
})();

export var Mcu = (function () {
  var socket = null;
  var user_id = "";
  let meeting_id;

  function init(uid, mid) {
    user_id = uid;
    meeting_id = mid;
    $("#meetingContainer").show();
    $("#me h2").text(user_id + "(Me)");

    event_process_for_signaling_server();
    eventHandling();
  }

  function event_process_for_signaling_server() {
    socket = io.connect();
    console.log(socket);
    var SDP_function = function (data, to_connid) {
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

    socket.on("inform_other_about_disconnected_user", function (data) {
      $("#" + data.connId).remove();
      $(".participant-count").text(data.uNumber);
      $("#participant_" + data.connId + "").remove();
      McuProcess.closeConnectionCall(data.connId);
    });

    socket.on("inform_others_about_me", function (data) {
      addUser(data.other_user_id, data.connId, data.userNumber);
      McuProcess.setNewConnection(data.connId);
      // console.log("addUser");
    }); //inform others about me
    socket.on("inform_me_about_other_user", function (other_users) {
      var userNumber = other_users.length;
      var userNumb = userNumber + 1;
      if (other_users) {
        for (var i = 0; i < other_users.length; i++) {
          addUser(
            other_users[i].user_id,
            other_users[i].connectionId,
            userNumb
          );
          McuProcess.setNewConnection(other_users[i].connectionId);
        }
      }
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
  }

  function addUser(other_user_id, connId, userNum) {
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
        '<span class="material-icons" style="color:black;"> more_vert </span> </div>' +
        ' <div class="participant-action-pin display-center me-2 cursor-pointer" style="color:black;"> <span class="material-icons"> push_pin </span> </div> </div> </div>'
    );
    $(".participant-count").text(userNum);
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

  //   $(document).on("change", "select#audioSource", function () {
  //     console.log("audioSource");
  //   });
  //   $(document).on("change", "select#audioOutput", function () {
  //     console.log("audioOutput");
  //   });
  //   $(document).on("change", "select#videoSource", function () {
  //     console.log("videoSource");
  //   });

  return {
    _init: function (uid, mid) {
      init(uid, mid);
    },
  };
})();
