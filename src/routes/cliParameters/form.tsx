import { CreateCLIParametersInput } from "@/models/CLIParameters";
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

export type CLIParametersFormProps = {
  initialValues: FormikConfig<CreateCLIParametersInput>["initialValues"];
  onSubmit: FormikConfig<CreateCLIParametersInput>["onSubmit"];
  validate: FormikConfig<CreateCLIParametersInput>["validate"];
  formIntent: "update" | "create";
};

type DetailInputContextType = {
  displayDetailInput: string;
  setDisplayDetailInput: React.Dispatch<
    React.SetStateAction<keyof CreateCLIParametersInput | "">
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
      keyof CreateCLIParametersInput | ""
    >("");

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
      formikProps: FormikProps<CreateCLIParametersInput>,
      property: keyof CreateCLIParametersInput
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
            {(props: FormikProps<CreateCLIParametersInput>) => (
              <Form>
                <PianoPositionInput
                  name="firstOctaveAt"
                  variant="x"
                  imgURL="http://localhost:8000/public/7/frame-1285.jpg"
                  label="First Octave At"
                />
                {/* <FormControl
                isInvalid={shouldShowFeedbackError(props, "firstOctaveAt")}
              >
                <FormLabel>First octave at</FormLabel>
                <Field
                  as={ChackraInput}
                  type="number"
                  name="firstOctaveAt"
                  onFocus={() => console.log("hey ya")}
                />

                

                <ErrorMessage
                  component={FormErrorMessage}
                  name="firstOctaveAt"
                />
              </FormControl> */}

                <PianoPositionInput
                  name="octavesLength"
                  variant="x"
                  imgURL="http://localhost:8000/public/7/frame-1285.jpg"
                  label="Octaves length"
                />

                {/* <FormControl
                  isInvalid={shouldShowFeedbackError(props, "octavesLength")}
                >
                  <FormLabel>Octaves length</FormLabel>
                  <Field as={ChackraInput} type="number" name="octavesLength" />
                  <ErrorMessage
                    component={FormErrorMessage}
                    name="octavesLength"
                  />
                </FormControl> */}

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
                  imgURL="http://localhost:8000/public/7/frame-1285.jpg"
                  label="Raw frame copy from line"
                />

                {/* <FormControl
                  isInvalid={shouldShowFeedbackError(
                    props,
                    "rawFrameCopyFromLine"
                  )}
                >
                  <FormLabel>Raw frame copy from line</FormLabel>
                  <Field
                    as={ChackraInput}
                    type="number"
                    name="rawFrameCopyFromLine"
                  />
                  <ErrorMessage
                    component={FormErrorMessage}
                    name="rawFrameCopyFromLine"
                  />
                </FormControl> */}

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
                  {/* <FormControl>
                    <FormLabel textAlign={"center"}>
                      Left hand white key color
                    </FormLabel>
                    <Field
                      as={ChackraInput}
                      type="color"
                      name="leftHandWhiteKeyColor"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel textAlign={"center"}>
                      Left hand black key color
                    </FormLabel>
                    <Field
                      as={ChackraInput}
                      type="color"
                      name="leftHandBlackKeyColor"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel textAlign={"center"}>
                      Right hand white key color
                    </FormLabel>
                    <Field
                      as={ChackraInput}
                      type="color"
                      name="rightHandWhiteKeyColor"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel textAlign={"center"}>
                      Right hand black key color
                    </FormLabel>
                    <Field
                      as={ChackraInput}
                      type="color"
                      name="rightHandBlackKeyColor"
                    />
                  </FormControl> */}

                  <PianoKeysColorInput
                    label="Left hand white key color"
                    name="leftHandWhiteKeyColor"
                    imgURL="http://localhost:8000/public/7/frame-1285.jpg"
                  />
                  <PianoKeysColorInput
                    label="Left hand black key color"
                    name="leftHandBlackKeyColor"
                    imgURL="http://localhost:8000/public/7/frame-1285.jpg"
                  />
                  <PianoKeysColorInput
                    label="Right hand white key color"
                    name="rightHandWhiteKeyColor"
                    imgURL="http://localhost:8000/public/7/frame-1285.jpg"
                  />
                  <PianoKeysColorInput
                    label="Right hand black key color"
                    name="rightHandBlackKeyColor"
                    imgURL="http://localhost:8000/public/7/frame-1285.jpg"
                  />
                </VStack>
                {/* {(() => {
                console.log(props);
                props.setValues(")
                return null;
              })()} */}
                <Button
                  /*!props.dirty || */
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
