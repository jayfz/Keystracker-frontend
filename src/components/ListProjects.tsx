import { useState } from "react";
import { Project } from "../models/Project";
import { ProjectCard } from "./ProjectCard";
import { CreateProjectCard } from "./CreateProjectCard";
import { ListProjectsContext } from "../context/ListProjectsContext";

import styles from "./styles/ListProjects.module.css";

type ListProjectsProps = {
  projects: Project[];
};
export default function ListProjects(props: ListProjectsProps) {
  // const [projects, setProjects] = useState<Project[]>([]);
  const [refreshList, setRefreshList] = useState<boolean>(false);

  const triggerRefreshList = () => {
    setRefreshList((prev) => !prev);
  };

  return (
    <ListProjectsContext.Provider value={{ triggerRefreshList }}>
      <ul className={styles["grid-layout"]}>
        {props.projects.map((p) => (
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
