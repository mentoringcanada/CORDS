import {
    geocodeByPlaceId,
    geocodeByLatLng,
} from "react-google-places-autocomplete";
import { useContext, useEffect, useState } from "react";
import { getLocalLocation } from "../../../helper/API";
import { useQuery } from "@apollo/client";
import SearchContext from "../SearchContext";
import LanguageContext from "../../../helper/LanguageContext";
import { GET_SEARCH_FILTERS } from "../../../helper/CMS";

const distanceSelectOptions = [
    { value: 1, label: "1km" },
    { value: 3, label: "3km" },
    { value: 5, label: "5km" },
    { value: 10, label: "10km" },
    { value: 20, label: "20km" },
    { value: 50, label: "50km" },
];

const LocationBarLogic = () => {
    const { search, setSearch } = useContext(SearchContext);
    const [locationValue, setLocationValue] = useState<any>();
    const [sortValue, setSortValue] = useState<any>();

    // Gets local location when location bar renders
    const useHandleLocalLocation = () => {
        useEffect(() => {
            const setLocalLocation = async () => {
                const localLocation: any = await getLocalLocation();
                setSearch({
                    ...search,
                    location: localLocation,
                });
                const res = await geocodeByLatLng(localLocation);
                setLocationValue({
                    value: {
                        place_id: res[0].place_id,
                    },
                    label: res[0].formatted_address,
                });
            };
            setLocalLocation();
        }, []);
    };

    const useLocationChange = (geoInputLocation: any) => {
        useEffect(() => {
            const setLocationContext = async () => {
                const res = await geocodeByPlaceId(
                    geoInputLocation.value.place_id
                );
                setSearch({
                    ...search,
                    location: {
                        lat: res[0].geometry.location.lat(),
                        lng: res[0].geometry.location.lng(),
                    },
                });
            };
            geoInputLocation && setLocationContext();
        }, [geoInputLocation]);
    };

    // Distance
    const handleDistanceChange = (distanceValue: any) => {
        setSearch({
            ...search,
            distance: distanceValue.value,
        });
    };

    // Filter
    const handleFilterChange = (filter: any) => {
        setSortValue(filter);
        setSearch({
            ...search,
            filter: filter.value,
        });
    };

    const useOnLanguageChange = (language: string) => {
        useEffect(() => {
            language === "fr-CA"
                ? setSortValue({
                      label: "Meilleure correspondance",
                      value: "best",
                  })
                : setSortValue({ label: "Best Match", value: "best" });
            setSearch({
                ...search,
                filter: "best",
            });
        }, [language]);
    };

    // Text content
    const { language } = useContext(LanguageContext);
    const { error, data } = useQuery(GET_SEARCH_FILTERS, {
        variables: { language },
    });

    const searchFilters = data ? data.searchFilters : [];
    const searchBar = data ? data.searches[0] : [];

    return {
        locationValue,
        setLocationValue,
        useLocationChange,
        useHandleLocalLocation,
        handleDistanceChange,
        handleFilterChange,
        distanceSelectOptions,
        searchFilters,
        searchBar,
        error,
        language,
        useOnLanguageChange,
        sortValue,
    };
};

export default LocationBarLogic;
