import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  matchPath,
  redirect,
  useActionData,
  useLocation,
  useMatches,
  useNavigation,
  useParams,
  useResolvedPath,
  useSubmit,
} from "react-router-dom";
import {
  CLIParameters,
  UpdateCLIParametersInputSchema,
  createCLIParametersInput,
} from "../../models/CLIParameters";
import Utilities from "@/Utilities";

// import { CLIParametersForm } from "./form";
import useTitle from "@/hooks/useTitle";
import CLIParametersService from "@/services/CLIParametersService";
import { useProject } from "../projects/edit";
import { DatabaseIdSchema } from "@/models/common";
import { useEffect, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import CLIParametersForm from "./form";
// import _omit from "lodash/omit";

export function EditLIParametersForm() {
  const submit = useSubmit();
  const project = useProject();
  const { parameterId } = useParams();
  const toast = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const data = useActionData();
  console.log("useactiondata", data);

  useTitle(`${document.title} - Edit parameters`);

  useEffect(() => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  });

  useEffect(() => {
    if (location.state?.updatedParameters) {
      toast({
        title: "Parameters updated.",
        description: "We've updated the Parameters for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // location.state.updatedParameters = false;
    }
  }, [location, toast]);

  const cliIdParsing = DatabaseIdSchema.safeParse({ id: parameterId });

  if (!cliIdParsing.success) {
    console.log("CLI Id parsing errored", cliIdParsing);
    return;
  }

  async function onSubmit(values: createCLIParametersInput) {
    const cliParameters = UpdateCLIParametersInputSchema.parse(values);
    submit(
      { cliParameters },
      {
        method: "PATCH",
        encType: "application/json",
        state: { updatedParameters: true },
        replace: true,
      }
    );
  }

  function validate(values: createCLIParametersInput) {
    const parsedCLIParametersInput =
      UpdateCLIParametersInputSchema.safeParse(values);
    if (parsedCLIParametersInput.success) return {};
    return Utilities.getErrorsFromZod(parsedCLIParametersInput.error);
  }

  const parameter = project.cliParameters.find(
    (p) => p.id == cliIdParsing.data.id
  );

  if (!parameter) {
    console.log("no parameter found with id", parameter);
    return;
  }

  const { createdAt, updatedAt, ...initialValues } = parameter;
  return (
    <CLIParametersForm
      ref={formRef}
      key={initialValues.id}
      formIntent="update"
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    />
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const { cliParameters } = await request.json();
  const service = new CLIParametersService(request.signal);
  const updatedObject = await service.updateCLIParameters(cliParameters);
  if (!updatedObject) throw new Error("could not update CLI parameter");
  return updatedObject;
}
