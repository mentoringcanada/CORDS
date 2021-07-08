import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PagesBarLogic from "./PagesBar.logic";
import {
    StyledPageBox,
    StyledPagesBar,
    StyledPagesBarContainer,
} from "./PagesBar.styles";

interface Props {
    maxPages: number;
}

const PagesBar = ({ maxPages }: Props) => {
    const { boxes, handleMutatePage } = PagesBarLogic(maxPages);

    return (
        <StyledPagesBarContainer>
            <StyledPagesBar>
                <StyledPageBox onClick={() => handleMutatePage(-1)}>
                    <FaChevronLeft />
                </StyledPageBox>
                {boxes}
                <StyledPageBox onClick={() => handleMutatePage(1)}>
                    <FaChevronRight />
                </StyledPageBox>
            </StyledPagesBar>
        </StyledPagesBarContainer>
    );
};

export default PagesBar;
