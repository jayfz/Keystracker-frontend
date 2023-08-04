import {
  ActionFunctionArgs,
  matchPath,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import {
  CreateCLIParametersInput,
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

  const initialValues: CreateCLIParametersInput = {
    projectId: project.id,
    leftHandWhiteKeyColor: "#BC5763",
    leftHandBlackKeyColor: "#BC5763",
    rightHandWhiteKeyColor: "#88C356",
    rightHandBlackKeyColor: "#5C9B2A",
    firstOctaveAt: 50,
    octavesLength: 1204,
    numberOfOctaves: 7,
    rawFrameLinesToExtract: 1,
    rawFrameCopyFromLine: 616,
    trackMode: "Keys",
    numberOfFramesToSkip: 5,
    processFramesDivisibleBy: 1,
  };

  async function onSubmit(values: CreateCLIParametersInput) {
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
    validate(values: CreateCLIParametersInput) {
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
