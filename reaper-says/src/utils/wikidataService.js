export async function searchPersonEntityId(name) {
    const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(name)}&language=en&format=json&origin=*`;
    const response = await fetch(url);
    const data = await response.json();
    return data.search?.[0]?.id || null;
}

export async function getPersonDates(entityId) {
    const url = `https://www.wikidata.org/wiki/Special:EntityData/${entityId}.json`;
    const response = await fetch(url);
    const data = await response.json();
    const entity = data.entities[entityId];

    console.log("Entity Data:", entity); // debug

    const birthRaw = entity.claims?.P569?.[0]?.mainsnak?.datavalue?.value?.time || null;
    const deathRaw = entity.claims?.P570?.[0]?.mainsnak?.datavalue?.value?.time || null;

    const birthDate = birthRaw ? new Date(birthRaw.replace('+', '')) : null;
    const deathDate = deathRaw ? new Date(deathRaw.replace('+', '')) : null;

    console.log("Birth Raw:", birthRaw);
    console.log("Death Raw:", deathRaw);

    return {
        birth: birthDate,
        death: deathDate
    };
}
