import { searchPersonEntityId, getPersonDates } from "./wikidataService";

// Essa função vai decidir se a pessoa já morreu ou não
export async function checkIfDead(name, birthdate) {
    const entityId = await searchPersonEntityId(name);
    if (!entityId) return { found: false };

    const { birth, death } = await getPersonDates(entityId);

    if (!birth) return { found: false };

    const inputBirth = new Date(birthdate).toISOString().slice(0, 10);
    const wikidataBirth = birth.toISOString().slice(0, 10);

    if (inputBirth !== wikidataBirth) return { found: false };

    if (death) {
        // Só entra aqui se realmente tiver death registrada
        return { found: true, dead: true, deathDate: death.toLocaleDateString() };
    } else {
        return { found: true, dead: false };
    }
}
