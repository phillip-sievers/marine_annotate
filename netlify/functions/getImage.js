export async function handler(event, context) {
    const marineAnimals = [
        "whale",
        "dolphin",
        "shark",
        "sea turtle",
        "octopus",
        "jellyfish",
        "seahorse",
        "starfish",
        "coral reef",
        "tropical fish",
    ];
    const randomAnimal =
        marineAnimals[Math.floor(Math.random() * marineAnimals.length)];

    const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${randomAnimal}&client_id=${process.env.UNSPLASH_API_KEY}&per_page=1`
    );
    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
}
