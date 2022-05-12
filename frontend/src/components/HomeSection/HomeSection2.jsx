import styled, { keyframes } from "styled-components";
import mock from "../../img/Mock.svg";
import search from "../../img/search.svg";
import comm from "../../img/Comm.svg";
import ppl from "../../img/ppl.svg";

import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";

const move = keyframes`
    0% { transform: translateY(-20px) scale(1.075)}
	50% { transform: translateY(10px) }
    100% {transform: translateY(-20px) scale(1.075)}
`;

const SVG = styled.img`
	max-width: 100%;
	width: calc(40% + 30vw);
	height: auto;
	z-index: 1;
    margin-left: -9vw;
	margin-bottom: 5vw;

    animation: ${move} 4s ease infinite;
	@media only Screen and (max-width: 48em) {
		align-self: flex-start;
		position: absolute;
		bottom: 0;
		width: calc(30% + 20vw);
		opacity: 0.5;
	}
	@media only Screen and (max-width: 40em) {
		display: none;
	}

`;

export const SmallImg = styled.img`
	width: 40px;
	height: auto;
`;

const Basesection = styled.section`
	width: 98.9vw;
	height: 60vw;
	background: aliceblue;
	display: flex;
	justify-content: center;
	position: relative;
	@media only Screen and (max-width: 48em) {
		height: 200vw;
		display: block;
	}
	@media only Screen and (max-width: 420px) {
		display:none;
		
	}
`;

export const HContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50%;
	@media only Screen and (max-width: 48em) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
	}
` ;
export const Block = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 150%;
	line-height: 1;
	margin-bottom: 150px;
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
const Title = styled.h1`
	font-family: 'Open Sans', sans-serif;
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
		font-size: calc(1rem + 0.75vw);
	}
`;

const HomeSection2 = () =>{
    return(
        <ScrollContainer>
            <ScrollPage page={1}>
                
                <Basesection id = "section2">
                    <HContent id = "section2">
                        <Animator animation={MoveIn(-500, 0)}>
                            <SVG src={mock} alt="" width="500" height="500" class="reveal"></SVG>
                        </Animator>
                        <Animator animation={MoveIn(500, 0)}>
                            <Block id = "Block">
								
                                <Title>Create & Join <SmallImg src ={ppl} alt="" /></Title>
                                <SubText>Socialite allows you to join any room that are available or you can even create one by yourself!</SubText>
                                <Title>Listen,Talk & Share <SmallImg src ={comm} alt="" /></Title>
                                <SubText>Join the room to Listen to other people, and talk with them or even share your screens. </SubText>
                                <Title>Search Room <SmallImg src ={search} alt=""/></Title>
                                <SubText>You can search for the room that you are interested in by searching for their tags or name on the search bar.</SubText>
             
                            </Block> 
                        </Animator>  
                    </HContent>
                </Basesection>
            </ScrollPage>
        </ScrollContainer>
    )
}

export default HomeSection2;