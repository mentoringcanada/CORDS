import styled from "styled-components";

export const StyledHome = styled.div`
    .hero {
        width: 100%;
        img {
            width: 100%;
        }
    }
    .articles {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 2rem 7%;
        article {
            width: 25rem;
            height: 30vh;
            padding: 3%;
            text-align: center;
            p {
                margin-top: 1.5rem;
            }
        }
    }

    @media only screen and (max-width: 768px) {
        .hero {
            background-size: auto;
        }
        .articles {
            article {
                height: auto;
            }
        }
    }
`;
