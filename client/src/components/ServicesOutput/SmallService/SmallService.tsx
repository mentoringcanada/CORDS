import { FaMinus, FaSave } from "react-icons/fa";
import Feedback from "./Feedback/Feedback";
import { StyledInfo } from "../LargeService/LargeService.styles";
import {
    StyledSmallService,
    StyledSelectButton,
    StyledLogo,
} from "./SmallService.styles";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import Logo211 from "../../../media/logo-211.png";
import SearchContext from "../../../pages/Search/SearchContext";
import LanguageContext from "../../../helper/LanguageContext";

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
    const { language } = useContext(LanguageContext);
    const history = useHistory();

    return (
        <StyledSmallService
            onClick={() => {
                history.push(
                    `/search/service/${id}?ln=${language}&query=${search.query}&distance=${search.distance}&lat=${search.location.lat}&lng=${search.location.lng}&filter=${search.filter}&page=1`
                );
            }}
            className={type}
        >
            <h3 className="service-title">{name}</h3>
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
            <div className="lower">
                <StyledLogo href={link} target="_blank" rel="noreferrer">
                    <img src={Logo211} alt="Company logo" />
                </StyledLogo>
                {/* <StyledDescription
                dangerouslySetInnerHTML={{ __html: description }}
            /> */}
                <Feedback id={id} type={type} />
            </div>
        </StyledSmallService>
    );
};

export default SmallService;
