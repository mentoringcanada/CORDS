import { StyledHome } from "./Home.styles";
import { StyledContainer } from "../../../styles/StyledContainer";
import HomeLogic from "./Home.logic";

const Home = () => {
    const { error, homeContent } = HomeLogic();

    if (error) {
        return <p>Content collection error...</p>;
    }

    return (
        <StyledHome>
            <StyledContainer
                dangerouslySetInnerHTML={{
                    __html: homeContent.introductionText,
                }}
            ></StyledContainer>
        </StyledHome>
    );
};

export default Home;
