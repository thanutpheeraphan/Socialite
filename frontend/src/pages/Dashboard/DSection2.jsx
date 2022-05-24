import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const Container = styled.div`
  background-color: #86ffcc;
  height: 35vw;
`;
const Chart = styled.div`
  background: aliceblue;
  margin: 20px;
  padding: 20px;
  box-shadow: 0px 0px 20px -10px #114c60;
  height: 30vw;
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

export default function DSection2({ title, data, dataKey, grid }) {
  return (
    <Container>
      <Chart>
        <Title>{title}</Title>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <BarChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* <XAxis dataKey="name" stroke="#322ad4" /> */}
            <XAxis dataKey="room_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Line type="monotone" dataKey={dataKey} stroke="#5550bd" /> */}
            {/* <Tooltip /> */}
            {/* {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />} */}
            <Bar dataKey={dataKey} fill="#1B9370" />
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </Container>
  );
}
