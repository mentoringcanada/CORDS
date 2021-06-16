import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PagesBarLogic from "./PagesBar.logic";
import { StyledPageBox, StyledPagesBar } from "./PagesBar.styles";

const PagesBar = () => {
    const { search, mutatePage, setPage } = PagesBarLogic();

    return (
        <StyledPagesBar>
            <StyledPageBox onClick={() => mutatePage(-1)}>
                <FaChevronLeft />
            </StyledPageBox>
            {search.page > 1 && (
                <>
                    {search.page > 2 && (
                        <>
                            <StyledPageBox onClick={() => setPage(1)}>
                                1
                            </StyledPageBox>
                            <StyledPageBox>...</StyledPageBox>
                        </>
                    )}
                    <StyledPageBox onClick={() => mutatePage(-1)}>
                        {search.page - 1}
                    </StyledPageBox>
                </>
            )}
            <StyledPageBox className="current-page">
                {search.page}
            </StyledPageBox>
            {search.page < 10 && (
                <>
                    <StyledPageBox onClick={() => mutatePage(1)}>
                        {search.page + 1}
                    </StyledPageBox>
                    {search.page < 9 && (
                        <>
                            <StyledPageBox>...</StyledPageBox>
                            <StyledPageBox onClick={() => setPage(10)}>
                                10
                            </StyledPageBox>
                        </>
                    )}
                </>
            )}
            <StyledPageBox onClick={() => mutatePage(1)}>
                <FaChevronRight />
            </StyledPageBox>
        </StyledPagesBar>
    );
};

export default PagesBar;
