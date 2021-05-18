import SmallService from "../SmallService/SmallService";
import { Service } from "../../../types";
import LargeService from "../LargeService/LargeService";
import ServicesOutputLogic from "./ServiceOutput.logic";

interface Props {
    services: Service[];
}

function ServiceOutput({ services }: Props) {
    const { focus, setFocus, useOnServicesChange } =
        ServicesOutputLogic(services);
    useOnServicesChange();

    return (
        <>
            {focus ? (
                <LargeService
                    id={focus}
                    setFocus={setFocus}
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
        </>
    );
}

export default ServiceOutput;
