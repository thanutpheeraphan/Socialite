const express = require ("express");
const path = require("path");
const cors = require('cors');
var app = express();


// const io = require("socket.io")(server,{
// 	allowEIO3: true
// });

// io.on("connection", (socket)=>{
// 	console.log("socket id is ", socket.id)
// });
app.use(cors())
app.use(express.static(path.join(__dirname,'build')));
app.get('/*', function(req,res){
	res.sendFile(path.join(__dirname,'build','index.html'));
})

var server = app.listen(3000,function(){
	console.log("listening on port 3000");
});
