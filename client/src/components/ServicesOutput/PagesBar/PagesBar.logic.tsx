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
                history.location.search.length - 1
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
    for (let i = 1; i <= maxPages; i++) {
        boxes.push(
            <StyledPageBox
                onClick={() => handleSelectPage(i)}
                className={page === i ? "current-page" : ""}
                key={i}
            >
                {i}
            </StyledPageBox>
        );
    }

    return { boxes, handleMutatePage };
};

export default PagesBarLogic;
