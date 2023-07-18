import ProjectService from "@/services/ProjectService";
import ListProjects from "@/components/ListProjects";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { DatabaseIdSchema } from "@/models/common";
import AnimatedPage, { fadeInAnimation } from "@/components/AnimatedPage";
import { Heading } from "@chakra-ui/react";

export default function ProjectsPage() {
  const projects = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <AnimatedPage animation={fadeInAnimation}>
      <Heading as="h1">Keystracker Projects</Heading>
      <ListProjects projects={projects} />
    </AnimatedPage>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const projects = await new ProjectService(request.signal).getAllProjects();
  return projects;
}

export async function action({ request, params }: ActionFunctionArgs) {
  console.log(request, params);
  if (request.method === "DELETE" && params.projectId) {
    const { id } = DatabaseIdSchema.parse({ id: params.projectId });
    return await new ProjectService(request.signal).deleteProject(id);
  }
}
