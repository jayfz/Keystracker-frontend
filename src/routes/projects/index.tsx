import ProjectService from "../../services/ProjectService";
import ListProjects from "../../components/ListProjects";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";

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
  if (request.method === "DELETE" && params.projectId) {
    const id = parseInt(params.projectId);

    if (isNaN(id)) {
      throw new Error("invalid id to remove");
    }
    return await new ProjectService(request.signal).deleteProject(id);
  }
}
