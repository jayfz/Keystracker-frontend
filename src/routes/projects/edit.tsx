import { DatabaseIdSchema } from "@/models/common";

import ProjectService from "@/services/ProjectService";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
  useLocation,
  useSubmit,
  Link as RouterLink,
  useFetcher,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import Utils from "@/Utilities";

import {
  ProjectWithParameters,
  UpdateProjectInputSchema,
  createProjectInput,
} from "../../models/Project";

import ProjectForm from "./form";
import AnimatedPage, { fadeInAnimation } from "@/components/AnimatedPage";
import ListCLIParameters from "../cliParameters/list";
import { useEffect } from "react";
import { Button, Heading, useToast } from "@chakra-ui/react";
import useTitle from "@/hooks/useTitle";

export default function EditProjectPage() {
  const submit = useSubmit();
  const fetcher = useFetcher();
  const project = useLoaderData() as ProjectWithParameters;
  const toast = useToast();

  const location = useLocation();

  async function validate(values: createProjectInput) {
    const project = UpdateProjectInputSchema.safeParse(values);
    return project.success ? {} : Utils.getErrorsFromZod(project.error);
  }

  async function onSubmit(values: createProjectInput, submitProps: any) {
    //TODO loadash const changedProperties = _.pickBy(afterChange, (value, key) => !_.isEqual(value, beforeChange[key]));

    submit(
      { project: values },
      {
        method: "PATCH",
        encType: "application/json",
        state: { updated: true },
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
      id: project.id,
      name: project.name,
      url: project.url,
    },
    onSubmit,
    validate,
  };

  useTitle("Edit project");

  useEffect(() => {
    let toastRef: null | ReturnType<typeof toast> = null;
    if (location.state?.updated) {
      toastRef = toast({
        title: "Project updated.",
        description: "We've updated the project for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      window.history.replaceState({ updated: false }, "");
    }

    if (location.state?._isRedirect) {
      toastRef = toast({
        title: "Project created.",
        description: "We've created the project for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      window.history.replaceState({ _isRedirect: false }, "");
    }

    return () => {
      if (toastRef) {
        toast.close(toastRef);
      }
    };
  }, [location, toast]);

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
  const record = DatabaseIdSchema.parse({ id: params.projectId });
  const service = new ProjectService(request.signal);
  const project = await service.getProjectById(record.id);

  if (!project) {
    throw new Error("project not found");
  }

  return project;
}

export async function action({ params, request }: ActionFunctionArgs) {
  if (request.method === "PATCH") {
    DatabaseIdSchema.parse({ id: params.projectId });
    const project = UpdateProjectInputSchema.parse(
      (await request.json()).project
    );
    const service = new ProjectService(request.signal);
    const updatedProject = await service.updateProject(project);

    if (!updatedProject) throw new Error("Couldn't update project");

    return updatedProject;
  }

  throw new Error("requested action not performed");
}
