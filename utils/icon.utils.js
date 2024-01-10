import { escuelaIcons, homeIcons, hospitalIcons, officeIcons } from "../Ubicacion";

export function findDeviceIcon(establecimiento, grupo) {
    let iconName = '';
    let filteredIcons = [];
    switch (establecimiento.toLowerCase()) {
        case 'casa':
            filteredIcons = homeIcons.filter(item => (item.grupo == grupo))
            break;

        case 'hospital':
            filteredIcons = hospitalIcons.filter(item => (item.grupo == grupo))

            break;

        case 'escuela':
            filteredIcons = escuelaIcons.filter(item => (item.grupo == grupo))

            break;

        case 'oficina':
            filteredIcons = officeIcons.filter(item => (item.grupo == grupo))

            break;

        default:
            return null;
    }

    return filteredIcons[0]?.icon;
}