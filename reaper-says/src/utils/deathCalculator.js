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

    // ✅ gerar um mês aleatório (0 a 11) e um dia aleatório (1 a 28 só pra garantir)
    const randomMonth = seed % 12; // gera 0 a 11
    const randomDay = (seed * 7) % 28 + 1; // gera 1 a 28

    const deathDate = new Date(deathYear, randomMonth, randomDay);
    const cause = CAUSES[seed % CAUSES.length];

    return {
        date: deathDate,
        cause,
    };
}
