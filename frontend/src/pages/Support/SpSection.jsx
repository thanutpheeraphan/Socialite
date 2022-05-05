import styled from "styled-components";

import prop1 from "../../img/prop1.svg";
import prop2 from "../../img/prop2.svg";
// import prop3 from "../../img/prop3.svg";

const Container = styled.div`
    width: 100%;
    height: 12vw;
    display: flex;
    justify-content: center;
    position: relative;
    background: #69E48E;
    @media only Screen and (max-width: 420px) {
        height: auto;
        padding-bottom: 2rem;
    }
`;
const Header = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4vw;
    font-weight: 600;
    color: #35353F;
    display: flex;
    z-index: 1;
`;

const Props = styled.div`
    width: 100%;
    position: absolute;
    right: 0;
    @media only Screen and (max-width: 48em){
        opacity: 0.8;
    }
`;
const Robot = styled.div`
    position: absolute;
    right: 80vw;
    top: 1vw;
`;
const Rocket = styled.div`
    
    position: absolute;
    left: 80vw;
    top: -1vw;
`

const SpSection = () =>{
    return(
        <Container>
            <Props>
                <Robot>
                    <img src={prop1} width="250px" alt=""/>
                </Robot> 
                <Rocket>
                    <img src={prop2} width="200px" alt=""/>
                </Rocket>
            </Props>
            <Header>Support</Header>
        </Container>
    )
}
export default SpSection;