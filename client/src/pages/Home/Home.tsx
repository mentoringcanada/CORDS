import { StyledHome } from "./Home.styles";
import { StyledContainer } from "../../styles/StyledContainer";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import HomeLogic from "./Home.logic";

const Home = () => {
    const { error, homeContent } = HomeLogic();

    if (error) {
        return <p>Content collection error...</p>;
    }

    return (
        <StyledPageContainer>
            <StyledHome>
                <StyledContainer
                    dangerouslySetInnerHTML={{
                        __html: homeContent.introductionText,
                    }}
                ></StyledContainer>
            </StyledHome>
        </StyledPageContainer>
    );
};

export default Home;
