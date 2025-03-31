import { CAUSES, SETTINGS } from "../config";

export function calculateDeath(name, birthdate) {
    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (age < 0 || age > SETTINGS.maxAge) {
        return { error: "The Reaper knows no one of this age... Please enter a valid birthdate." };
    }

    const seedString = name.trim().toLowerCase() + birthdate;
    let seed = 0;
    for (let i = 0; i < seedString.length; i++) {
        seed += seedString.charCodeAt(i);
    }

    const deathAge = age + (seed % (90 - 30 + 1)) + 30;
    const deathYear = birthYear + deathAge;
    const deathDate = new Date(birthdate);
    deathDate.setFullYear(deathYear);
    const cause = CAUSES[seed % CAUSES.length];

    return {
        date: deathDate.toLocaleDateString(),
        cause,
    };
}
