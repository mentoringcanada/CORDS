import { useLocation } from "react-router-dom";
import { Service } from "../types";

export const getName = (service: Service, language: string = "en") => {
    let name =
        language === "fr-CA" && service.nom !== "" ? service.nom : service.name;

    name = name.replace(/[\u{0080}-\u{FFFF}]/gu, "");
    return name;
};

export const getDescription = (service: Service, language: string = "en") => {
    let desc =
        language === "fr-CA" && service.description_fr !== ""
            ? service.description_fr
            : service.description;

    desc = desc.replace(/[\u{0080}-\u{FFFF}]/gu, "").replace(/\*/g, "<br />");
    return desc;
};

export const resetScroll = (
    ref: React.MutableRefObject<HTMLDivElement | null>
) => {
    if (ref.current) ref.current.scrollTop = 0;
};

export function useQueryParams() {
    return new URLSearchParams(useLocation().search);
}
