// Imports
import React from "react";
import styled from "styled-components";
import heroImg from "../images/hero.jpg";

const StyledHome = styled.div`
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

const Home = () => {
    return (
        <StyledHome>
            <section className="hero">
                <img src={heroImg} alt="Hands holding give sign" />
            </section>
            <section className="articles">
                <article>
                    <h2>Integrity</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis est, neque nulla reprehenderit voluptatem,
                        temporibus ea amet dolorum quaerat porro unde rerum
                        dolor possimus corrupti fuga deleniti, incidunt odio ut!
                    </p>
                </article>
                <article>
                    <h2>Giving</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Molestias, similique qui ipsam odio incidunt nemo,
                        aliquid veritatis quod excepturi et rem cum laboriosam
                        suscipit culpa! Illum voluptatum quas, nostrum eveniet
                        repellat corporis.
                    </p>
                </article>
                <article>
                    <h2>Unity</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ab quo consequuntur reprehenderit possimus architecto,
                        cum quisquam quae necessitatibus explicabo commodi
                        fugiat odio ut omnis minima cupiditate! Voluptatibus,
                        dolorum!
                    </p>
                </article>
            </section>
        </StyledHome>
    );
};

export default Home;
