import React from "react";
import styled from "styled-components";
import heroImg from "./images/hero.jpg";

const StyledTestSite = styled.div`
    button {
        font-family: var(--secondary-font);
        color: white;
        background-color: transparent;
        font-size: 1.1rem;
        font-weight: 600;
    }
    header {
        background-color: #c22418;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 5rem;
    }
    header h2 {
        font-size: 1.7rem;
    }
    nav {
        display: flex;
        justify-content: space-around;
        width: 30rem;
        font-size: 1.1rem;
    }
    .hero {
        background-image: url(${heroImg});
        background-repeat: no-repeat;
        background-size: cover;
        height: 80vh;
    }
    .articles {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 2rem 7%;
    }
    .articles article {
        width: 25rem;
        height: 30vh;
        padding: 3%;
        text-align: center;
    }
    .articles article p {
        margin-top: 1.5rem;
    }
`;

export default function TestSite() {
    return (
        <StyledTestSite>
            <header>
                <h2>CORDS Test Site</h2>
                <nav>
                    <button>Home</button>
                    <button>About</button>
                    <button>Ways to Help</button>
                    <button>Contact</button>
                </nav>
            </header>
            <section className="hero"></section>
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
        </StyledTestSite>
    );
}
