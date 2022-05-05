const io = require("socket.io-client");

export var Mcu = (function(){

	function init(uid,mid){
		event_process_for_signaling_server();
	}
	var socket = null;
	function event_process_for_signaling_server(){
		socket = io.connect();
		socket.on("connect", ()=>{
			alert("socket connected to client side");
		})
	}
	return {
		_init: function(uid,mid){
			init(uid,mid);
		},
	};
})();

