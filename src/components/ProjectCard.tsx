import { useState } from "react";
import ProjectService from "../services/ProjectService";
import { RoundedActionButton } from "./RoundedActionButton";
import { Project } from "../models/Project";
import Utilities from "../Utilities";
import { useListProjectsContext } from "../context/ListProjectsContext";

import styles from "./styles/ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard(props: ProjectCardProps) {
  const project = props.project;
  const [loading, setLoading] = useState<boolean>(false);
  const { triggerRefreshList } = useListProjectsContext();

  const thumbnailStyles = { backgroundImage: project?.thumbnail || "" };

  const onRoundedActionButtonClick = async () => {
    setLoading(true);
    await ProjectService.deleteProject(project.id);
    setLoading(false);
    triggerRefreshList();
  };

  return (
    <article className={styles.projectCard}>
      <section style={thumbnailStyles}>
        <RoundedActionButton
          onClick={onRoundedActionButtonClick}
          variant="trash"
        />
      </section>
      <section>
        <p>{project.name}</p>
        <p>{Utilities.getTimeAgo(project.createdAt)}</p>
      </section>
    </article>
  );
}
