import { StyledHome } from "./Home.styles";
import { StyledContainer } from "../../styles/StyledContainer";
import { StyledPageContainer } from "../../styles/StyledPageContainer";

const Home = () => {
    return (
        <StyledPageContainer>
            <StyledHome>
                <StyledContainer>
                    <h2>CORDS Demo Portal</h2>
                    <p>
                        This portal provides access to 211 service listings data
                        in the Greater Toronto Area. The two core functions so
                        far are searching services and browsing similar services
                        to specific organizations.
                    </p>
                    <h3>Search</h3>
                    <p>
                        The search functionality accommodates geolocation and
                        synonyms of 16 different languages thanks to open source
                        software from companies such as Facebook and Google.
                    </p>
                    <p>
                        We will be tracking searches in the future for the sake
                        of quality assurance and to provide related results.
                    </p>
                    <h3>Organization Demos</h3>
                    <p>
                        Each demo represents a fictitious organization's website
                        with its name and description. On the website, you are
                        able to view similar organizations and find the right
                        one for your needs with inter-service connections.
                    </p>
                </StyledContainer>
            </StyledHome>
        </StyledPageContainer>
    );
};

export default Home;
