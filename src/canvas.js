import Konva from "konva";

const imgUrl = localStorage.getItem("selectedImage");

const stage = new Konva.Stage({
    container: "canvas",
    width: 600,
    height: 500,
});

const layer = new Konva.Layer();
stage.add(layer);

if (imgUrl) {
    Konva.Image.fromURL(imgUrl, (image) => {
        image.setAttrs({
            x: 0,
            y: 0,
        });
        layer.add(image);
        layer.batchDraw();
    });
}

let isDrawing = false;
let currentLine;

const colorInput = document.getElementById("colorInput");

stage.on("mousedown touchstart", () => {
    isDrawing = true;
    const pos = stage.getPointerPosition();
    currentLine = new Konva.Line({
        stroke: colorInput.value,
        strokeWidth: 4,
        points: [pos.x, pos.y],
    });
    layer.add(currentLine);
});

stage.on("mousemove touchmove", () => {
    if (!isDrawing) return;
    const pos = stage.getPointerPosition();
    const newPoints = currentLine.points().concat([pos.x, pos.y]);
    currentLine.points(newPoints);
    layer.batchDraw();
});

stage.on("mouseup touchend", () => {
    isDrawing = false;
});

const saveButton = document.getElementById("saveButton");
const clearButton = document.getElementById("clearButton");

saveButton.addEventListener("click", () => {
    const dataURL = stage.toDataURL({});
    const link = document.createElement("a");
    link.download = "stage.png";
    link.href = dataURL;
    link.click();
});

clearButton.addEventListener("click", () => {
    layer.getChildren().forEach((child) => {
        if (child.className === "Line") {
            child.destroy();
        }
    });
    currentLine = null;
    layer.batchDraw();
});
