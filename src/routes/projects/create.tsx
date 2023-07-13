import { useState, useCallback } from "react";
import styles from "../../components/styles/CreateProjectPage.module.css";
import ProjectService from "../../services/ProjectService";
import CLIParametersService from "../../services/CLIParametersService";

import {
  CreateProjectInputSchema,
  Project,
  createProjectInput,
} from "../../models/Project";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import {
  createCLIParametersInput,
  createCLIParametersInputSchema,
} from "../../models/CLIParameters";
import { ZodError } from "zod";
import {
  ActionFunctionArgs,
  useActionData,
  useBeforeUnload,
  useFetcher,
  useRevalidator,
  useSubmit,
} from "react-router-dom";

function getErrorsFromZod(parsedResult: ZodError) {
  const flattenedErrors = parsedResult.flatten().fieldErrors;

  const errors: any = {};
  for (const key in flattenedErrors) {
    errors[key] =
      flattenedErrors[key as keyof typeof flattenedErrors]?.join(", also ");
  }

  return errors;
}

export default function CreateProjectPage() {
  // const [projectId, setProjectId] = useState<number>(0);

  const revalidator = useRevalidator();
  console.log("revalidator state", revalidator.state);
  const submit = useSubmit();
  const project: Project | null = (useActionData() as Project) || null;
  console.log("current project", project);

  // function slow() {
  //   for (let number = 0; number < 50_000_000; number++) {
  //     res += Math.sqrt(number) * Math.random();
  //   }
  //   return res;
  // }

  const allowEditing = project !== null;
  const mutationIntent = allowEditing ? "PATCH" : "POST";

  useBeforeUnload(
    useCallback(
      (event) => {
        if (project) {
          event.preventDefault();
          localStorage.setItem("id", JSON.stringify(project.id));
          return (event.returnValue = "");
        }
      },
      [project]
    )
  );

  const createProjectInitialValues: createProjectInput = {
    name: "",
    url: "",
  };

  const createProjectFormProps = {
    initialValues: createProjectInitialValues,
    async onSubmit(values: createProjectInput) {
      const projectToSubmit =
        mutationIntent === "PATCH"
          ? { id: project.id, name: values.name }
          : values;
      submit(
        { project: projectToSubmit },
        {
          method: mutationIntent,
          encType: "application/json",
          action: "/projects",
        }
      );
    },
    validate(values: createProjectInput) {
      const parsedProjectInput = CreateProjectInputSchema.safeParse(values);
      return parsedProjectInput.success
        ? {}
        : getErrorsFromZod(parsedProjectInput.error);
    },
  };

  let step2 = <></>;

  if (project) {
    const createCLIParametersInitialValues: createCLIParametersInput = {
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

    const createCLIParamtersForProjectFormProps = {
      initialValues: createCLIParametersInitialValues,
      async onSubmit(values: createCLIParametersInput) {
        const cliParameters = createCLIParametersInputSchema.parse(values);
        const result = await CLIParametersService.createCLIParameters(
          cliParameters
        );
        if (!result) {
          //report error!
        }
      },
      validate(values: createCLIParametersInput) {
        const parsedCLIParametersInput =
          createCLIParametersInputSchema.safeParse(values);
        if (parsedCLIParametersInput.success) return {};
        return getErrorsFromZod(parsedCLIParametersInput.error);
      },
    };

    step2 = (
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
              <Field
                type="number"
                id="numberOfOctaves"
                name="numberOfOctaves"
              />

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

              <label htmlFor="numberOfFramesToSkip">
                Skip these many frames
              </label>
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

  return (
    <article className={styles.createProjectPage}>
      <h1>Add a new project</h1>

      <h2>Step 1</h2>
      <Formik {...createProjectFormProps}>
        {(props: FormikProps<createProjectInput>) => (
          <Form>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.validationError}
            />

            <label htmlFor="url">URL</label>
            <Field type="url" id="url" name="url" disabled={allowEditing} />
            <ErrorMessage
              name="url"
              component="span"
              className={styles.validationError}
            />

            <Field type="submit" value="Continue" id="submit" />
          </Form>
        )}
      </Formik>
      {/* {slow()} */}
      {project !== null && step2}
    </article>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const { project } = await request.json();
  const service = new ProjectService(request.signal);

  let mutadedProject: Project | null = null;
  let intent = "";
  if (request.method === "POST") {
    mutadedProject = await service.createProject(project);
    intent = "create";
  }

  if (request.method === "PATCH") {
    mutadedProject = await service.updateProject(project);
    intent = "update";
  }

  if (!mutadedProject)
    throw new Error(`the ${intent} project action could not be performed`);

  return mutadedProject;
}
