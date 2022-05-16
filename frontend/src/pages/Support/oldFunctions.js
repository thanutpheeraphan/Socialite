//   const createRoomFunc = () => {
//     var eight_digit_value = Math.floor(Math.random() * 100000000);
//     props.history.push({ pathname: `/room/?roomID=${eight_digit_value}` });
//   };
//   const joinRoomFunc = () => {
//     var room_id = window.prompt("Enter the room ID");
//     // props.history.push({ pathname: `/room/?roomID=${room_id}` });
//     props.history.push({
//       pathname: `/room/?roomID=${room_id}`,
//       state: { name },
//     });
//   };

const joinRoom = (roomInfo) => {
	try {
		const body = {
			room_link
		  };

        const response = await fetch("http://localhost:5000/rooms/userjoined", {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        });
	} catch (error) {
		
	}


  
  };