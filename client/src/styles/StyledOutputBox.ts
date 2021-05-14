import styled from "styled-components";

export const StyledOutputBox = styled.div`
    position: relative;
    border-radius: 0px 0px 3px 3px;
    height: 100%;
    width: 100%;
    background-color: white;
    overflow-y: scroll;
    overflow-x: hidden;
    box-shadow: 2px 2px 5px grey;
    background: linear-gradient(
            rgb(229, 241, 241) 0%,
            rgba(229, 241, 241, 0) 100%
        )
        0% 0% / 100% 248px no-repeat;
    &.widget {
        background: white;
    }
`;
