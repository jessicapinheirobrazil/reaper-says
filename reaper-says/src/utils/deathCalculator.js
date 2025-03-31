import { CAUSES, SETTINGS } from "../config";

export function calculateDeath(name, birthdate, minDate = null) {
    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    const seedString = name.trim().toLowerCase() + birthdate;
    let seed = 0;
    for (let i = 0; i < seedString.length; i++) {
        seed += seedString.charCodeAt(i);
    }

    const deathAge = 30 + (seed % (SETTINGS.maxAge - 30 + 1));
    const deathYear = birthYear + deathAge;

    let randomMonth = seed % 12;
    let randomDay = (seed * 7) % 28 + 1;

    let deathDate = new Date(deathYear, randomMonth, randomDay);

    // ✅ Se foi passada uma minDate (ex.: hoje) e a deathDate for menor que minDate, joga ela pro ano seguinte até passar
    if (minDate) {
        while (deathDate <= minDate) {
            deathDate.setFullYear(deathDate.getFullYear() + 1);
        }
    }

    const cause = CAUSES[seed % CAUSES.length];

    return {
        date: deathDate,
        cause,
    };
}
