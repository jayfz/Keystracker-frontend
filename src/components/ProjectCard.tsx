import { RoundedActionButton } from "@/components/RoundedActionButton";
import { Project } from "@/models/Project";
import Utilities from "@/Utilities";
import { useFetcher, Link } from "react-router-dom";

import { MouseEventHandler, useEffect, useState } from "react";
import {
  AbsoluteCenter,
  Box,
  CircularProgress,
  Heading,
  VStack,
  Text,
  AspectRatio,
} from "@chakra-ui/react";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard(props: ProjectCardProps) {
  const project = props.project;
  const [loading, setLoading] = useState(false);

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
      action: `${project.id}`,
    });
  };

  const onLinkClicked = () => {
    setLoading(true);
  };

  return (
    <Box>
      <Link to={`${project.id}/edit`} onClick={onLinkClicked}>
        <AspectRatio ratio={16 / 9}>
          <Box
            style={{ ...thumbnail, justifyContent: "flex-end" }}
            bgGradient={"linear(to-b, blue.50, orange.50)"}
            borderRadius={"2xl"}
            shadow={"sm"}
            border={"1px"}
            borderColor={"gray.300"}
          >
            {(fetcher.state === "submitting" || loading) && (
              <AbsoluteCenter>
                <CircularProgress thickness={4} size={10} isIndeterminate />
              </AbsoluteCenter>
            )}

            <RoundedActionButton
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
