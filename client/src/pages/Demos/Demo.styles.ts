import styled from "styled-components";

const StyledDemo = styled.div`
    height: 100%;
    margin: auto;
    padding: 2rem;
    margin-bottom: 2rem;
    max-width: 1200px;
    .demo {
        margin-bottom: 1rem;
    }
    label.demo {
        display: flex;
        align-items: center;
        input {
            background-color: transparent;
            width: auto;
        }
        &.title {
            * {
                font-size: 1.5rem;
                font-weight: bold;
            }
        }
        &.desc {
            * {
                font-size: 1rem;
            }
        }
    }
    button.demo {
        background-color: var(--primary-color);
        margin-top: 1rem;
        font-size: 1.1rem;
        padding: 0.5rem;
        border-radius: 0.3rem;
    }
    @media only screen and (max-width: 768px) {
        padding: 1rem;
    } ;
`;

export default StyledDemo;
