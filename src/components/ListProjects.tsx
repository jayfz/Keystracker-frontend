import { useState } from "react";
import { Project } from "@/models/Project";
import { ProjectCard } from "@/components/ProjectCard";
import { CreateProjectCard } from "@/components/CreateProjectCard";
import { ListProjectsContext } from "@/context/ListProjectsContext";

import { SimpleGrid } from "@chakra-ui/react";

type ListProjectsProps = {
  projects: Project[];
};

export default function ListProjects(props: ListProjectsProps) {
  const [refreshList, setRefreshList] = useState<boolean>(false);

  const triggerRefreshList = () => {
    setRefreshList((prev) => !prev);
  };

  return (
    <ListProjectsContext.Provider value={{ triggerRefreshList }}>
      <SimpleGrid minChildWidth={"272px"} spacing={4}>
        {props.projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}

        <CreateProjectCard />
      </SimpleGrid>
    </ListProjectsContext.Provider>
  );
}
