import styled from "styled-components";

export const StyledNav = styled.nav`
    display: flex;
    justify-content: space-around;
    font-size: 1.1rem;
    margin-right: 1rem;
    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: 0.4rem 1rem;
        &.normlink {
            max-height: 100px;
            color: #ccc;
            margin: 0.2rem 0.5rem 0.2rem 0rem;
            :hover {
                color: #ddd;
                box-shadow: inset 0 -5px 1px -2px white;
            }
        }
    }
    @media only screen and (max-width: 768px) {
        display: none;
        justify-content: space-between;
        position: absolute;
        margin-right: 0;
        top: 100%;
        right: 0%;
        height: 70px;
        width: 100vw;
        background-color: #22262add;
        z-index: 1;
        a {
            justify-content: center;
            &.normlink {
                flex: 1;
                margin: 0;
                :hover {
                    box-shadow: none;
                }
            }
        }
        &.open {
            display: flex;
        }
    }
`;

export const StyledBurgerButton = styled.div`
    cursor: pointer;
    display: none;
    font-size: 2rem;
    height: 80px;
    padding: 0.5rem;
    align-items: center;
    @media only screen and (max-width: 768px) {
        display: flex;
    }
`;
