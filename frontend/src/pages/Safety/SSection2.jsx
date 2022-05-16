import styled from "styled-components";
import chain from "../../img/chain.svg";

const SafeSection2 = styled.section`
  width: 100%;
  height: 53vw;
  background: linear-gradient(#86ffcc, aliceblue);
  display: flex;
  position: static;
  @media only Screen and (max-width: 48em) {
    height: 70vw;
    display: block;
  }
  @media only Screen and (max-width: 420px) {
    height: auto;
    padding-bottom: 2rem;
  }
`;

const SeContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-left: 7vw;
  width: 80vw;
  @media only Screen and (max-width: 48em) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }
`;

const MainTopic = styled.span`
  display: flex;
  margin-top: 4vw;
  margin-bottom: 1vw;
  align-items: center;
  justify-content: center;
  background-color: var(--nav);
  color: black;
  font-weight: bolder;
  font-size: 4.5vw;
  padding: 4rem 1rem;
`;

const SubText = styled.h5`
  align-items: center;
  justify-content: center;
  font-family: "Open Sans", sans-serif;
  font-size: 1.8vw;
  margin-bottom: 1.2vw;
  color: var(--nav2);
  margin-top: 1vw;
`;

const Img = styled.img`
  margin-top: 1vw;
  margin-left: 2vw;
  width: 53vw;
  height: auto;
  @media only Screen and (max-width: 48em) {
    display: none;
  }
`;

const SSection2 = () => {
  return (
    <SafeSection2>
      <SeContent>
        <MainTopic>SOCIALITE SAFETY</MainTopic>
        <SubText>
          Socialite ensure a safe space for people to communicate with each
          other. We will not reveal users' personal information to public, and
          outsider that doesn't have the passwords to the meeting room will not
          be able to join the room.
        </SubText>
        <SubText>
          Socialite is a social audio application that will give the users
          liberty to share anything that they desire. Conversations that are
          being held in the room will be based on the tags or name of the room.
        </SubText>
        <Img src={chain} alt="" />
      </SeContent>
    </SafeSection2>
  );
};
export default SSection2;
