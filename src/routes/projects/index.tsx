import ProjectService from "@/services/ProjectService";
import ListProjects, { ListProjectsSkeleton } from "@/components/ListProjects";
import {
  ActionFunctionArgs,
  Await,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { DatabaseIdSchema } from "@/models/common";
import AnimatedPage, { fadeInAnimation } from "@/components/AnimatedPage";
import { Heading } from "@chakra-ui/react";
import useTitle from "@/hooks/useTitle";
import React from "react";
import { defer } from "react-router-dom";
import { Project } from "@/models/Project";

export default function ProjectsPage() {
  const data = useLoaderData() as { projects: Project[] }; //as Awaited<ReturnType<typeof loader>>;

  useTitle("Projects");
  return (
    <AnimatedPage animation={fadeInAnimation}>
      <Heading as="h1">Keystracker Projects</Heading>
      <React.Suspense fallback={<ListProjectsSkeleton />}>
        <Await resolve={data.projects}>
          <ListProjects />
        </Await>
      </React.Suspense>
    </AnimatedPage>
  );
}

export function loader({ request }: LoaderFunctionArgs) {
  const projectsPromise = new ProjectService(request.signal).getAllProjects();

  return defer({ projects: projectsPromise });
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (request.method === "DELETE" && params.projectId) {
    const { id } = DatabaseIdSchema.parse({ id: params.projectId });
    return await new ProjectService(request.signal).deleteProject(id);
  }
}
