import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { StyledPageBox, StyledPagesBar } from "./PagesBar.styles";
import PagesBarLogic from "./PagesBar.logic";

interface Props {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PagesBar = ({ currentPage, setCurrentPage }: Props) => {
    const { pageBack, pageForward, startPage } = PagesBarLogic(
        currentPage,
        setCurrentPage
    );

    return (
        <StyledPagesBar>
            <StyledPageBox
                onClick={() => {
                    if (currentPage > 1) pageBack();
                }}
            >
                <FaAngleLeft />
            </StyledPageBox>
            {currentPage !== 1 && (
                <StyledPageBox onClick={startPage}>1</StyledPageBox>
            )}
            {currentPage > 1 && (
                <>
                    <StyledPageBox>...</StyledPageBox>
                    <StyledPageBox onClick={pageBack}>
                        {currentPage - 1}
                    </StyledPageBox>
                </>
            )}
            <StyledPageBox className="highlighted">{currentPage}</StyledPageBox>
            <StyledPageBox onClick={pageForward}>
                {currentPage + 1}
            </StyledPageBox>
            <StyledPageBox>...</StyledPageBox>
            <StyledPageBox onClick={pageForward}>
                <FaAngleRight />
            </StyledPageBox>
        </StyledPagesBar>
    );
};

export default PagesBar;
