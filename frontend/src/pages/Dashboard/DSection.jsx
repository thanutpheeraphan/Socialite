import styled from "styled-components";

const Feature = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    
`
const Item = styled.div`
    flex: 1;
    margin: 10px 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0px 0px 20px -10px #35353F;
    background: aliceblue;
`
const Title = styled.div`
    font-size: calc(1rem + .75vw);
`
const Contain = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: center;
`
const Number = styled.div`
    font-size: 30px;
    font-weight: 500;
`
const Sub = styled.div`
    font-size: calc(1rem + .4vw);
    color: grey;
`

const DSection = () => {
    return(
        <Feature>
            {/* Item Boxex */}
            <Item>
                <Title>Users</Title>
                <Contain>
                    <Number>-</Number>
                </Contain>
                <Sub>PlaceHolder</Sub>
            </Item>
            <Item>
                <Title>Rooms</Title>
                <Contain>
                    <Number>-</Number>
                </Contain>
                <Sub>PlaceHolder</Sub>
            </Item>
        </Feature>
    )
}
export default DSection;