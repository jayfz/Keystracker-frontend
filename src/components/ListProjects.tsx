import { Fragment, useState } from "react";
import { Project } from "@/models/Project";
import { ProjectCard } from "@/components/ProjectCard";
import { CreateProjectCard } from "@/components/CreateProjectCard";
import { ListProjectsContext } from "@/context/ListProjectsContext";

import { Box, SimpleGrid, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useAsyncValue } from "react-router-dom";
import AnimatedPage, {
  fadeInAnimation,
  bringFromLeftAnimation,
} from "./AnimatedPage";

// type ListProjectsProps = {
//   projects: Project[];
// };
//props: ListProjectsProps
export default function ListProjects() {
  const [refreshList, setRefreshList] = useState<boolean>(false);

  const projects = useAsyncValue() as Project[];

  const triggerRefreshList = () => {
    setRefreshList((prev) => !prev);
  };

  return (
    <ListProjectsContext.Provider value={{ triggerRefreshList }}>
      <SimpleGrid minChildWidth={"272px"} spacing={4}>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}

        <CreateProjectCard />
      </SimpleGrid>
    </ListProjectsContext.Provider>
  );
}

export function ListProjectsSkeleton() {
  return (
    <SimpleGrid minChildWidth={"272px"} spacing={4}>
      {Array(12)
        .fill(0)
        .map((_, key) => (
          <Box key={key}>
            <Skeleton borderRadius={"3xl"} height={"168px"} />
            <SkeletonText
              mt="4"
              noOfLines={2}
              spacing="4"
              ml={4}
              mr={4}
              skeletonHeight="2"
              sx={{ "& > div": { borderRadius: "full" } }}
            />
          </Box>
        ))}
    </SimpleGrid>
  );
}
