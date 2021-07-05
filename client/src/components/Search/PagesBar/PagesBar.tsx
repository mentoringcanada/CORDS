import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
    StyledPageBox,
    StyledPagesBar,
    StyledPagesBarContainer,
} from "./PagesBar.styles";

interface Props {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PagesBar = ({ page, setPage }: Props) => {
    const maxPages = 2;
    const mutatePage = (x: number) => {
        if (page + x > 0 && page + x <= maxPages) {
            setPage(page + x);
        }
    };

    return (
        <StyledPagesBarContainer>
            <StyledPagesBar>
                <StyledPageBox onClick={() => mutatePage(-1)}>
                    <FaChevronLeft />
                </StyledPageBox>
                {page > 1 && (
                    <>
                        {page > 2 && (
                            <>
                                <StyledPageBox onClick={() => setPage(1)}>
                                    1
                                </StyledPageBox>
                                {page > 3 && <StyledPageBox>...</StyledPageBox>}
                            </>
                        )}
                        <StyledPageBox onClick={() => mutatePage(-1)}>
                            {page - 1}
                        </StyledPageBox>
                    </>
                )}
                <StyledPageBox className="current-page">{page}</StyledPageBox>
                {page < maxPages && (
                    <>
                        <StyledPageBox onClick={() => mutatePage(1)}>
                            {page + 1}
                        </StyledPageBox>
                        {page < maxPages - 1 && (
                            <>
                                {page < maxPages - 2 && (
                                    <StyledPageBox>...</StyledPageBox>
                                )}
                                <StyledPageBox onClick={() => setPage(10)}>
                                    {maxPages}
                                </StyledPageBox>
                            </>
                        )}
                    </>
                )}
                <StyledPageBox onClick={() => mutatePage(1)}>
                    <FaChevronRight />
                </StyledPageBox>
            </StyledPagesBar>
        </StyledPagesBarContainer>
    );
};

export default PagesBar;
