const express = require("express");
const path = require("path");
const cors = require("cors");
var favicon = require("serve-favicon");
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const port = process.env.PORT || 3000;
var app = express();
app.use(cors());
var server = app.listen(port, function () {
  console.log("listening on port: ", port);
});
app.use(favicon(__dirname + "/build/favicon.ico"));
// the __dirname is the current directory from where the script is running
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const io = require("socket.io")(server, {
  allowEIO3: true,
});
var userConnections = [];
io.on("connection", (socket) => {
  //   console.log(socket);
  console.log("Connection");
  console.log("socket id is ", socket.id);
  socket.on("userconnect", (data) => {
    console.log("userconnect", data.displayName, data.meetingid);
    var other_users = userConnections.filter(
      (p) => p.meeting_id == data.meetingid
    );
    userConnections.push({
      connectionId: socket.id,
      user_id: data.displayName,
      meeting_id: data.meetingid,
    });

    var userCount = userConnections.length;
    // console.log(userCount);
    console.log(userConnections);
    other_users.forEach((v) => {
      socket.to(v.connectionId).emit("inform_others_about_me", {
        other_user_id: data.displayName,
        connId: socket.id,
        userNumber: userCount,
      });
    });
    socket.emit("inform_me_about_other_user", other_users);
  });

  socket.on("SDPProcess", (data) => {
    socket.to(data.to_connid).emit("SDPProcess", {
      message: data.message,
      from_connid: socket.id,
    });
  });

  socket.on("sendMessage", (msg) => {
    console.log(msg);
    var mUser = userConnections.find((p) => p.connectionId == socket.id);
    if (mUser) {
      var meetingid = mUser.meeting_id;
      var from = mUser.user_id;
      var list = userConnections.filter((p) => p.meeting_id == meetingid);
      list.forEach((v) => {
        socket.to(v.connectionId).emit("showChatMessage", {
          from: from,
          message: msg,
        });
      });
    }
  });

  const leaveRoom = async (link) => {
	let room_link = link;
    const action = "leave";
	axios({
		method: 'put',
		url: process.env.REACT_APP_API_URL + "/rooms/userjoined",
		// timeout: 4000,    // 4 seconds timeout
		data: {
			room_link,
			action,
		}
	  })
	  .then(response => { console.log(response.status)})
	  .catch(error => console.error(error.message))
    // try {
    //   const body = {
    //     room_link,
    //     action,
    //   };
	// //   console.log(process.env.REACT_APP_API_URL);
    //   const response = await fetch(
    //     process.env.REACT_APP_API_URL + "/rooms/userjoined",
    //     {
    //       method: "PUT",
    //       headers: { "Content-type": "application/json" },
    //       body: JSON.stringify(body),
    //     }
    //   );
	//   console.log(response.status);
    // //   if (response.status == 200) {
    // //     props.history.push({
    // //       pathname: `/room/?roomID=${link}`,
    // //       state: { name },
    // //     });
    // //   }
    // } catch (err) {
    //   console.error(err.message);
    // }
  };

  socket.on("disconnect", function () {
    console.log("Disconnected");
    var disUser = userConnections.find((p) => p.connectionId == socket.id);
    if (disUser) {
      var meetingid = disUser.meeting_id;
	  leaveRoom(disUser.meeting_id);
      userConnections = userConnections.filter(
        (p) => p.connectionId != socket.id
      );
      var list = userConnections.filter((p) => p.meeting_id == meetingid);
      list.forEach((v) => {
        var userNumberAffUserLeave = userConnections.length;
        socket.to(v.connectionId).emit("inform_other_about_disconnected_user", {
          connId: socket.id,
          uNumber: userNumberAffUserLeave,
        });
      });
      console.log(userConnections); //need to check each meeting id or find another way
    }
  });
});
