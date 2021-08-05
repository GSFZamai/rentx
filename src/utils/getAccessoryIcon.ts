import SpeedSVG from '../assets/speed.svg';
import AccSVG from '../assets/acceleration.svg';
import HorsePowerSVG from '../assets/force.svg';
import GasolineSVG from '../assets/gasoline.svg';
import EnergySVG from '../assets/energy.svg';
import HybridSVG from '../assets/hybrid.svg';
import ExchangeSVG from '../assets/exchange.svg';
import PeopleSVG from '../assets/people.svg';

export function getAccessoryIcon(type: string) {
    switch (type) {
        case 'speed':
            return SpeedSVG;

        case 'acceleration':
            return AccSVG;

        case 'turning_diameter':
            return HorsePowerSVG;

        case 'electric_motor':
            return EnergySVG;

        case 'exchange':
            return ExchangeSVG;

        case 'seats':
            return PeopleSVG;

        case 'gasoline_motor':
            return GasolineSVG;

        case 'hybrid_motor':
            return HybridSVG;
        default:
            return SpeedSVG;

    }
}