// Imports
import { FaMapMarkerAlt, FaSave } from "react-icons/fa";
import {
    StyledInfo,
    StyledLargeService,
    StyledLinks,
} from "./LargeService.styles";
import LargeServiceLogic from "./LargeService.logic";
import { StyledContainer } from "../../../styles/StyledContainer";
import { FaLink } from "react-icons/fa";
import {
    StyledDescription,
    StyledSelectButton,
} from "../SmallService/SmallService.styles";
import ServicesList from "../ServicesList/ServicesList";
import { getDescription, getName } from "../../../helper/Services";
import { addSelection } from "../../../helper/API";

// Component
const LargeService = () => {
    const {
        language,
        similar,
        service,
        useSetState,
        largeServiceContent,
        error,
        maxPages,
        id,
        page,
    } = LargeServiceLogic();
    useSetState(Number(id), page);

    if (error) return <p>Content collection error...</p>;

    return (
        <>
            {service && (
                <>
                    <StyledLargeService>
                        <StyledContainer className="widget">
                            <StyledInfo>
                                <h2 className="info" data-testid="large-title">
                                    {getName(service, language)}
                                </h2>
                                {service.address !== "" && (
                                    <p>
                                        <strong>
                                            {largeServiceContent.address}{" "}
                                        </strong>
                                        {service.address}
                                    </p>
                                )}
                                {service.distance && (
                                    <p>
                                        <strong>
                                            {largeServiceContent.distance}{" "}
                                        </strong>
                                        {`${service.distance.toFixed(1)} km`}
                                    </p>
                                )}
                                {service.phone !== "" && (
                                    <p>
                                        <strong>
                                            {largeServiceContent.phone}{" "}
                                        </strong>
                                        {service.phone}
                                    </p>
                                )}
                                <StyledSelectButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addSelection(id).catch(() =>
                                            console.log(
                                                "Error adding selection"
                                            )
                                        );
                                    }}
                                    data-testid="save-link"
                                    className="large"
                                >
                                    <FaSave />
                                </StyledSelectButton>
                            </StyledInfo>
                            <StyledDescription
                                className="info-desc"
                                dangerouslySetInnerHTML={{
                                    __html: getDescription(service, language),
                                }}
                            ></StyledDescription>
                            <StyledLinks>
                                <a
                                    href={service.link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaLink />
                                    {largeServiceContent.viewMore}
                                </a>
                                <a
                                    href={`https://www.google.com/maps/place/${service.lat},${service.lng}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaMapMarkerAlt />
                                    {largeServiceContent.directions}
                                </a>
                            </StyledLinks>
                        </StyledContainer>
                        <div className="similar">
                            <h3>{largeServiceContent.similar}</h3>
                        </div>
                    </StyledLargeService>
                    <ServicesList
                        type={"similar"}
                        services={similar}
                        maxPages={maxPages}
                        handleSelect={(id: string) =>
                            addSelection(id).catch(() =>
                                console.log("Error adding selection")
                            )
                        }
                    />
                </>
            )}
        </>
    );
};

export default LargeService;
