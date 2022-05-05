import styled, { keyframes } from "styled-components";
import {Content,LS} from "../../components/HomeSection/HomeSection1";
import "./Safety.css";

import SecurityPic from "../../img/SafeSVG.svg";

const beat = keyframes`
    0% { transform: scale(1.04)  }
    50% { transform: scale(1.0) }
    100% { transform: scale(1.04) }
`;

const SafeSection = styled.section`
    width: 100%;
    height: 43vw;
    background-color: #86FFCC;
    display: flex;
    justify-content: center;
    position: relative;
    @media only Screen and (max-width: 48em) {
        height: 70vw;
        display: block;
    }
    @media only Screen and (max-width: 420px) {
        height: auto;
        padding-bottom: 2rem;
}
`
const SafeSVG = styled.img`
    max-width: 100%;
    width: calc(20% + 25vw);
    height: auto;
    z-index: 5;
    animation: ${beat} 3s ease infinite;
    margin-right: 2vw;
    @media only Screen and (max-width: 48em){
        align-self: flex-start;
        position: absolute;
        bottom: 0;
        width: calc(30% + 20vw);
        opacity: 0.4;
    }
    @media only Screen and (max-width: 40em){
        display: none;
    }
`

const MainTopic = styled.span`
    display: flex;
    margin-top: -4vw;
    margin-bottom: -2vw;
    align-items: center;
    justify-content: center;
    background-color: var(--nav);
    color: var(--white);
    font-weight: 700;
    font-size: calc(3rem + 2vw);
    padding: 4rem 1rem;
`;

const SubText = styled.h5`
    align-items: center;
    justify-content: center;
    font-family: 'Open Sans', sans-serif;   
    font-size: calc(1rem + .8vw);
    color: var(--nav2);
    margin-top: 1vw;
`;



const SSection = () => {
    return(
        <SafeSection>
            <Content id="security">
                <SafeSVG src={SecurityPic} alt="" width="500" height="500"/>
                <LS id="leftBlock">
                    <MainTopic>
                        SOCIALITE SAFETY
                    </MainTopic>
                    <SubText>
                        Socialite ensure a safe space for people to communicate with each other. 
                        We will not reveal users' personal information to public, and outsider that 
                        doesn't have the passwords to the meeting room will not be able to join the room.
                    </SubText>
                    <SubText>
                        Socialite is a social audio application that will give the users liberty to share
                        anything that the desire. Conversations that are being held in the room will based on
                        the tags or name of the room.
                    </SubText>
                </LS>
                
            </Content>
        
        </SafeSection>
    );
};

export default SSection;

// const Circles = styled.div`
//     width: 100%;
//     position: absolute;
//     right: 0;
//     @media only Screen and (max-width: 48em){
//         opacity: 0.5;
//     }
// `
// const Yellow = styled.div`
//     width: calc(10% + 10w);
//     position: absolute;
//     right: 0;
//     top: 0;
//     z-index: 6;
// ` 
// const Pink = styled.div`
//     width: calc(15% + 10w);
//     position: absolute;
//     right: calc(100rem + 4vw);
//     top: calc(50rem + 2vw);
//     z-index: 5;
// ` 
// const Blue = styled.div`
//     width: calc(20% + 10w);
//     position: absolute;
//     right: calc(10rem + 4vw);
// ` 

{/* <Circles>
                <Yellow>
                    <img src={yellow} alt=""/>
                </Yellow>
                <Pink>
                    <img src={pink} alt=""/> {" "}
                </Pink>
                <Blue>
                    <img src={blue} alt="" />
                </Blue>
            </Circles> */}