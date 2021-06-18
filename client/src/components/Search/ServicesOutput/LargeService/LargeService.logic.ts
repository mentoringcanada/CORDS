import { useQuery } from "@apollo/client";
import { useEffect, useState, useContext } from "react";
import { getSimilar } from "../../../../helper/API";
import { GET_LARGE_SERVICE } from "../../../../helper/CMS";
import LanguageContext from "../../../../helper/LanguageContext";
import { Service, SimilarBody } from "../../../../types";
import SearchContext from "../../SearchContext";

const LargeServiceLogic = (id: number) => {
    const [similar, setSimilar] = useState<Service[]>([]);
    const [service, setService] = useState<Service>();
    const [page, setPage] = useState(1);
    const { search } = useContext(SearchContext);
    const { language } = useContext(LanguageContext);

    const useSetState = (id: number) => {
        useEffect(() => {
            const similarBody: SimilarBody = {
                resourceId: id,
                lat: search.location.lat,
                lng: search.location.lng,
                distance: search.distance,
                page: 1,
            };
            // Gets service data on component startup
            getSimilar(similarBody).then((res) => {
                setService(res[0]);
                setSimilar(res.slice(1));
            });
        }, [id]);
    };

    const handleSimilar = (page: number) => {
        const similarBody: SimilarBody = {
            resourceId: id,
            lat: search.location.lat,
            lng: search.location.lng,
            distance: search.distance,
            page,
        };

        getSimilar(similarBody).then((res) => {
            setSimilar(res);
        });
    };

    // Text content
    const { error, data } = useQuery(GET_LARGE_SERVICE, {
        variables: { language },
    });

    const largeServiceContent = data ? data.largeServices[0] : [];

    return {
        language,
        similar,
        service,
        useSetState,
        largeServiceContent,
        error,
        handleSimilar,
        page,
        setPage,
    };
};

export default LargeServiceLogic;
