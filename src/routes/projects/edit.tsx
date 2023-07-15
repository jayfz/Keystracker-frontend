import { DatabaseIdSchema } from "../../models/common";

import styles from "../../components/styles/CreateProjectPage.module.css";

import ProjectService from "@/services/ProjectService";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import Utils from "../../Utilities";

import {
  Project,
  ProjectWithParameters,
  UpdateProjectInputSchema,
  createProjectInput,
} from "../../models/Project";

import ProjectForm from "./form";
import AnimatedPage, { fadeInAnimation } from "@/components/AnimatedPage";
import ListCLIParameters from "../cliParameters/list";

export default function EditProjectPage() {
  const submit = useSubmit();
  const project = useLoaderData() as ProjectWithParameters;

  async function validate(values: createProjectInput) {
    const project = UpdateProjectInputSchema.safeParse(values);
    return project.success ? {} : Utils.getErrorsFromZod(project.error);
  }

  async function onSubmit(values: createProjectInput) {
    const options = {
      method: "PATCH",
      encType: "application/json",
    } as const;

    //TODO loadash const changedProperties = _.pickBy(afterChange, (value, key) => !_.isEqual(value, beforeChange[key]));

    submit({ project: values }, options);
  }

  const editProjectFormProps = {
    initialValues: {
      id: project.id,
      name: project.name,
      url: project.url,
    },
    onSubmit,
    validate,
  };

  return (
    <AnimatedPage animation={fadeInAnimation}>
      <article className={styles.createProjectPage}>
        <h1>Edit project</h1>
        <ProjectForm {...editProjectFormProps} formIntent={"update"} />
      </article>
      <ListCLIParameters elements={project.cliParameters} />
    </AnimatedPage>
  );
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
