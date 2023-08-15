import { fetchImage } from "@/Utilities";
import {
  Flex,
  HStack,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FieldHookConfig, useField } from "formik";
import { useDetailInputContext } from "@/routes/cliParameters/form";
import { CreateCLIParametersInput } from "@/models/CLIParameters";

type PianoKeysColorInputProps = {
  imgURL: string[];
  label: string;
  name: string;
};

function* getRandomImageGenerator(images: string[]) {
  if (images.length === 0) {
    throw new Error("images string array must not be empty");
  }
  const uniqueIndexes = new Set<number>();

  while (uniqueIndexes.size !== images.length) {
    uniqueIndexes.add(Math.floor(Math.random() * images.length));
  }

  const indexes = Array.from(uniqueIndexes);

  // return function* () {
  let index = 0;
  while (true) {
    yield images[indexes[index]];
    index += 1;

    if (index >= images.length) {
      index = 0;
    }
  }
  // };
}

export function PianoKeysColorInput({
  imgURL,
  ...props
}: PianoKeysColorInputProps) {
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const colorCanvasRef = useRef<HTMLCanvasElement>(null);
  const averageColorRef = useRef<HTMLDivElement>(null);
  const averageColorValueRef = useRef("#000000");
  const [averageColorUI, setaverageColorUI] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { displayDetailInput, setDisplayDetailInput } = useDetailInputContext();
  const imageGenerator = useMemo(
    () => getRandomImageGenerator(imgURL),
    [imgURL]
  );
  const [currentImage, setCurrentImage] = useState(imageGenerator.next().value);

  const [field, meta, helpers] = useField(
    props as unknown as FieldHookConfig<any>
  );

  const { value } = meta;
  const { setValue } = helpers;

  const isInputInValid = Boolean(meta.error && meta.touched);

  useEffect(() => {
    if (displayDetailInput !== props.name) return;
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

    // const imageURL = imageGenerator.next().value;
    if (!currentImage) return;

    const img = fetchImage(currentImage);
    console.log(img);
    img.addEventListener("load", onImageLoad);

    const onCanvasMouseOver = (event: MouseEvent) => {
      const x = event.offsetX;
      const y = event.offsetY;
      averageColorValueRef.current =
        renderZoomedCanvasAtPositionColor(
          colorCanvas2DContext,
          x,
          y,
          sourceCanvas
        ) ?? "#000000";

      setaverageColorUI(averageColorValueRef.current);
    };

    const onCanvasClick = (event: MouseEvent) => {
      setValue(averageColorValueRef.current.toUpperCase());
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
  }, [currentImage, displayDetailInput]);

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

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    if (value === 50) return; //should actually be 0
    if (value === 1204) return; //should actually be 0
    if (value === 616) return; //should actually be 0

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

  return (
    <FormControl isInvalid={isInputInValid}>
      <FormLabel textAlign={"center"}>{props.label}</FormLabel>
      <Input
        type="text"
        {...field}
        {...props}
        variant={"outline"}
        ref={inputRef}
      />
      {displayDetailInput === props.name && (
        <VStack>
          <Button
            onClick={() => setCurrentImage(imageGenerator.next().value)}
            colorScheme="green"
          >
            Load different image
          </Button>
          <canvas
            style={{ backgroundColor: "lightblue" }}
            ref={sourceCanvasRef}
            id="canvas"
          ></canvas>

          <HStack>
            <canvas
              style={{ backgroundColor: "lightblue" }}
              height={200}
              width={200}
              ref={colorCanvasRef}
              id="pixelated-zoom"
            ></canvas>

            <Flex
              ref={averageColorRef}
              width={"200px"}
              height={"200px"}
              id="average-color"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                fontSize={"small"}
                padding={2}
                fontWeight={"bold"}
                color={"gray.600"}
                backgroundColor={"white"}
                borderRadius={"full"}
                fontFamily={"monospace"}
                letterSpacing={"0.1rem"}
                textTransform={"uppercase"}
              >
                {averageColorUI}
              </Text>
            </Flex>
          </HStack>
          {/* <VStack>
          <SimpleGrid columns={4}>
            {Array(16)
              .fill(0)
              .map((item, index) => (
                <div key={index} id={`c${index}`} className="nodes"></div>
              ))}
          </SimpleGrid>
        </VStack> */}
        </VStack>
      )}
    </FormControl>
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

  const sourceContext = sourceCanvasImage.getContext("2d", {
    willReadFrequently: true,
  });
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

  const averageColorDiv =
    document.querySelector<HTMLDivElement>("#average-color");

  for (const div of document.querySelectorAll<HTMLDivElement>(".nodes")) {
    const colorIndex = parseInt(div.id.split("c")[1]);
    const color = colorArray[colorIndex];
    const colorHex = colorToHexadecimal(color);
    div.style.backgroundColor = colorHex;
    div.innerText = colorHex;
    div.style.padding = "50px";
  }

  const averageColorHex = colorToHexadecimal(averageColor(colorArray));
  if (averageColorDiv) {
    averageColorDiv.style.backgroundColor = averageColorHex;
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

  return averageColorHex;
}

type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

function colorToHexadecimal(color: Color) {
  return `#${color.r.toString(16)}${color.g.toString(16)}${color.b.toString(
    16
  )}`;
}

function averageColor(colors: Color[]) {
  const average: Color = {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  };
  for (const color of colors) {
    average.r += color.r;
    average.g += color.g;
    average.b += color.b;
  }

  return {
    r: Math.floor(average.r / colors.length),
    g: Math.floor(average.g / colors.length),
    b: Math.floor(average.b / colors.length),
    a: 0,
  };
}
