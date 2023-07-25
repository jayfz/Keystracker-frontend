import {
  ActionFunctionArgs,
  redirect,
  useLoaderData,
  useOutletContext,
  useSubmit,
} from "react-router-dom";
import {
  createCLIParametersInput,
  createCLIParametersInputSchema,
} from "../../models/CLIParameters";
import { ProjectWithParameters } from "../../models/Project";
import Utilities from "../../Utilities";

import { Formik, Field, Form, FormikProps } from "formik";
import { CLIParametersForm } from "./form";
import { useProject } from "../projects/edit";
import useTitle from "@/hooks/useTitle";
import CLIParametersService from "@/services/CLIParametersService";

export function CreateCLIParametersForm() {
  const submit = useSubmit();
  const project = useProject();

  const initialValues: createCLIParametersInput = {
    projectId: project.id,
    inputVideoFilename: "input.mkv",
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
    formIntent: "create" as const,
    initialValues,
    onSubmit,
    validate(values: createCLIParametersInput) {
      const parsedCLIParametersInput =
        createCLIParametersInputSchema.safeParse(values);
      if (parsedCLIParametersInput.success) return {};
      return Utilities.getErrorsFromZod(parsedCLIParametersInput.error);
    },
  };

  useTitle(`${document.title} - Create parameters`);

  return <CLIParametersForm {...createCLIParamtersForProjectFormProps} />;
}

export async function action({ request }: ActionFunctionArgs) {
  const { cliParameters } = await request.json();
  const service = new CLIParametersService(request.signal);
  const createdObject = await service.createCLIParameters(cliParameters);
  // if (!createdObject) throw new Error(`CLI parameters could not be created`);
  return redirect(`/projects/${cliParameters.projectId}/edit`);
}
