import { HStack, Text, Box, VStack, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export default function Playground() {
  const imgURL = "http://localhost:8000/public/7/frame-1285.jpg";

  return (
    <VStack>
      {/* <PianoPositionInput imgURL={imgURL} variant={"x"} />;
      <PianoPositionInput imgURL={imgURL} variant={"y"} />; */}

      <PianoKeysColorInput imgURL={imgURL} />
    </VStack>
  );
}

type PianoPositionInputProps = {
  imgURL: string;
  variant: "x" | "y";
};

const fetchImage = (url: string) => {
  const img = new Image();
  img.addEventListener("error", () => console.log("error loading image"));
  img.crossOrigin = "anonymous";
  img.src = url;
  return img;
};

export function PianoPositionInput(props: PianoPositionInputProps) {
  const sourceImageCanvasRef = useRef<HTMLCanvasElement>(null);
  const pixelatedZoomRef = useRef<HTMLCanvasElement>(null);
  const pixelRef = useRef(0);
  const [pixelValue, setPixelValue] = useState(0);

  useEffect(() => {
    const sourceCanvas = sourceImageCanvasRef.current;
    const pixelatedCanvas = pixelatedZoomRef.current;

    if (sourceCanvas === null || pixelatedCanvas === null) {
      return;
    }

    const pixelatedZoomCtx = pixelatedCanvas.getContext("2d");
    const sourceCtx = sourceCanvas.getContext("2d");

    if (pixelatedZoomCtx === null || sourceCtx === null) {
      return;
    }

    pixelatedZoomCtx.imageSmoothingEnabled = false;

    const img = fetchImage(props.imgURL);

    const onImageLoad = (event: Event) => {
      const image = event.currentTarget as HTMLImageElement;
      sourceCanvas.width = image.width / 2;
      sourceCanvas.height = image.height / 2;
      draw(image);
    };

    img.addEventListener("load", onImageLoad);

    const onCanvasMouseOver = (event: MouseEvent) => {
      const x = event.offsetX;
      const y = event.offsetY;
      const originalImagePosition = renderZoomedCanvasAtPosition(
        pixelatedZoomCtx,
        x,
        y,
        sourceCanvas,
        props.variant
      );
      pixelRef.current = originalImagePosition;
    };

    const onCanvasClick = (event: MouseEvent) => {
      setPixelValue(pixelRef.current);
    };

    const draw = (img: HTMLImageElement) => {
      sourceCtx.drawImage(img, 0, 0, img.width / 2, img.height / 2);
      sourceCanvas.addEventListener("mousemove", onCanvasMouseOver);
      sourceCanvas.addEventListener("click", onCanvasClick);
    };

    return () => {
      sourceCanvas.removeEventListener("mouseover", onCanvasMouseOver);
      sourceCanvas.removeEventListener("click", onCanvasClick);
      img.removeEventListener("load", onImageLoad);
    };
  }, []);
  return (
    <Box>
      <HStack spacing={2}>
        <canvas
          style={{ backgroundColor: "lightblue" }}
          // height={360}
          // width={640}
          ref={sourceImageCanvasRef}
          id="canvas"
        ></canvas>
        <canvas
          style={{ backgroundColor: "lightblue" }}
          height={400}
          width={400}
          ref={pixelatedZoomRef}
          id="pixelated-zoom"
        ></canvas>
      </HStack>
      <Text>Pixel: {pixelValue}</Text>
    </Box>
  );
}

function renderZoomedCanvasAtPosition(
  pixelatedContext: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  sourceCanvasImage: HTMLCanvasElement,
  axis: "x" | "y"
) {
  const displayedImageWidth = sourceCanvasImage.width;
  const displayedImageHeight = sourceCanvasImage.height;
  const magnifyingAreaLength = 50;
  const outputCanvasAreaLength = 400;
  const fixedSx = Math.min(sx, displayedImageWidth - magnifyingAreaLength);
  const fixedSy = Math.min(sy, displayedImageHeight - magnifyingAreaLength);

  const dimension = {
    imageAxisLength: 0,
    imageAxisPosition: 0,
    fixedImageAxisPosition: 0,
    drawLineFunction: drawVerticalLine,
  };

  if (axis === "x") {
    dimension.imageAxisLength = displayedImageWidth;
    dimension.imageAxisPosition = sx;
    dimension.fixedImageAxisPosition = fixedSx;
    dimension.drawLineFunction = drawVerticalLine;
  }

  if (axis === "y") {
    dimension.imageAxisLength = displayedImageHeight;
    dimension.imageAxisPosition = sy;
    dimension.fixedImageAxisPosition = fixedSy;
    dimension.drawLineFunction = drawHorizontalLine;
  }

  pixelatedContext.drawImage(
    sourceCanvasImage,
    fixedSx,
    fixedSy,
    magnifyingAreaLength,
    magnifyingAreaLength,
    0,
    0,
    outputCanvasAreaLength,
    outputCanvasAreaLength
  );

  const lineStart =
    outputCanvasAreaLength *
    (dimension.imageAxisPosition / dimension.imageAxisLength);

  dimension.drawLineFunction(
    pixelatedContext,
    lineStart,
    outputCanvasAreaLength
  );

  const actualLine =
    dimension.fixedImageAxisPosition +
    magnifyingAreaLength *
      (dimension.imageAxisPosition / dimension.imageAxisLength);

  return Math.ceil(actualLine) * 2;
}

function drawVerticalLine(
  canvas: CanvasRenderingContext2D,
  xcoord: number,
  endYcoord: number
) {
  canvas.strokeStyle = "red";
  canvas.lineWidth = 2;

  canvas.beginPath();
  canvas.moveTo(xcoord, 0);
  canvas.lineTo(xcoord, endYcoord);
  canvas.stroke();
}

function drawHorizontalLine(
  canvas: CanvasRenderingContext2D,
  ycoord: number,
  endXcoord: number
) {
  canvas.strokeStyle = "red";
  canvas.lineWidth = 2;

  canvas.beginPath();
  canvas.moveTo(0, ycoord);
  canvas.lineTo(endXcoord, ycoord);
  canvas.stroke();
}

type PianoKeysColorInputProps = {
  imgURL: string;
};

export function PianoKeysColorInput(props: PianoKeysColorInputProps) {
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const colorCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const sourceCanvas = sourceCanvasRef.current;
    const colorCanvas = colorCanvasRef.current;

    if (sourceCanvas === null || colorCanvas === null) {
      return;
    }

    const sourceCanvas2DContext = sourceCanvas.getContext("2d");
    const colorCanvas2DContext = colorCanvas.getContext("2d");

    if (sourceCanvas2DContext === null || colorCanvas2DContext === null) {
      return;
    }

    colorCanvas2DContext.imageSmoothingEnabled = false;

    const onImageLoad = (event: Event) => {
      const image = event.currentTarget as HTMLImageElement;
      sourceCanvas.width = image.width / 2;
      sourceCanvas.height = image.height / 2;
      draw(image);
    };

    const img = fetchImage(props.imgURL);

    img.addEventListener("load", onImageLoad);

    const onCanvasMouseOver = (event: MouseEvent) => {
      const x = event.offsetX;
      const y = event.offsetY;
      const originalImagePosition = renderZoomedCanvasAtPositionColor(
        colorCanvas2DContext,
        x,
        y,
        sourceCanvas
      );
      // pixelRef.current = originalImagePosition;
    };

    const onCanvasClick = (event: MouseEvent) => {
      // setPixelValue(pixelRef.current);
    };

    const draw = (img: HTMLImageElement) => {
      sourceCanvas2DContext.drawImage(img, 0, 0, img.width / 2, img.height / 2);
      sourceCanvas.addEventListener("mousemove", onCanvasMouseOver);
      sourceCanvas.addEventListener("click", onCanvasClick);
    };

    return () => {
      sourceCanvas.removeEventListener("mouseover", onCanvasMouseOver);
      sourceCanvas.removeEventListener("click", onCanvasClick);
      img.removeEventListener("load", onImageLoad);
    };
  }, []);

  return (
    <VStack>
      <HStack>
        <canvas
          style={{ backgroundColor: "lightblue" }}
          ref={sourceCanvasRef}
          id="canvas"
        ></canvas>
        <canvas
          style={{ backgroundColor: "lightblue" }}
          height={200}
          width={200}
          ref={colorCanvasRef}
          id="pixelated-zoom"
        ></canvas>
      </HStack>
      <HStack>
        <SimpleGrid columns={4}>
          {Array(16)
            .fill(0)
            .map((item, index) => (
              <div key={index} id={`c${index}`} className="nodes"></div>
            ))}
        </SimpleGrid>
      </HStack>
    </VStack>
  );
}

function renderZoomedCanvasAtPositionColor(
  pixelatedContext: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  sourceCanvasImage: HTMLCanvasElement
) {
  const displayedImageWidth = sourceCanvasImage.width;
  const displayedImageHeight = sourceCanvasImage.height;
  //50 and 2500 below results in a 4x4 grid. (50*200)/2500
  const magnifyingAreaLength = 50;
  const outputCanvasAreaLength = 2500;
  const pixelCountSide = (magnifyingAreaLength * 200) / outputCanvasAreaLength;

  const fixedSx = Math.min(sx, displayedImageWidth - magnifyingAreaLength);
  const fixedSy = Math.min(sy, displayedImageHeight - magnifyingAreaLength);

  const sourceContext = sourceCanvasImage.getContext("2d");
  if (!sourceContext) return;

  const imageData = sourceContext.getImageData(
    fixedSx,
    fixedSy,
    pixelCountSide,
    pixelCountSide,
    { colorSpace: "srgb" }
  );

  const colorArray: { r: number; g: number; b: number; a: number }[] = [];

  for (let i = 0; i < imageData.data.length; i += 4) {
    colorArray.push({
      r: imageData.data[i],
      g: imageData.data[i + 1],
      b: imageData.data[i + 2],
      a: imageData.data[i + 3],
    });
  }

  for (const div of document.querySelectorAll<HTMLDivElement>(".nodes")) {
    const colorIndex = parseInt(div.id.split("c")[1]);
    const color = `#${colorArray[colorIndex].r.toString(16)}${colorArray[
      colorIndex
    ].g.toString(16)}${colorArray[colorIndex].b.toString(16)}${colorArray[
      colorIndex
    ].a.toString(16)}`;
    div.style.backgroundColor = color;
    div.innerText = color;
    div.style.padding = "50px";
  }

  // const dimension = {
  //   imageAxisLength: 0,
  //   imageAxisPosition: 0,
  //   fixedImageAxisPosition: 0,
  //   drawLineFunction: drawVerticalLine,
  // };

  // if (axis === "x") {
  //   dimension.imageAxisLength = displayedImageWidth;
  //   dimension.imageAxisPosition = sx;
  //   dimension.fixedImageAxisPosition = fixedSx;
  //   dimension.drawLineFunction = drawVerticalLine;
  // }

  // if (axis === "y") {
  //   dimension.imageAxisLength = displayedImageHeight;
  //   dimension.imageAxisPosition = sy;
  //   dimension.fixedImageAxisPosition = fixedSy;
  //   dimension.drawLineFunction = drawHorizontalLine;
  // }

  pixelatedContext.drawImage(
    sourceCanvasImage,
    fixedSx,
    fixedSy,
    magnifyingAreaLength,
    magnifyingAreaLength,
    0,
    0,
    outputCanvasAreaLength,
    outputCanvasAreaLength
  );

  // const lineStart =
  //   outputCanvasAreaLength *
  //   (dimension.imageAxisPosition / dimension.imageAxisLength);

  // dimension.drawLineFunction(
  //   pixelatedContext,
  //   lineStart,
  //   outputCanvasAreaLength
  // );

  // const actualLine =
  //   dimension.fixedImageAxisPosition +
  //   magnifyingAreaLength *
  //     (dimension.imageAxisPosition / dimension.imageAxisLength);

  // return Math.ceil(actualLine) * 2;
  return 0;
}
