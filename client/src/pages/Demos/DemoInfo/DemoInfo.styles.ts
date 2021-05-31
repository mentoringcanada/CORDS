import styled from "styled-components";

export const StyledDemoInfo = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    box-shadow: 0px 0px 2px gray;
    background-color: white;
    border-radius: 1rem;
    padding: 1rem;
    padding-right: 5rem;
    color: #4d5156;
    font-size: 0.95rem;
    &.closed {
        background-color: transparent;
        box-shadow: none;
        p {
            display: none;
        }
    }
    @media only screen and (max-width: 768px) {
        bottom: unset;
        top: 0px;
        padding-right: 3.5rem;
        font-size: 0.9rem;
        min-height: 100%;
    }
`;

export const StyledToggle = styled.div`
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
    display: flex !important;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: var(--primary-color);
    width: 2.5rem;
    height: 2.5rem;
    color: white;
    font-weight: bold;
    border-radius: 50%;
    font-size: 1.5rem;
    @media only screen and (max-width: 768px) {
        bottom: 0.7rem;
        right: 0.7rem;
    }
`;
