import { Link } from "react-router-dom";
import { RoundedActionButton } from "./RoundedActionButton";
import styles from "./styles/CreateProjectCard.module.css";
import { AspectRatio, Box } from "@chakra-ui/react";

export function CreateProjectCard() {
  const onClickHandler = () => {
    //route to create Project
    console.log("routing to create project");
  };

  return (
    <Box border={"1px"} borderRadius={"2xl"}>
      <Link to={"create"} onClick={onClickHandler}>
        <AspectRatio ratio={16 / 9}>
          <Box>
            <RoundedActionButton variant={"plus"} />
          </Box>
        </AspectRatio>
      </Link>
    </Box>
  );
}
