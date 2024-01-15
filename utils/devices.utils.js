export const getSectionDataFromDispositivos = (dispositivos) => {
    if ( !Array.isArray(dispositivos) )
        return [];
    
    const sections = [];
    dispositivos.forEach((device) => {
        let added = false;

        sections.forEach(section => {
            if (section.title == device.establecimiento) {
                added = true;
                section.data = [...section.data, device];
            }
        })

        if (!added) {
            sections.push({
                title: device.establecimiento,
                data: [device]
            });
        }
    });

    // console.log(sections);
    return sections;
}