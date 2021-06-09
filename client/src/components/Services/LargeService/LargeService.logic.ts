import { useEffect, useState, useContext } from "react";
import { getSimilar } from "../../../helper/API";
import LanguageContext from "../../../helper/LanguageContext";
import { Location, Service, SimilarBody } from "../../../types";

const LargeServiceLogic = (
    location: Location,
    setSearchState?: React.Dispatch<React.SetStateAction<string>>
) => {
    const [similar, setSimilar] = useState<Service[]>([]);
    const [service, setService] = useState<Service>();
    const { language } = useContext(LanguageContext);

    const useSetState = (id: number) => {
        useEffect(() => {
            const similarBody: SimilarBody = {
                resourceId: id,
                lat: location.lat,
                lng: location.lng,
            };
            // Gets service data on component startup
            if (setSearchState !== undefined) setSearchState("searching");
            getSimilar(similarBody).then((res) => {
                if (setSearchState !== undefined) setSearchState("");
                setService(res[0]);
                setSimilar(res.slice(1));
            });
        }, [id]);
    };

    const getName = (service: Service) => {
        return language === "fr-CA" && service.nom !== ""
            ? service.nom
            : service.name;
    };

    const getDescription = (service: Service) => {
        let desc =
            language === "fr-CA" && service.description_fr !== ""
                ? service.description_fr
                : service.description;

        desc = desc.replace(/[\u{0080}-\u{FFFF}]/gu, "");
        return desc;
    };

    return { similar, service, useSetState, getName, getDescription };
};

export default LargeServiceLogic;
