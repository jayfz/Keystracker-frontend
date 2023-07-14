import styles from "../../components/styles/CreateProjectPage.module.css";

import ProjectService from "../../services/ProjectService";
import { ActionFunctionArgs, redirect, useSubmit } from "react-router-dom";
import Utils from "../../Utilities";

import {
  CreateProjectInputSchema,
  UpdateProjectInput,
  createProjectInput,
} from "../../models/Project";

import ProjectForm from "./form";
import AnimatedPage, { fadeInAnimation } from "@/components/AnimatedPage";

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
      <article className={styles.createProjectPage}>
        <h1>Add a new project</h1>

        <ProjectForm {...createProjectFormProps} formIntent={"create"} />
      </article>
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
