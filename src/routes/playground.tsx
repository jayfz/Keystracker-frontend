import { HStack, VStack, background } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function Playground() {
  const sourceImageCanvasRef = useRef<HTMLCanvasElement>(null);
  const smoothedZoomRef = useRef<HTMLCanvasElement>(null);
  const pixelatedZoomRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "http://localhost:8000/public/7/frame-1285.jpg";

    const sourceCanvas = sourceImageCanvasRef.current;
    const smoothedCanvas = smoothedZoomRef.current;
    const pixelatedCanvas = pixelatedZoomRef.current;

    if (
      sourceCanvas === null ||
      smoothedCanvas === null ||
      pixelatedCanvas === null
    ) {
      return;
    }

    const smoothedZoomCtx = smoothedCanvas.getContext("2d");
    const pixelatedZoomCtx = pixelatedCanvas.getContext("2d");
    const sourceCtx = sourceCanvas.getContext("2d");

    if (
      smoothedZoomCtx === null ||
      pixelatedZoomCtx === null ||
      sourceCtx === null
    ) {
      return;
    }

    smoothedZoomCtx.imageSmoothingEnabled = true;
    pixelatedZoomCtx.imageSmoothingEnabled = false;

    function onImageLoad() {
      draw(img);
    }

    function onCanvasMouseOver(event) {
      console.log(event.offsetX, event.offsetY);
      // const x = event.layerX;
      // const y = event.layerY;
      const x = event.offsetX;
      const y = event.offsetY;

      zoom(smoothedZoomCtx, x, y, sourceCanvas);
      zoom(pixelatedZoomCtx, x, y, sourceCanvas);
    }

    function zoom(ctx, sx, sy, thecanvas) {
      const displayedImageWidth = img.width / 2;
      const displayedImageHeight = img.height / 2;
      const magnifyingAreaLength = 50;
      const outputCanvasAreaLength = 400;

      const fixedSx = Math.min(sx, displayedImageWidth - magnifyingAreaLength);
      const fixedSy = Math.min(sy, displayedImageHeight - magnifyingAreaLength);
      ctx.drawImage(
        thecanvas,
        fixedSx,
        fixedSy,
        magnifyingAreaLength,
        magnifyingAreaLength,
        0,
        0,
        outputCanvasAreaLength,
        outputCanvasAreaLength
      );
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;

      const linexstart = outputCanvasAreaLength * (sx / displayedImageWidth);
      const actualLine =
        fixedSx + magnifyingAreaLength * (sx / displayedImageWidth);
      console.log(actualLine);

      ctx.beginPath();
      ctx.moveTo(linexstart, 0);
      ctx.lineTo(linexstart, outputCanvasAreaLength);
      ctx.stroke();
    }

    img.addEventListener("load", onImageLoad);

    function draw(img) {
      if (sourceCtx && sourceCanvas) {
        sourceCtx.drawImage(img, 0, 0, 1280 / 2, 720 / 2);
        sourceCanvas.addEventListener("mousemove", onCanvasMouseOver);
      }
    }

    return () => {
      sourceCanvas.removeEventListener("mousemove", onCanvasMouseOver);
      img.removeEventListener("load", onImageLoad);
    };
  }, []);
  return (
    <HStack spacing={2}>
      <canvas
        style={{ backgroundColor: "lightblue" }}
        height={360}
        width={640}
        ref={sourceImageCanvasRef}
        id="canvas"
      ></canvas>
      <canvas
        style={{ backgroundColor: "lightblue", display: "none" }}
        height={300}
        width={300}
        ref={smoothedZoomRef}
        id="smoothed-zoom"
      ></canvas>
      <canvas
        style={{ backgroundColor: "lightblue" }}
        height={400}
        width={400}
        ref={pixelatedZoomRef}
        id="pixelated-zoom"
      ></canvas>
    </HStack>
  );
}
