import { RoundedActionButton } from "./RoundedActionButton";
import { Project } from "../models/Project";
import Utilities from "../Utilities";
import { useFetcher } from "react-router-dom";

import styles from "./styles/ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard(props: ProjectCardProps) {
  const project = props.project;

  const thumbnailStyles = { backgroundImage: project?.thumbnail || "" };

  const fetcher = useFetcher();

  const onRoundedActionButtonClick = async () => {
    fetcher.submit(null, {
      method: "DELETE",
      action: `delete/${project.id}`,
    });
  };

  return (
    <article className={styles.projectCard}>
      <section style={thumbnailStyles}>
        {fetcher.state === "submitting" && <span>loading...</span>}
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
