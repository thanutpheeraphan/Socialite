import styled from "styled-components";
import SpSection from "./SpSection";
import SpSection2 from "./SpSection2";

const Container = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background: linear-gradient(#69E48E,#86FFCC);
    background: aliceblue;
`;

const Support = ({setAuth}) => {
    return(
        <Container>
            <SpSection/>
            <SpSection2/>
        </Container>
    );
};

export default Support;