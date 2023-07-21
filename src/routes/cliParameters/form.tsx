import { createCLIParametersInput } from "@/models/CLIParameters";
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
  VStack,
  Select,
  HStack,
  SimpleGrid,
  Heading,
  Box,
} from "@chakra-ui/react";

export type CLIParametersFormProps = {
  initialValues: FormikConfig<createCLIParametersInput>["initialValues"];
  onSubmit: FormikConfig<createCLIParametersInput>["onSubmit"];
  validate: FormikConfig<createCLIParametersInput>["validate"];
  formIntent: "update" | "create";
};

export function CLIParametersForm(
  CLIParametersFormProps: CLIParametersFormProps
) {
  const submitButtonText =
    CLIParametersFormProps.formIntent === "update"
      ? "Update parameters"
      : "Create parameters";

  return (
    <Box as="article">
      <Heading fontSize={"2xl"}>New parameters: </Heading>
      <Formik {...CLIParametersFormProps}>
        {(props: FormikProps<createCLIParametersInput>) => (
          <Form>
            <FormControl isInvalid={Boolean(props.errors.firstOctaveAt)}>
              <FormLabel>First octave at</FormLabel>
              <Field as={ChackraInput} type="number" name="firstOctaveAt" />

              <ErrorMessage component={FormErrorMessage} name="firstOctaveAt" />
            </FormControl>

            <FormControl isInvalid={Boolean(props.errors.octavesLength)}>
              <FormLabel>Octaves length</FormLabel>
              <Field as={ChackraInput} type="number" name="octavesLength" />
              <ErrorMessage component={FormErrorMessage} name="octavesLength" />
            </FormControl>

            <FormControl isInvalid={Boolean(props.errors.numberOfOctaves)}>
              <FormLabel>Number of octaves</FormLabel>
              <Field as={ChackraInput} type="number" name="numberOfOctaves" />
              <ErrorMessage
                component={FormErrorMessage}
                name="numberOfOctaves"
              />
            </FormControl>

            <FormControl
              isInvalid={Boolean(props.errors.rawFrameLinesToExtract)}
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

            <FormControl isInvalid={Boolean(props.errors.rawFrameCopyFromLine)}>
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
            </FormControl>

            <FormControl isInvalid={Boolean(props.errors.trackMode)}>
              <FormLabel> Track mode</FormLabel>
              <Field as={Select} name="trackMode">
                <option value="FallingNotes">Falling notes</option>
                <option value="Keys">Keys</option>
              </Field>
            </FormControl>

            <FormControl isInvalid={Boolean(props.errors.numberOfFramesToSkip)}>
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
              isInvalid={Boolean(props.errors.processFramesDivisibleBy)}
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
            <SimpleGrid columns={[1, 2]}>
              <FormControl>
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
              </FormControl>
            </SimpleGrid>
            <Button
              isDisabled={!props.dirty || !props.isValid}
              isLoading={props.isSubmitting}
              type="submit"
              colorScheme="blue"
            >
              {submitButtonText}
            </Button>
            {/* <Field type="submit" value="Process" id="submit" /> */}
          </Form>
        )}
      </Formik>
    </Box>
  );
}

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
