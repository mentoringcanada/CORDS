import styled from "styled-components";

export const StyledDemo = styled.div`
    margin: auto;
    padding: 2rem;
    margin-bottom: 2rem;
    max-width: 1200px;
    & > div {
        margin-bottom: 2rem;
    }
    .output {
        height: 60vh;
    }
    @media only screen and (max-width: 768px) {
        padding: 1rem;
    }
`;

export const StyledDefaultInfo = styled.div`
    h2 {
        margin-bottom: 1rem;
    }
    @media only screen and (max-width: 768px) {
        h2 {
            font-size: 1.3rem;
        }
        p {
            font-size: 0.95rem;
        }
    } ;
`;

export const StyledCustomInputs = styled.div`
    display: flex;
    flex-direction: column;
    label {
        display: flex;
        align-items: center;
    }
    label.title {
        * {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            font-weight: bold;
        }
    }
    label.desc {
        * {
            font-size: 1rem;
        }
    }
    @media only screen and (max-width: 768px) {
        label.title {
            * {
                font-size: 1.3rem;
            }
        }
        label.desc {
            * {
                font-size: 0.95rem;
            }
        }
    }
`;

export const StyledViewSimilarButton = styled.button`
    background-color: var(--primary-color);
    margin-top: 1.5rem;
    font-size: 1.1rem;
    padding: 0.5rem;
    border-radius: 0.3rem;
    @media only screen and (max-width: 768px) {
        font-size: 0.9rem;
    } ;
`;
