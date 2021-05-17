import styled from "styled-components";

export const StyledHeader = styled.header`
    background-color: #22262a;
    position: relative;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    box-shadow: 0px 1px 5px grey;
    outline: 3px solid #ccc;
    img {
        height: 2.6rem;
        margin-left: 2rem;
    }
    @media only screen and (max-width: 500px) {
        img {
            height: 2.3rem;
            margin-left: 1rem;
        }
    }
`;
