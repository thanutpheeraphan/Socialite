import styled from "styled-components";
import {LineChart,Line,XAxis,CartesianGrid,Tooltip,ResponsiveContainer,} from "recharts";

const Chart = styled.div`
    background: aliceblue;
    margin: 20px;
    padding: 20px;
    box-shadow: 0px 0px 20px -10px #35353F;
    height: 30vw;
`

const Title = styled.h3`
    margin-bottom: 20px;
`

export default function DSection2 ({title,data,dataKey,grid}){
    return(
        <Chart>
            <Title>{title}</Title>
            <ResponsiveContainer width="100%" aspect={4/1}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#322ad4" />
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip/>
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray = "5 5" />}
                </LineChart>
            </ResponsiveContainer>
        </Chart>
    )
}
