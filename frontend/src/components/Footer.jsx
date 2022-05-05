import styled from "styled-components";

const Foot = styled.footer`
    
    padding: 1vw;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media only Screen and (max-width: 48em){
        flex-direction: column;
        align-items: center;
        div{
            &:first-child{
                margin-bottom: 1rem;
            }
        }
    }
`;

const LT = styled.div`
    text-align: left;
    margin-right: 50vw;
`;

const RT = styled.div`
    display: flex;
`;

const Footer = () => {
    return(
        <Foot>
            <LT>
                © Built and Design in 2022
            </LT>

            <RT>
                Having trouble? contact us via email:
                thanutza_dmex@yahoo.com
            </RT>
        </Foot>
    );
};

export default Footer;