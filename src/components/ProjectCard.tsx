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

  const thumbnailExist = project.thumbnails.includes("frame-1.jpg");
  const image = `${import.meta.env.VITE_SERVER_ASSETS_URL}${
    project.id
  }/frame-1.jpg`;

  const backgroundImage = `linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)), url(${image})`;

  const thumbnail = {
    backgroundImage,
    backgroundSize: "cover",
  };

  console.log("thumbnail: ", thumbnail);

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
        <AspectRatio
          ratio={16 / 9}
          bgGradient={"linear(to-b, blue.50, orange.50)"}
        >
          <Box
            style={{ ...thumbnail, justifyContent: "flex-end" }}
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
