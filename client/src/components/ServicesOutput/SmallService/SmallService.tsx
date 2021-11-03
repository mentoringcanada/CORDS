import Feedback from "./Feedback/Feedback";
import { StyledInfo } from "../LargeService/LargeService.styles";
import { StyledSmallService, StyledLogo } from "./SmallService.styles";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import Logo211 from "../../../media/211-logo.png";
import LogoMentor from "../../../media/mentor-logo.jpg";
import LogoMagnet from "../../../media/magnet-logo.png";
import SearchContext from "../../../pages/Search/SearchContext";
import LanguageContext from "../../../helper/LanguageContext";

interface Props {
    id: string;
    name: string;
    link: string;
    description: string;
    resource_type: string;
    distance: number;
    type: string;
}

// Component
const SmallService = ({
    id,
    name,
    description,
    resource_type,
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
                    `/search/service/${id}?ln=${language}&query=${search.query}&distance=${search.distance}&lat=${search.location.lat}&lng=${search.location.lng}&filter=${search.filter}&source=${search.dataSource}&page=1`
                );
            }}
            className={type}
        >
            <h3 className="service-title">{name}</h3>
            <StyledInfo>
                {distance && (
                    <p className="info">
                        <strong>Distance: </strong>
                        {`${distance.toFixed(1)} km`}
                    </p>
                )}
            </StyledInfo>
            <div className="lower">
                <StyledLogo
                    href={link}
                    target={link !== "" ? "_blank" : ""}
                    rel="noreferrer"
                >
                    {resource_type === "211" && (
                        <img src={Logo211} alt="211 logo" />
                    )}
                    {resource_type === "volunteer" && (
                        <img src={LogoMentor} alt="Mentor logo" />
                    )}
                    {resource_type === "employment" && (
                        <img src={LogoMagnet} alt="Magnet logo" />
                    )}
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
