import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import ShowRoom from "../../img/RoomMock.svg";
import { useNavigate } from "react-router-dom";
import shade from "../../img/shade.svg";

const kframe = keyframes`
0% {transform: translateY(-30px) }
	50% {transform: translateY(-10px) }
	100% {transform: translateY(-30px) }
`;

export const SVG = styled.img`
	max-width: 100%;
	width: calc(30% + 20vw);
	height: auto;
	z-index: 7;
	animation: ${kframe} 2.5s ease infinite;
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

const Basesection = styled.section`
	width: 99.9%;
	height: 45vw;
	// background: radial-gradient(circle at 3% 200%, rgb(51, 209, 183) 40%, rgb(105, 228, 142) 70%);
	background: linear-gradient(#33d1b7, #69e48e);
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

export const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 70vw;
	margin-left: 5vw;
	@media only Screen and (max-width: 48em) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
	}
` ;
export const LS = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 50%;
	line-height: 1.5;
	color: var(--white);
	position: relative;
	z-index: 15;
	margin-right: 5vw; 
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
	font-size: calc(3rem + 1.5vw);
	font-weight: 600;
	line-height: 1.5;
	padding: 1rem 1;
    color: black;
`;

const SubText = styled.h5`
	font-family: 'Open Sans', sans-serif;
	font-size: calc(1.5rem + 0.5vw);
	color: #404147;
    padding: 1rem 1;
`;

const RegButton = styled.button`
	font-family: 'Open Sans', sans-serif;
    // background-color: #69E48E;
    background-color: white;
    border: none;
    // color: white;
    color: black;
    margin-top: 50px;
    padding: 10px 20px;
    text-align: center;
    font-size: calc(2.5rem);
    display: inline-block;
    border-radius: 25px;
    
    &:hover{
        transition: all 0.3s ease 0s;
        transform:scale(1.05);
    }
`;



const HomeSection1 = () =>{
    return(
		
        <Basesection id = "section1">
		<Content id = "section1">
			<LS id = "leftBlock">
			<Title>JOIN, LISTEN, and SPEAK</Title>
			<SubText>Communication with other people in the meeting!</SubText>
			<Link to = "/signup"><RegButton>Sign Up +</RegButton></Link>
			</LS>
            <SVG src={ShowRoom} alt="RoomMock" width="400" height="400"></SVG>
		</Content>
		</Basesection>
    )
}

export default HomeSection1;