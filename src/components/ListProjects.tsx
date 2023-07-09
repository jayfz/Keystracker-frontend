import { useEffect, useState } from "react";
import { Project } from "../models/Project";
import { ProjectCard } from "./ProjectCard";
import { CreateProjectCard } from "./CreateProjectCard";
import ProjectService from "../services/ProjectService";
import { ListProjectsContext } from "../context/ListProjectsContext";

import styles from "./styles/ListProjects.module.css";

export default function ListProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [refreshList, setRefreshList] = useState<boolean>(false);

  const triggerRefreshList = () => {
    setRefreshList((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      const projectList = await ProjectService.getAllProjects();
      setProjects(projectList);
    })();
  }, [refreshList]);

  return (
    <ListProjectsContext.Provider value={{ triggerRefreshList }}>
      <ul className={styles["grid-layout"]}>
        {projects.map((p) => (
          <li key={p.id}>
            <ProjectCard project={p} />
          </li>
        ))}
        <li>
          <CreateProjectCard />
        </li>
      </ul>
    </ListProjectsContext.Provider>
  );
}
