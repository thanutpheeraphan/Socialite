import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
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
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#322ad4" />
            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
            <Tooltip />
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </LineChart>
        </ResponsiveContainer>
      </Chart>
    </Container>
  );
}
