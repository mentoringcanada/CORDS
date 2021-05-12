import styled from "styled-components";

export const StyledSearchBar = styled.form`
    display: flex;
    align-items: center;
    width: 92%;
    margin: 0rem 0rem 16px 0.2rem;
    input {
        font-size: 0.75rem;
        padding: 0.7rem;
        border-radius: 2rem;
        width: 100%;
        box-shadow: 2px 2px 5px grey;
    }
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.9rem;
        width: 1.9rem;
        margin-left: -2.2rem;
        border-radius: 50%;
        background-color: var(--primary-color);
        box-shadow: 2px 2px 5px grey;
    }
`;
