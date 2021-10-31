import { useHistory } from "react-router-dom";
import { useQueryParams } from "../../../helper/Services";
import { StyledPageBox } from "./PagesBar.styles";

const PagesBarLogic = (maxPages: number) => {
    const history = useHistory();
    const query = useQueryParams();
    const page = Number(query.get("page"));

    const handleSelectPage = (x: number) => {
        history.push({
            pathname: history.location.pathname,
            search: `${history.location.search.substring(
                0,
                history.location.search.length - page.toString().length
            )}${x}`,
        });
    };

    const handleMutatePage = (x: number) => {
        if (page + x >= 1 && page + x <= maxPages) {
            history.push({
                pathname: history.location.pathname,
                search: `${history.location.search.substring(
                    0,
                    history.location.search.length - 1
                )}${page + x}`,
            });
        }
    };

    // Generates Boxes
    const boxes: JSX.Element[] = [];
    for (let i = -2; i <= 2; i++) {
        if (page + i > 0 && page + i < maxPages + 1) {
            boxes.push(
                <StyledPageBox
                    onClick={() => handleSelectPage(page + i)}
                    className={page === page + i ? "current-page" : ""}
                    key={page + i}
                >
                    {page + i}
                </StyledPageBox>
            );
        }
    }

    return { boxes, handleMutatePage };
};

export default PagesBarLogic;
