import ProjectService from "@/services/ProjectService";
import {
  ActionFunctionArgs,
  redirect,
  useMatch,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import Utils from "@/Utilities";

import { matchPath } from "react-router-dom";

import {
  CreateProjectInputSchema,
  UpdateProjectInput,
  createProjectInput,
} from "@/models/Project";

import ProjectForm from "./form";
import AnimatedPage, { fadeInAnimation } from "@/components/AnimatedPage";
import { Heading, useToast } from "@chakra-ui/react";
import useTitle from "@/hooks/useTitle";
import { useEffect } from "react";

export default function CreateProjectPage() {
  const navigation = useNavigation();
  const submit = useSubmit();
  const toast = useToast();

  const initialValues = {
    name: "",
    url: "",
  };

  async function validate(values: createProjectInput | UpdateProjectInput) {
    const project = CreateProjectInputSchema.safeParse(values);
    return project.success ? {} : Utils.getErrorsFromZod(project.error);
  }

  async function onSubmit(values: createProjectInput) {
    const options = {
      method: "POST",
      encType: "application/json",
      state: { created: true },
      replace: true,
    } as const;

    submit({ project: values }, options);
  }

  const createProjectFormProps = {
    initialValues,
    onSubmit,
    validate,
  };

  useTitle("Create project");

  useEffect(() => {
    const result = matchPath(
      "/projects/:id/edit",
      navigation.location?.pathname ?? ""
    );
    if (navigation.state === "loading" && result) {
      toast({
        title: "Project created.",
        description: "We've updated the project for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [navigation.state, toast, navigation.location?.pathname]);

  return (
    <AnimatedPage animation={fadeInAnimation}>
      <Heading>Add a new project</Heading>

      <ProjectForm {...createProjectFormProps} formIntent={"create"} />
    </AnimatedPage>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const { project } = await request.json();
  const service = new ProjectService(request.signal);
  const createdObject = await service.createProject(project);
  if (!createdObject) throw new Error(`the project could not be created`);
  return redirect(`/projects/${createdObject.id}/edit`);
}
