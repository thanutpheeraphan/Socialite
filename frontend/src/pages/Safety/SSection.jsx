import styled, { keyframes } from "styled-components";
import { Content, LS } from "../../components/HomeSection/HomeSection1";
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
  background: linear-gradient(#4dffb4, #86ffcc);
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
`;
const SafeSVG = styled.img`
  max-width: 100%;
  width: calc(20% + 25vw);
  height: auto;
  z-index: 5;
  animation: ${beat} 3s ease infinite;
  margin-right: 5vw;
  @media only Screen and (max-width: 48em) {
    align-self: flex-start;
    position: absolute;
    bottom: 0;
    width: calc(30% + 20vw);
    opacity: 0.4;
  }
  @media only Screen and (max-width: 40em) {
    display: none;
  }
`;

const SloText = styled.h2`
  align-items: center;
  justfy-content: center;
  font-size: 5vw;
  color: #114c60;
  font-weight: bold;
  font-style: italic;
  margin-left: 0.5vw;
  text-shadow: 2px 2px 2px #114c60, 2px 2px 2px #1b9370, 2px 2px 2px #8bd298,
    2px 2px 2px #c7d9bf;
`;

const SSection = () => {
  return (
    <SafeSection>
      <Content id="security">
        <SafeSVG src={SecurityPic} alt="" width="500" height="500" />
        <LS id="leftBlock">
          <SloText>YOU</SloText>
          <SloText>ARE</SloText>
          <SloText>SAFE</SloText>
          <SloText>WITH</SloText>
          <SloText>US.</SloText>
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

{
  /* <Circles>
                <Yellow>
                    <img src={yellow} alt=""/>
                </Yellow>
                <Pink>
                    <img src={pink} alt=""/> {" "}
                </Pink>
                <Blue>
                    <img src={blue} alt="" />
                </Blue>
            </Circles> */
}
