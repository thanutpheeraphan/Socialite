import React ,{ Fragment, useState, useEffect } from "react";
import './Safety.css';
import styled from "styled-components";
import SSection from './SSection';
import SSection2 from './SSection2';

const Container = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Safety = ({setAuth}) => {
    return(
        <Container>
            <SSection/>
            <SSection2/>
        </Container>
    );
};

export default Safety;