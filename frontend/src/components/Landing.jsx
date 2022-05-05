import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";

import HomeSection1 from './HomeSection/HomeSection1';
import HomeSection2 from "./HomeSection/HomeSection2";
import HomeSection3 from './HomeSection/HomeSection3';
import Footer from "./Footer";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;


const Homepage = ({ setAuth }) => {
  return (
	<Container>	
		<HomeSection1/>
		<HomeSection2/>
		<HomeSection3/>
		<Footer/>
	</Container>
  );
};

export default Homepage;

