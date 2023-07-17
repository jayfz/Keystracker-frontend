import { RoundedActionButton } from "./RoundedActionButton";
import { Project } from "../models/Project";
import Utilities from "../Utilities";
import { useFetcher, Link } from "react-router-dom";

// import styles from "./styles/ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
};

import { MouseEventHandler } from "react";
import {
  AbsoluteCenter,
  Box,
  CircularProgress,
  Flex,
  Heading,
  VStack,
  Text,
  AspectRatio,
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
    event.preventDefault();

    fetcher.submit(null, {
      method: "DELETE",
      action: `${project.id}/delete`,
    });
  };

  return (
    <Box>
      <Link to={`${project.id}/edit`}>
        <AspectRatio ratio={16 / 9}>
          <Box
            style={{ ...thumbnail, justifyContent: "flex-end" }}
            bgGradient={"linear(to-b, blue.50, orange.50)"}
            borderRadius={"2xl"}
          >
            {fetcher.state === "submitting" && (
              <AbsoluteCenter>
                <CircularProgress thickness={4} size={10} isIndeterminate />
              </AbsoluteCenter>
            )}

            <RoundedActionButton
              style={{ alignSelf: "flex-start" }}
              onClick={onRoundedActionButtonClick}
              variant="trash"
            />
          </Box>
        </AspectRatio>

        <VStack p={4} spacing={0} align={"flex-start"}>
          <Heading size={"sm"} noOfLines={2}>
            {project.name}
          </Heading>
          <Text color="gray.500">
            {Utilities.getTimeAgo(project.createdAt)}
          </Text>
        </VStack>
      </Link>
    </Box>
  );
}
