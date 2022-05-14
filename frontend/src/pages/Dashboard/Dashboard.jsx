import styled from "styled-components";
import DSection from "./DSection";
import DSection2 from "./DSection2";
import {userData} from "./Mock";


const Container = styled.div`
    font-family: 'Open Sans', sans-serif;
    flex: 4;
    height: 70vw;
    @media only Screen and (max-width: 48em){
        height: 60;
    }
    // background: #86FFCC;
    background-color: #86FFCC;
`;

const Dashboard2 = ({setAuth}) => {
    return(
        
        <Container>
            <DSection/>
            <DSection2 data={userData} title="Users" grid dataKey="Active User"/>
        </Container>
    );
};

export default Dashboard2;