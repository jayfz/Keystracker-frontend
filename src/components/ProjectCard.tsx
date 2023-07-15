import { RoundedActionButton } from "./RoundedActionButton";
import { Project } from "../models/Project";
import Utilities from "../Utilities";
import { useFetcher, Link } from "react-router-dom";

import styles from "./styles/ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
};

import { MouseEventHandler } from "react";
import {
  AbsoluteCenter,
  Center,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

export function ProjectCard(props: ProjectCardProps) {
  const project = props.project;

  const thumbnail = {
    backgroundImage: project?.thumbnail || "",
  };

  const fetcher = useFetcher();

  const onRoundedActionButtonClick: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    // if (event.target === target) {

    // if (event.defaultPrevented) return; // Exits here if event has been handled
    event.preventDefault();

    fetcher.submit(null, {
      method: "DELETE",
      action: `${project.id}/delete`,
    });
    // event.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation();
    // } else {
    //   window.resulty = { event, target };
    // }
  };

  return (
    <article className={styles.projectCard}>
      <Link to={`${project.id}/edit`}>
        <section style={{ ...thumbnail, position: "relative" }}>
          {/* {fetcher.state === "submitting" && <span>loading...</span>} */}
          {fetcher.state === "submitting" && (
            <AbsoluteCenter>
              <CircularProgress thickness={4} size={10} isIndeterminate />
            </AbsoluteCenter>
          )}
          <RoundedActionButton
            onClick={onRoundedActionButtonClick}
            variant="trash"
          />
        </section>

        <section>
          <p>{project.name}</p>
          <p>{Utilities.getTimeAgo(project.createdAt)}</p>
        </section>
      </Link>
    </article>
  );
}
