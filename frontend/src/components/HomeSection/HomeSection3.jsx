import styled, { keyframes } from "styled-components";
import b1 from "../../img/b1.svg";
import b2 from "../../img/b3.svg";

import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";

const move = keyframes`
    0% { transform: rotate(10deg)}
	50% { transform: rotate(0deg)}
    100% {transform: rotate(10deg)}
`;

const Basesection = styled.section`
	width: 98.9vw;
	height: 35vw;
	background: linear-gradient(#69e48e,#33d1b7);
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

const Banner = styled.img`
	max-width: 100%;
	width: calc(5% + 20vw);
	height: auto;
	margin-left: 10vw;
	margin-right: 8vw;
	z-index: 7;
	animation: ${move} 3s ease infinite;
	@media only Screen and (max-width: 48em) {
		// align-self: flex-start;
		// position: absolute;
		// bottom: 0;
		// width: calc(30% + 20vw);
		// opacity: 0.5;
		display: none;
	}
	@media only Screen and (max-width: 40em) {
		display: none;
	}
`;

const Banner2 = styled.img`
	max-width: 100%;
	width: calc(20% + 30vw);
	height: auto;
	z-index: 7;
	margin-right: 100px;
	animation: ${move} 3s ease infinite;
	@media only Screen and (max-width: 48em) {
		// align-self: flex-start;
		// position: absolute;
		// bottom: 0;
		// width: calc(30% + 20vw);
		// opacity: 0.5;
		display: none;
	}
	@media only Screen and (max-width: 40em) {
		display: none;
	}
`;

const HomeSection3 = () => {
    return(
			<Basesection>
				<Banner src={b1} />	
				<Banner2 src={b2}/>
			</Basesection>
    );
};

export default HomeSection3;
