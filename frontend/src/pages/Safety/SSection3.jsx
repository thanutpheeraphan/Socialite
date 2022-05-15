import styled from "styled-components";
import mind from "../../img/mind.svg";

export const SafeSection = styled.section`
  width: 100%;
  height: 40vw;
  background-color: aliceblue;
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

export const DesContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 7vw;
  width: 80vw;
  @media only Screen and (max-width: 48em) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }
`;

const Img = styled.img`
  margin-top: 1vw;
  margin-left: 2vw;
  width: 6vw;
  height: auto;
  @media only Screen and (max-width: 48em) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: black;
  font-weight: bold;
  font-size: calc(7rem + 1vw);
  margin-bottom: 2vw;
  @media only Screen and (max-width: 48em) {
    font-size: calc(5rem + 0.2vw);
    padding: 0vw;
  }
`;

const Desc = styled.div`
  font-family: "Open Sans", sans-serif;
  color: black;
  font-size: 1.8vw;
  font-weight: 400;
  padding: 1vw;
  @media only Screen and (max-width: 48em) {
    font-size: calc(1.3rem + 0.2vw);
    padding: 0vw;
    margin-right: 15vw;
  }
`;

const SSection3 = () => {
  return (
    <SafeSection>
      <DesContent id="security">
        <Header>
          KEEP IN MIND <Img src={mind} alt="" />
        </Header>
        <Desc>
          Users are responsible for their own actions including things that they
          are sharing during the meeting. Socialite will not be responsible for
          any personal information that the users show by themselves.
        </Desc>
        <Desc>
          We will not expose any of your own information, so please refrain from
          sharing your own personal information to other unacquainted
          participants.
        </Desc>
      </DesContent>
    </SafeSection>
  );
};

export default SSection3;

//Users are responsible for their own actions including things that they are sharing during the meeting
//please be noted that anything you said or show can be acknowledge by other participant in the room
//Socialite will not be responsibled for any personal information that the users show by themselves.
