const PagesBarLogic = (
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
    const pageBack = () => {
        setCurrentPage(currentPage - 1);
    };
    const pageForward = () => {
        setCurrentPage(currentPage + 1);
    };
    const startPage = () => {
        setCurrentPage(1);
    };

    return { pageBack, pageForward, startPage };
};

export default PagesBarLogic;
