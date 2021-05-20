import { StyledHome } from "./Home.styles";
import { StyledContainer } from "../../styles/StyledContainer";
import { StyledPageContainer } from "../../styles/StyledPageContainer";

const Home = () => {
    return (
        <StyledPageContainer>
            <StyledHome>
                <StyledContainer>
                    <h2>CORDS Portal</h2>
                    <p>
                        This portal provides access to 211 service listings data
                        in the Greater Toronto Area. The two core functions so
                        far are searching services and browsing similar services
                        to specific organizations.
                    </p>
                    <h3>Search</h3>
                    <p>
                        Search allows direct look up of our services data. The
                        search functionality accommodates natural language
                        processing, geolocation and synonyms of 16 different
                        languages thanks to open source software from companies
                        such as Facebook and Google.
                    </p>
                    <p>
                        We will be tracking searches in the future for the sake
                        of quality assurance and to provide related results.
                    </p>
                    <h3>Organization Demos</h3>
                    <p>
                        Each demo represents a fictitious organization with a
                        name and description. You are able to search our
                        services database for ones similar to this organization.
                        This is intended to be used on service websites to
                        connect organizations over the web by showing users
                        other services they might be interested in.
                    </p>
                </StyledContainer>
            </StyledHome>
        </StyledPageContainer>
    );
};

export default Home;
