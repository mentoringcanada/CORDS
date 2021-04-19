// Import
import React, { useState } from "react";
import styled from "styled-components";
import OutputBox from "../containers/OutputBox";

// Styling
const StyledLanding = styled.div`
    text-align: center;
    align-items: center;
    height: 100%;
    padding: 1rem;
    * {
        margin-top: 1rem;
    }

    button {
        margin-top: 2rem;
        padding: 0.3rem 0.75rem;
        border-radius: 0.3rem;
        font-size: 1rem;
        background-color: var(--primary-color);
    }
`;

// Component
const Landing = () => {
    const [started, setStarted] = useState(false);
    return (
        <OutputBox>
            <StyledLanding>
                {started ? (
                    <>
                        <h2>Recommended taxonomy (Todo)</h2>
                        <h2>Try searching!</h2>
                    </>
                ) : (
                    <>
                        <h1>CORDS</h1>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Officiis optio natus ea mollitia ipsum nobis
                            alias unde earum distinctio inventore.
                        </p>
                        <button onClick={() => setStarted(true)}>
                            Get Started
                        </button>
                    </>
                )}
            </StyledLanding>
        </OutputBox>
    );
};

export default Landing;
