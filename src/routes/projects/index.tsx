import ProjectService from "../../services/ProjectService";
import ListProjects from "../../components/ListProjects";
import { useLoaderData } from "react-router-dom";

export default function ProjectsPage() {
  const projects = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <h1>Keystracker Projects</h1>
      <ListProjects {...projects} />
    </>
  );
}

export async function loader() {
  const projects = await ProjectService.getAllProjects();
  return { projects };
}
