import {
  ActionFunctionArgs,
  matchPath,
  redirect,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "react-router-dom";
import {
  createCLIParametersInput,
  createCLIParametersInputSchema,
} from "../../models/CLIParameters";
import Utilities from "../../Utilities";

// import { CLIParametersForm } from "./form";
import { useProject } from "../projects/edit";
import useTitle from "@/hooks/useTitle";
import CLIParametersService from "@/services/CLIParametersService";
import { useEffect } from "react";

import { useToast } from "@chakra-ui/react";
import CLIParametersForm from "./form";

export function CreateCLIParametersForm() {
  const submit = useSubmit();
  const project = useProject();
  const navigation = useNavigation();
  const toast = useToast();

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

  useEffect(() => {
    const result = matchPath(
      "/projects/:id/edit/cli-parameters/:parameterId/edit",
      navigation.location?.pathname ?? ""
    );
    if (navigation.state === "loading" && result) {
      toast({
        title: "CLI parameters created.",
        description: "We've created the CLI parameters for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [navigation.state, toast, navigation.location?.pathname]);

  return <CLIParametersForm {...createCLIParamtersForProjectFormProps} />;
}

export async function action({ request }: ActionFunctionArgs) {
  const { cliParameters } = await request.json();
  const service = new CLIParametersService(request.signal);
  const createdObject = await service.createCLIParameters(cliParameters);
  if (!createdObject) throw new Error(`CLI parameters could not be created`);
  return redirect(
    `/projects/${cliParameters.projectId}/edit/cli-parameters/${createdObject.id}/edit`
  );
}
