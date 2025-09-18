const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const previewSection = document.getElementById("previewSection");
const imagePreview = document.getElementById("imagePreview");
const annotateButton = document.querySelector(".annotate-button");
const getImageButton = document.querySelector(".get-image");

uploadArea.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target.result;
            localStorage.setItem("selectedImage", dataUrl);
            imagePreview.src = dataUrl;
            previewSection.classList.remove("hidden");
            uploadArea.classList.add("hidden");
        };
        reader.readAsDataURL(file);
    }
});

annotateButton.addEventListener("click", () => {
    window.location.href = `annotate.html`;
});

async function getRandomMarineImage() {
    const response = await fetch("/.netlify/functions/getImage");

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
