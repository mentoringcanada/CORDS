import SmallService from "../SmallService/SmallService";
import { Location, Service } from "../../../types";
import LargeService from "../LargeService/LargeService";
import ServicesOutputLogic from "./ServiceOutput.logic";
import { StyledServiceOutput } from "./ServiceOutput.styles";

interface Props {
    services: Service[];
    location?: Location;
}

function ServiceOutput({
    services,
    location = { lat: undefined, lng: undefined },
}: Props) {
    const {
        outputRef,
        focus,
        setFocus,
        useOnServicesChange,
        useOnFocusChange,
    } = ServicesOutputLogic();
    useOnServicesChange(services);
    useOnFocusChange(focus);

    return (
        <StyledServiceOutput ref={outputRef} data-testid="output-container">
            {focus ? (
                <LargeService
                    id={focus}
                    setFocus={setFocus}
                    location={location}
                    data-testid="large-service"
                />
            ) : (
                services &&
                services.map((service) => (
                    <SmallService
                        key={service.item_id}
                        id={service.item_id}
                        name={service.name}
                        link={service.link}
                        description={service.description}
                        setFocus={setFocus}
                        data-testid="small-service"
                    />
                ))
            )}
        </StyledServiceOutput>
    );
}

export default ServiceOutput;
