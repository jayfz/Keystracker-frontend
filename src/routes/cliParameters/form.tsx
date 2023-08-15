import {
  CreateCLIParametersInput,
  CreateCLIParametersInputForm,
} from "@/models/CLIParameters";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikProps,
} from "formik";

import {
  FormControl,
  FormLabel,
  Input as ChackraInput,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  Button,
  Select,
  SimpleGrid,
  Heading,
  Box,
  VStack,
} from "@chakra-ui/react";

import { createContext, forwardRef, useContext, useState } from "react";
import { useNavigation } from "react-router-dom";
import { PianoPositionInput } from "@/components/PianoPositionInput";
import { PianoKeysColorInput } from "@/components/PianoKeysColorInput";
import { useProject } from "../projects/edit";
import { OctavesLengthInput } from "@/components/OctavesLengthInput";

export type CLIParametersFormProps = {
  initialValues: FormikConfig<CreateCLIParametersInputForm>["initialValues"];
  onSubmit: FormikConfig<CreateCLIParametersInputForm>["onSubmit"];
  validate: FormikConfig<CreateCLIParametersInputForm>["validate"];
  formIntent: "update" | "create";
};

type DetailInputContextType = {
  displayDetailInput: string;
  setDisplayDetailInput: React.Dispatch<
    React.SetStateAction<keyof CreateCLIParametersInputForm | "">
  >;
};

const DetailInputContext = createContext<DetailInputContextType | null>(null);
DetailInputContext.displayName = "DetailInputContext";

export const useDetailInputContext = () => {
  const context = useContext(DetailInputContext);
  if (!context) {
    throw new Error(
      "useListProjectsContext has to be used within <DetailInputContext.Provider>"
    );
  }

  return context;
};

const CLIParametersForm = forwardRef<HTMLElement, CLIParametersFormProps>(
  function CLIParametersForm(CLIParametersFormProps, ref) {
    const navigation = useNavigation();
    const [displayDetailInput, setDisplayDetailInput] = useState<
      keyof CreateCLIParametersInputForm | ""
    >("");

    const project = useProject();

    const thumbnails = project.thumbnails.map((thumbnail) => {
      return `http://localhost:8000/public/${project.id}/${thumbnail}`;
    });

    let submitButtonText =
      CLIParametersFormProps.formIntent === "update"
        ? "Update parameters"
        : "Create parameters";

    if (navigation.state !== "idle") {
      submitButtonText =
        CLIParametersFormProps.formIntent === "update"
          ? "Updating parameters"
          : "Creating parameters";
    }

    const headingText =
      CLIParametersFormProps.formIntent === "update"
        ? "Update parameters"
        : "New parameters";

    function shouldShowFeedbackError(
      formikProps: FormikProps<CreateCLIParametersInputForm>,
      property: keyof CreateCLIParametersInputForm
    ) {
      return (
        Boolean(formikProps.errors[property]) && formikProps.touched[property]
      );
    }

    return (
      <DetailInputContext.Provider
        value={{ displayDetailInput, setDisplayDetailInput }}
      >
        <Box as="article" ref={ref}>
          <Heading fontSize={"2xl"}>{headingText} </Heading>
          <Formik {...CLIParametersFormProps}>
            {(props: FormikProps<CreateCLIParametersInputForm>) => (
              <Form>
                <PianoPositionInput
                  name="firstOctaveAt"
                  variant="x"
                  imgURL={thumbnails[0]}
                  label="First Octave At"
                />

                <PianoPositionInput
                  name="lastOctaveAt"
                  variant="x"
                  imgURL={thumbnails[0]}
                  label="Last Octave at"
                />

                <OctavesLengthInput
                  name="octavesLength"
                  label="Octaves length"
                />

                <FormControl
                  isInvalid={shouldShowFeedbackError(props, "numberOfOctaves")}
                >
                  <FormLabel>Number of octaves</FormLabel>
                  <Field
                    as={ChackraInput}
                    type="number"
                    name="numberOfOctaves"
                  />
                  <ErrorMessage
                    component={FormErrorMessage}
                    name="numberOfOctaves"
                  />
                </FormControl>

                <FormControl
                  isInvalid={shouldShowFeedbackError(props, "trackMode")}
                >
                  <FormLabel> Track mode</FormLabel>
                  <Field as={Select} name="trackMode">
                    <option value="FallingNotes">Falling notes</option>
                    <option value="Keys">Keys</option>
                  </Field>
                </FormControl>

                <FormControl
                  isInvalid={shouldShowFeedbackError(
                    props,
                    "rawFrameLinesToExtract"
                  )}
                >
                  <FormLabel>Raw frame lines to extract</FormLabel>
                  <Field
                    as={ChackraInput}
                    type="number"
                    name="rawFrameLinesToExtract"
                  />
                  <ErrorMessage
                    component={FormErrorMessage}
                    name="rawFrameLinesToExtract"
                  />
                </FormControl>

                <PianoPositionInput
                  name="rawFrameCopyFromLine"
                  variant="y"
                  imgURL={thumbnails[0]}
                  label="Raw frame copy from line"
                />

                <FormControl
                  isInvalid={shouldShowFeedbackError(
                    props,
                    "numberOfFramesToSkip"
                  )}
                >
                  <FormLabel>Number of frames to skip</FormLabel>
                  <Field
                    as={ChackraInput}
                    type="number"
                    name="numberOfFramesToSkip"
                  />
                  <ErrorMessage
                    component={FormErrorMessage}
                    name="numberOfFramesToSkip"
                  />
                </FormControl>

                <FormControl
                  isInvalid={shouldShowFeedbackError(
                    props,
                    "processFramesDivisibleBy"
                  )}
                >
                  <FormLabel>Process frames divisible by</FormLabel>
                  <Field
                    as={ChackraInput}
                    type="number"
                    name="processFramesDivisibleBy"
                  />
                  <ErrorMessage
                    component={FormErrorMessage}
                    name="processFramesDivisibleBy"
                  />
                </FormControl>
                <VStack>
                  <PianoKeysColorInput
                    label="Left hand white key color"
                    name="leftHandWhiteKeyColor"
                    imgURL={thumbnails}
                  />
                  <PianoKeysColorInput
                    label="Left hand black key color"
                    name="leftHandBlackKeyColor"
                    imgURL={thumbnails}
                  />
                  <PianoKeysColorInput
                    label="Right hand white key color"
                    name="rightHandWhiteKeyColor"
                    imgURL={thumbnails}
                  />
                  <PianoKeysColorInput
                    label="Right hand black key color"
                    name="rightHandBlackKeyColor"
                    imgURL={thumbnails}
                  />
                </VStack>

                <Button
                  isDisabled={!props.isValid || navigation.state !== "idle"}
                  isLoading={props.isSubmitting}
                  type="submit"
                  colorScheme="blue"
                >
                  {submitButtonText}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </DetailInputContext.Provider>
    );
  }
);

export default CLIParametersForm;

export function ChackraNumberInput() {
  return (
    <NumberInput>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}
