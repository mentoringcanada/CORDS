// Imports
import {
    StyledDescription,
    StyledInfo,
    StyledLargeService,
    StyledMapsContainer,
} from "./LargeService.styles";
import LargeServiceLogic from "./LargeService.logic";
import { StyledContainer } from "../../../styles/StyledContainer";
import { StyledLogo } from "../SmallService/SmallService.styles";
import ServicesList from "../ServicesList/ServicesList";
import { getDescription, getName } from "../../../helper/Services";
import Logo211 from "../../../media/211-logo.png";
import LogoMentor from "../../../media/mentor-logo.jpg";
import LogoMagnet from "../../../media/magnet-logo.png";
import Map from "./Map/Map";
import RecommendBox from "../RecommendBox/RecommendBox";

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
        suggestedSearches,
    } = LargeServiceLogic();
    useSetState(Number(id), page);

    if (error) return <p>Content collection error...</p>;

    return (
        <>
            {service && (
                <>
                    <StyledLargeService>
                        <StyledContainer className="widget">
                            <div className="lower">
                                <div>
                                    <StyledInfo>
                                        <h2
                                            className="info"
                                            data-testid="large-title"
                                        >
                                            {getName(service, language)}
                                        </h2>
                                        {service.address !== "" && (
                                            <p>
                                                <strong>
                                                    {
                                                        largeServiceContent.address
                                                    }{" "}
                                                </strong>
                                                {service.address}
                                            </p>
                                        )}
                                        {service.distance && (
                                            <p>
                                                <strong>
                                                    {
                                                        largeServiceContent.distance
                                                    }{" "}
                                                </strong>
                                                {`${service.distance.toFixed(
                                                    1
                                                )} km`}
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
                                        <StyledDescription
                                            className="info-desc"
                                            dangerouslySetInnerHTML={{
                                                __html: getDescription(
                                                    service,
                                                    language
                                                ),
                                            }}
                                        ></StyledDescription>
                                    </StyledInfo>

                                    <StyledLogo
                                        href={service.link}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {service.resource_type === "211" && (
                                            <img src={Logo211} alt="211 logo" />
                                        )}
                                        {service.resource_type ===
                                            "volunteer" && (
                                            <img
                                                src={LogoMentor}
                                                alt="Mentor logo"
                                            />
                                        )}
                                        {service.resource_type ===
                                            "employment" && (
                                            <img
                                                src={LogoMagnet}
                                                alt="Magnet logo"
                                            />
                                        )}
                                    </StyledLogo>
                                </div>
                                <StyledMapsContainer>
                                    <Map
                                        lat={service.lat}
                                        lng={service.lng}
                                    ></Map>
                                </StyledMapsContainer>
                            </div>
                        </StyledContainer>
                        <div className="similar">
                            <h3>{largeServiceContent.similar}</h3>
                        </div>
                    </StyledLargeService>
                    <RecommendBox suggestedSearches={suggestedSearches} />
                    <ServicesList
                        type={"similar"}
                        services={similar}
                        maxPages={maxPages}
                    />
                </>
            )}
        </>
    );
};

export default LargeService;
