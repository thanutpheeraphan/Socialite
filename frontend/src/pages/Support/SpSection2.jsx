import { useEffect, useRef } from "react";
import styled, {keyframes}from "styled-components";
import "./SpSection2.css";

import mockRegis from "../../img/MockRegis.svg";
import mockHome from "../../img/MockHome.svg";
import mockRoom from "../../img/MockRoom.svg";
import mockCreate from "../../img/MockCreate.svg";

import {HContent} from "../../components/HomeSection/HomeSection2"

import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn, FadeOut } from "react-scroll-motion";

const move = keyframes`
    0% {transform: scale(1.05)}
    50% {transform: scale(1)}
    100% {transform: scale(1.05)}
`

const SupportSection = styled.section`
    width:100%;
    // background: aliceblue;
    // height: 45vw;
    display: flex;
    justify-content: center;
    position:relative;
    @media only Screen and (max-width: 48em) {
		height: 200vw;
		display: block;
	}
	@media only Screen and (max-width: 420px) {
		display:none;
	}
`
const SuPic = styled.img`
    max-width: 100%;
    width: calc(30% +25vw);
    height: auto;
    z-index: 5;

    animation: ${move} 5s ease infinite;
    @media only Screen and (max-width: 48em) {
        align-self: flex-start;
        position: absolute;
        bottom: 0;
        width: calc(25% + 15vw);
        opacity: 0.5;
    }
    @media only Screen and (max-width: 40em) {
        display: none;
    }
`

const Title = styled.h1`
	font-size: calc(1.3rem + 0.75vw);
    font-weight: bold;
	line-height: 1.5;
	padding: 1rem 1;
    margin-top: 50px;
    color: black;

    @media only Screen and (max-width: 48em) {
		font-size: calc(1rem + 0.75vw);
	}
`;

const SubText = styled.h5`
	font-family: 'Open Sans', sans-serif;
	font-size: calc(1.5rem + 0.5vw);
	color: var(--nav2);
    padding: 1rem 1;

    @media only Screen and (max-width: 48em) {
		font-size: calc(1rem + 1vw);
	}
`;

export const SpBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 150%;
	line-height: 1;
	color: var(--white);
	position: relative;
	z-index: 15;
	@media only Screen and (max-width: 48em) {
		width: 80%;
		text-align: center;
		align-items: center;
		justify-content: space-around;
		margin-top: calc(2.5rem + 2.5vw);
		filter: drop-shadow(2px 4px 6px black);
	}
	@media only Screen and (max-width: 40em) {
		filter: none;
	}
`;

const SpSection2= () =>{
    return(
        <ScrollContainer>
            <ScrollPage page={0}>
                
            <SupportSection id="supsection2" >
                
                    <HContent>
                        <Animator animation={batch(Fade(), Sticky(), MoveOut(1000, 0))}>
                            <SuPic src={mockRegis} className="first_img"></SuPic>
                        </Animator>
                        <Animator animation={batch(Fade(), Sticky(), MoveOut(-1000, 0))}>
                        <SpBlock id = "Block" className="first_block">	
                            <Title>Create your own account</Title>
                            <SubText>In order to create or join any room,</SubText>
                            <SubText>The user need to create their own account first.</SubText>
                            <SubText>The user can register their own account by "Sign Up".</SubText> 
                            <SubText>After the user login to their accounts,</SubText>
                            <SubText>Socialite will show the list of rooms available for them.</SubText>
                            
                        </SpBlock>
                        </Animator>
                    </HContent>
                    
            </SupportSection>
            </ScrollPage>
            
            <ScrollPage page={1}>
                <SupportSection id = "supsection2" className="alt_bg">
                    <Animator animation={MoveIn(0,-1000)}>
                        <SpBlock id = "Block" className="sec_block">	
                            <Title>Create Room</Title>
                            <SubText>Every users are able to create their own room by pressing </SubText>
                            <SubText>"Create Room" button. User will need to enter the </SubText>
                            <SubText>room's name and tags to distinguish the room with other rooms.</SubText>
                            <SubText>The user that create the room will become the host of the room.</SubText>
                            <SubText>Other users will see that room in the home page.</SubText>
                        </SpBlock> 
                    </Animator>
                    <Animator animation={MoveIn(0,1000)}>
                        <SuPic src={mockCreate} className="sec_img"></SuPic>
                    </Animator>
                </SupportSection>
            </ScrollPage>

            <ScrollPage page={2}>
                <SupportSection id = "supsection2">
                        <Animator animation={MoveIn(-1000,0)}>
                            <SuPic src={mockRoom} className="thr_img"></SuPic>
                        </Animator>
                        <Animator animation={MoveIn(1000,0)}>
                            <SpBlock id = "Block" className="thr_block" >	
                                <Title>Sharing with other people</Title>
                                <SubText>You can communicate with other participant in the room</SubText>
                                <SubText>using your own microphone. You are free to share Your thoughts</SubText>
                                <SubText>or even better with Your screens. Users are free to turn on</SubText>
                                <SubText>their cameras, and mute their microphone.</SubText>
                                <SubText>All of these functions can be used by pressing the</SubText>
                                <SubText>appropriate buttons for each functions</SubText>
                            </SpBlock> 
                        </Animator>
                </SupportSection>
            </ScrollPage>

            <ScrollPage page= {3}>
            <SupportSection id = "supsection2" className="alt_bg">
                    <Animator animation={MoveIn(0,1000)}>
                        <SuPic src={mockHome} className="fth_img"></SuPic>
                    </Animator>
                    <Animator animation={MoveIn(0,-1000)}>
                        <SpBlock id = "Block" className="fth_block">	
                            <Title>Search & Join</Title>
                            <SubText>If there is no room that you are interested in at all,</SubText>
                            <SubText>You can search for a room by using the search bar!</SubText>
                            <SubText>Users can search for a room by the name or tags of the room.</SubText>
                            <SubText>The room will show up accordingly to the user's search input.</SubText>
                        </SpBlock>
                    </Animator>
                </SupportSection>
            </ScrollPage>
        </ScrollContainer>
    )
}
export default SpSection2;
