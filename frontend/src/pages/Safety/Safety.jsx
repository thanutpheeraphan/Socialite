import React ,{ Fragment, useState, useEffect } from "react";
import './Safety.css';
import styled from "styled-components";
import SSection from './SSection';
import SSection2 from './SSection2';

const Container = styled.div`
    font-family: 'Open Sans', sans-serif;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Safety = () => {
    return(
        <Container>
            <SSection/>
            <SSection2/>
        </Container>
    );
};

export default Safety;