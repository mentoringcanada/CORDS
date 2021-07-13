import { FaLink, FaMinus, FaSave } from "react-icons/fa";
import Feedback from "./Feedback/Feedback";
import { StyledInfo } from "../LargeService/LargeService.styles";
import {
    StyledSmallService,
    StyledLink,
    StyledDescription,
    StyledSelectButton,
} from "./SmallService.styles";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import SearchContext from "../../../pages/Search/SearchContext";

interface Props {
    handleSelect: (id: string) => void;
    id: string;
    name: string;
    link: string;
    description: string;
    distance: number;
    type: string;
}

// Component
const SmallService = ({
    handleSelect,
    id,
    name,
    description,
    link,
    distance,
    type,
}: Props) => {
    const { search } = useContext(SearchContext);
    const history = useHistory();

    return (
        <StyledSmallService
            onClick={() => {
                history.push(
                    `/search/service/${id}?query=${search.query}&distance=${search.distance}&lat=${search.location.lat}&lng=${search.location.lng}&filter=${search.filter}&page=1`
                );
            }}
            className={type}
        >
            <h3 className="service-title">{name}</h3>
            <StyledLink
                href={link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                data-testid="small-link"
            >
                <FaLink />
            </StyledLink>
            <StyledSelectButton
                onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(id);
                }}
                data-testid="save-link"
            >
                {type === "selections" ? <FaMinus /> : <FaSave />}
            </StyledSelectButton>
            <StyledInfo>
                {distance && (
                    <p className="info">
                        <strong>Distance: </strong>
                        {`${distance.toFixed(1)} km`}
                    </p>
                )}
            </StyledInfo>
            <StyledDescription
                dangerouslySetInnerHTML={{ __html: description }}
            />
            <Feedback id={id} type={type} />
        </StyledSmallService>
    );
};

export default SmallService;
