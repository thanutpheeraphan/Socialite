import { useEffect, useState } from "react";
import styled from "styled-components";

const Feature = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 10vw;
`;
const Item = styled.div`
  flex: 1;
  margin: 1vw 1vw;
  padding: 1.3vw;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 0px 20px -10px #35353f;
  background: aliceblue;
`;
const Title = styled.div`
  font-size: calc(1rem + 0.75vw);
`;
const Contain = styled.div`
  margin-top: 0.5vw;
  display: flex;
  align-items: center;
`;
const Number = styled.div`
  font-size: 2vw;
  font-weight: 500;
`;
const Sub = styled.div`
  font-size: calc(1rem + 0.4vw);
  color: grey;
`;

const DSection = () => {
  const [room_count, setRoomCount] = useState(0);
  const [user_count, setUserCount] = useState(0);
  const getRoomCount = async (e) => {
    // e.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/rooms/getrooms",
        {
          method: "GET",
        }
      );

      const parseResponse = await response.json();

      setRoomCount(parseResponse.length);
      //   console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };
  const getUserCount = async (e) => {
    // e.preventDefault();
    try {
      const response = await fetch(
        //   "http://localhost:5000/dashboard/getusers",
        process.env.REACT_APP_API_URL + "/dashboard/getusers",
        {
          method: "GET",
        }
      );

      const parseResponse = await response.json();
      console.log(parseResponse["count"]);
      setUserCount(parseResponse["count"]);
      //   console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getRoomCount();
    getUserCount();
  }, []);

  return (
    <Feature>
      {/* Item Boxex */}
      <Item>
        <Title>Registered Users</Title>
        <Contain>
          <Number>{user_count}</Number>
        </Contain>
        {/* <Sub>{user_count}</Sub> */}
      </Item>
      <Item>
        <Title>Online Rooms</Title>
        <Contain>
          <Number>{room_count}</Number>
        </Contain>
        {/* <Sub>{room_count}</Sub> */}
      </Item>
    </Feature>
  );
};
export default DSection;
