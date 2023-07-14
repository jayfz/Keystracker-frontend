import { useLoaderData, useSubmit } from "react-router-dom";
import {
  createCLIParametersInput,
  createCLIParametersInputSchema,
} from "../../models/CLIParameters";
import { ProjectWithParameters } from "../../models/Project";
import Utilities from "../../Utilities";

import { Formik, Field, Form, FormikProps } from "formik";

export function CreateCLIParametersPage() {}

export function EditCLIParametersPage() {}

function CLIParametersForm() {
  const submit = useSubmit();
  const project = useLoaderData() as ProjectWithParameters;

  const initialValues: createCLIParametersInput = {
    projectId: project.id,
    inputVideoFilename: "",
    leftHandWhiteKeyColor: "#000000",
    leftHandBlackKeyColor: "#000000",
    rightHandWhiteKeyColor: "#000000",
    rightHandBlackKeyColor: "#000000",
    firstOctaveAt: 0,
    octavesLength: 0,
    numberOfOctaves: 0,
    rawFrameLinesToExtract: 0,
    rawFrameCopyFromLine: 0,
    trackMode: "Keys",
    numberOfFramesToSkip: 0,
    processFramesDivisibleBy: 1,
    outFileName: "out.mid",
  };

  async function onSubmit(values: createCLIParametersInput) {
    const cliParameters = createCLIParametersInputSchema.parse(values);
    submit(
      { cliParameters },
      {
        method: "POST",
        encType: "application/json",
      }
    );
  }

  const createCLIParamtersForProjectFormProps = {
    initialValues,
    onSubmit,
    validate(values: createCLIParametersInput) {
      const parsedCLIParametersInput =
        createCLIParametersInputSchema.safeParse(values);
      if (parsedCLIParametersInput.success) return {};
      return Utilities.getErrorsFromZod(parsedCLIParametersInput.error);
    },
  };

  return (
    <section>
      <h2>Step 2</h2>
      <Formik {...createCLIParamtersForProjectFormProps}>
        {(props: FormikProps<createCLIParametersInput>) => (
          <Form>
            <label htmlFor="firstOctaveAt">First octave at</label>
            <Field type="number" id="firstOctaveAt" name="firstOctaveAt" />

            <label htmlFor="octavesLength">Octaves length</label>
            <Field type="number" id="octavesLength" name="octavesLength" />

            <label htmlFor="numberOfOctaves">Number of octaves</label>
            <Field type="number" id="numberOfOctaves" name="numberOfOctaves" />

            <label htmlFor="rawFrameLinesToExtract">
              Lines to extract from raw frame
            </label>
            <Field
              type="number"
              id="rawFrameLinesToExtract"
              name="rawFrameLinesToExtract"
            />

            <label htmlFor="rawFrameCopyFromLine">
              Start copy from raw frame line
            </label>
            <Field
              type="number"
              id="rawFrameCopyFromLine"
              name="rawFrameCopyFromLine"
            />

            <label htmlFor="trackMode">Track mode</label>
            <Field as="select" id="trackMode" name="trackMode">
              <option value="Keys">Falling notes</option>
              <option value="Keys">Keys</option>
            </Field>

            <label htmlFor="numberOfFramesToSkip">Skip these many frames</label>
            <Field
              type="number"
              id="numberOfFramesToSkip"
              name="numberOfFramesToSkip"
            />

            <label htmlFor="processFramesDivisibleBy">
              Process frames divisible by
            </label>
            <Field
              type="number"
              id="processFramesDivisibleBy"
              name="processFramesDivisibleBy"
            />

            <label htmlFor="leftHandWhiteKeyColor">
              Left hand white key color
            </label>
            <Field
              type="color"
              id="leftHandWhiteKeyColor"
              name="leftHandWhiteKeyColor"
            />

            <label htmlFor="leftHandBlackKeyColor">
              Left hand black key color
            </label>
            <Field
              type="color"
              id="leftHandBlackKeyColor"
              name="leftHandBlackKeyColor"
            />

            <label htmlFor="rightHandWhiteKeyColor">
              Right hand white key color
            </label>
            <Field
              type="color"
              id="rightHandWhiteKeyColor"
              name="rightHandWhiteKeyColor"
            />

            <label htmlFor="rightHandBlackKeyColor">
              Right hand black key color
            </label>
            <Field
              type="color"
              id="rightHandBlackKeyColor"
              name="rightHandBlackKeyColor"
            />
            <Field type="submit" value="Process" id="submit" />
          </Form>
        )}
      </Formik>
    </section>
  );
}
