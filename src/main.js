const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewSection = document.getElementById('previewSection');
const imagePreview = document.getElementById('imagePreview');
const annotateButton = document.querySelector('.annotate-button');

uploadArea.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    const currFiles = e.target.files;
    if (currFiles.length > 0) {
        let src = URL.createObjectURL(currFiles[0]);
        localStorage.setItem("selectedImage", src);
        imagePreview.src = src;
        previewSection.classList.remove('hidden');
        uploadArea.classList.add('hidden');
    }
});

annotateButton.addEventListener('click', () => {
    window.location.href = `annotate.html`;
});