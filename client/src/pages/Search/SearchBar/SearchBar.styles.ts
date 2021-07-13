import styled from "styled-components";

export const StyledSearchBar = styled.form`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
    input {
        transition: 0.3s all;
        border: 1px solid transparent;
        font-size: 0.75rem;
        padding: 0.7rem 2.5rem 0.7rem 0.7rem;
        border-radius: 2rem;
        width: 100%;
        border: 1px solid #ccc;
        box-shadow: 1px 1px 2px grey;
        :hover {
            border-color: #aaa;
            box-shadow: 1px 1px 4px grey;
        }
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
    @media only screen and (max-width: 768px) {
        margin-bottom: 0rem;
    }
`;
