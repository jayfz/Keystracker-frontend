import ProjectService from "@/services/ProjectService";
import { ActionFunctionArgs, redirect, useSubmit } from "react-router-dom";
import Utils from "@/Utilities";

import {
  CreateProjectInputSchema,
  UpdateProjectInput,
  createProjectInput,
} from "@/models/Project";

import ProjectForm from "./form";
import AnimatedPage, { fadeInAnimation } from "@/components/AnimatedPage";
import { Heading } from "@chakra-ui/react";

export default function CreateProjectPage() {
  const submit = useSubmit();

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
    } as const;

    submit({ project: values }, options);
  }

  const createProjectFormProps = {
    initialValues,
    onSubmit,
    validate,
  };

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
