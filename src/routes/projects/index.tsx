import ProjectService from "../../services/ProjectService";
import ListProjects from "../../components/ListProjects";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { DatabaseIdSchema } from "../../models/common";

export default function ProjectsPage() {
  const projects = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <h1>Keystracker Projects</h1>
      <ListProjects {...projects} />
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const projects = await new ProjectService(request.signal).getAllProjects();
  return { projects };
}

export async function action({ request, params }: ActionFunctionArgs) {
  console.log(request, params);
  if (request.method === "DELETE" && params.projectId) {
    const { id } = DatabaseIdSchema.parse({ id: params.projectId });
    return await new ProjectService(request.signal).deleteProject(id);
  }
}
