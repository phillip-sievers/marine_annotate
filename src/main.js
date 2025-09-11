const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const previewSection = document.getElementById("previewSection");
const imagePreview = document.getElementById("imagePreview");
const annotateButton = document.querySelector(".annotate-button");
const getImageButton = document.querySelector(".get-image");

uploadArea.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
    const currFiles = e.target.files;
    if (currFiles.length > 0) {
        let src = URL.createObjectURL(currFiles[0]);
        localStorage.setItem("selectedImage", src);
        imagePreview.src = src;
        previewSection.classList.remove("hidden");
        uploadArea.classList.add("hidden");
    }
});

annotateButton.addEventListener("click", () => {
    window.location.href = `annotate.html`;
});

const API_KEY = "RB6xVqFugJmNed57P07Ql_r9l45zBtMUtqA3yr4-6eo";

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

async function getRandomMarineImage() {
    const randomAnimal =
        marineAnimals[Math.floor(Math.random() * marineAnimals.length)];

    const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${randomAnimal}&client_id=${API_KEY}&per_page=1`
    );
    const data = await response.json();

    let src = data.results[0].urls.regular;
    localStorage.setItem("selectedImage", src);
    imagePreview.src = src;
    previewSection.classList.remove("hidden");
    uploadArea.classList.add("hidden");
    getImageButton.disabled = true;
    getImageButton.classList.add("hidden");
}

getImageButton.addEventListener("click", getRandomMarineImage);
