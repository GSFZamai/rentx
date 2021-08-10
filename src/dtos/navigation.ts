import { CarDTO } from "./CarDTO";

interface ParamsProps {
    car?: CarDTO,
    dates?: string[];
}

export interface NavigationProps {
    navigate: (screen: string, params?: ParamsProps) => void;
    goBack: () => void;
}