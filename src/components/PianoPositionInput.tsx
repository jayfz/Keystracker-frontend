import { CreateCLIParametersInput } from "@/models/CLIParameters";
import { useDetailInputContext } from "@/routes/cliParameters/form";
import {
  HStack,
  Box,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { ErrorMessage, Field, FieldHookConfig, useField } from "formik";
import { useEffect, useRef, useState } from "react";

interface PianoPositionInputProps {
  imgURL: string;
  variant: "x" | "y";
  label: string;
  name: string;
}

export function PianoPositionInput({
  imgURL,
  ...props
}: PianoPositionInputProps) {
  const sourceImageCanvasRef = useRef<HTMLCanvasElement>(null);
  const pixelatedZoomRef = useRef<HTMLCanvasElement>(null);
  const pixelRef = useRef(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const { displayDetailInput, setDisplayDetailInput } = useDetailInputContext();

  const [field, meta, helpers] = useField(
    props as unknown as FieldHookConfig<any>
  );

  const { value } = meta;
  const { setValue } = helpers;

  const isInputInValid = Boolean(meta.error && meta.touched);

  useEffect(() => {
    if (!displayDetailInput) return;

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

    const img = fetchImage(imgURL);

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
      setValue(pixelRef.current);
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
  }, [displayDetailInput]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    if (value === 50) return; //should actually be 0

    input.animate(
      [
        {
          backgroundColor: "#FFFFFF",
          offset: 0,
        },
        {
          backgroundColor: "#ACCCEB90",
          offset: 0.1,
        },
        {
          backgroundColor: "#FFFFFF",
          offset: 1.0,
        },
      ],
      1000
    );
  }, [value]);

  useEffect(() => {
    const onFocus = () =>
      setDisplayDetailInput(props.name as keyof CreateCLIParametersInput);

    const input = inputRef.current;

    if (input) {
      input.addEventListener("focus", onFocus);
    }

    return () => {
      if (input) {
        input.removeEventListener("focus", onFocus);
      }
    };
  }, []);
  return (
    <FormControl isInvalid={isInputInValid}>
      <FormLabel>{props.label}</FormLabel>
      <Input
        type="number"
        {...field}
        {...props}
        variant={"outline"}
        ref={inputRef}
      />

      {displayDetailInput === props.name && (
        <>
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
        </>
      )}

      {isInputInValid ? (
        <FormErrorMessage>{meta.error} </FormErrorMessage>
      ) : null}
    </FormControl>
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

function fetchImage(url: string) {
  const img = new Image();
  img.addEventListener("error", () => console.log("error loading image"));
  img.crossOrigin = "anonymous";
  img.src = url;
  return img;
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
