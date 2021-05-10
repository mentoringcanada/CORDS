import styled from "styled-components";

const Demo = styled.div`
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
        padding: 0.5rem;
        border-radius: 0.3rem;
    }
`;

export default Demo;
