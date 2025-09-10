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
  const imageObj = new Image();
  imageObj.src = imgUrl;
  imageObj.onload = () => {
    const bg = new Konva.Image({
      x: 0,
      y: 0,
      image: imageObj,
      width: stage.width(),
      height: stage.height(),
    });
    layer.add(bg);
  };
}

let isDrawing = false;
let currentLine;

stage.on("mousedown touchstart", () => {
  isDrawing = true;
  const pos = stage.getPointerPosition();
  currentLine = new Konva.Line({
    stroke: "blue",
    strokeWidth: 2,
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
