import styled from "styled-components";
import DSection from "./DSection";
import DSection2 from "./DSection2";
import { userData } from "./Mock";
import { useState, useEffect } from "react";

const Container = styled.div`
  font-family: "Open Sans", sans-serif;
  flex: 4;
  height: 100%;
  @media only Screen and (max-width: 48em) {
    height: 60;
  }
  // background: #86FFCC;
  background-color: #86ffcc;
`;

const Dashboard2 = ({ setAuth }) => {
  const [data_count, setDataCount] = useState(0);
  const getDataCount = async (e) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/rooms/getrooms",
        {
          method: "GET",
        }
      );
      const parseResponse = await response.json();
      setDataCount(parseResponse);
      console.log(parseResponse);
      // console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getDataCount();
  }, []);

  console.log(data_count);

  return (
    <Container>
      <DSection />
      <DSection2
        data={data_count}
        title="Members in rooms"
        grid
        dataKey="room_member"
      />
    </Container>
  );
};

export default Dashboard2;
