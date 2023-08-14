import { ZDatabaseId } from "@/models/common";

import ProjectService from "@/services/ProjectService";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
  useSubmit,
  Link as RouterLink,
  useFetcher,
  Outlet,
  useOutletContext,
  useNavigation,
  redirect,
} from "react-router-dom";
import Utils from "@/Utilities";

import {
  ProjectWithParameters,
  UpdateProjectInputSchema,
  CreateProjectInput,
} from "../../models/Project";

import ProjectForm from "./form";
import AnimatedPage, { fadeInAnimation } from "@/components/AnimatedPage";
import ListCLIParameters from "../cliParameters/list";
import { useEffect } from "react";
import { Button, Heading, useToast } from "@chakra-ui/react";
import useTitle from "@/hooks/useTitle";
import { matchPath } from "react-router-dom";
import CLIParametersService from "@/services/CLIParametersService";

export default function EditProjectPage() {
  const navigation = useNavigation();
  const submit = useSubmit();
  const fetcher = useFetcher();
  const project = useLoaderData() as ProjectWithParameters;
  const toast = useToast();

  async function validate(values: CreateProjectInput) {
    const project = UpdateProjectInputSchema.strip().safeParse(values);
    return project.success ? {} : Utils.getErrorsFromZod(project.error);
  }

  async function onSubmit(values: CreateProjectInput, submitProps: any) {
    //TODO loadash const changedProperties = _.pickBy(afterChange, (value, key) => !_.isEqual(value, beforeChange[key]));

    const projectToUpdate = UpdateProjectInputSchema.strip().parse(values);

    submit(
      { project: projectToUpdate },
      {
        method: "PATCH",
        encType: "application/json",
        replace: true,
      }
    );

    submitProps.resetForm({ values });
  }

  const onElementRemove = (id: number) => {
    fetcher.submit(null, {
      method: "DELETE",
      action: `cli-parameters/${id}`,
    });
  };

  const editProjectFormProps = {
    initialValues: {
      // id: project.id,
      name: project.name,
      url: project.url,
    },
    onSubmit,
    validate,
  };

  useTitle("Edit project");

  useEffect(() => {
    const match = matchPath(
      "/projects/:id/edit",
      navigation.location?.pathname ?? ""
    );
    if (navigation.state === "loading" && match && fetcher.state === "idle") {
      toast({
        title: "Project updated.",
        description: "We've updated the project for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

    if (fetcher.state === "loading" && fetcher.formMethod === "DELETE") {
      toast({
        title: "Cli parameter deleted.",
        description: "We've deleted the cli parameter set for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [navigation.state, toast, navigation.location?.pathname, fetcher]);

  return (
    <AnimatedPage animation={fadeInAnimation}>
      <Heading>Edit project</Heading>
      <ProjectForm {...editProjectFormProps} formIntent={"update"} />
      <Heading fontSize={"2xl"}>
        Project's set of parameters.{" "}
        <Button to="cli-parameters/create" as={RouterLink}>
          Create a new one
        </Button>
      </Heading>

      <ListCLIParameters
        elements={project.cliParameters}
        onElementRemove={onElementRemove}
      />
      <Outlet context={project satisfies ProjectWithParameters} />
    </AnimatedPage>
  );
}

export function useProject() {
  return useOutletContext<ProjectWithParameters>();
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const id = ZDatabaseId.parse(params.projectId);
  const service = new ProjectService(request.signal);
  const project = await service.getProjectById(id);

  if (!project) {
    throw new Error("project not found");
  }

  return project;
}

export async function action({ params, request }: ActionFunctionArgs) {
  if (request.method === "PATCH") {
    const id = ZDatabaseId.parse(params.projectId);
    const project = (await request.json()).project;
    const service = new ProjectService(request.signal);
    const updatedProject = await service.updateProject(id, project);

    if (!updatedProject) throw new Error("Couldn't update project");

    return updatedProject;
  }

  throw new Error("requested action not performed");
}

export async function removeAction({ params, request }: ActionFunctionArgs) {
  if (request.method === "DELETE") {
    const id = ZDatabaseId.parse(params.parameterId);
    const service = new CLIParametersService(request.signal);
    const result = await service.deleteCLIParameters(id);
    if (!result) {
      throw new Error("could not delete parameter");
    }

    return redirect("../");
  }
}
