import { Link } from "react-router-dom";
import { RoundedActionButton } from "./RoundedActionButton";
import { AspectRatio, Box } from "@chakra-ui/react";

export function CreateProjectCard() {
  return (
    <Box
      height={"fit-content"}
      border={"1px"}
      borderColor={"gray.300"}
      borderRadius={"2xl"}
      shadow={"base"}
    >
      <Link to={"create"}>
        <AspectRatio ratio={16 / 9}>
          <Box>
            <RoundedActionButton variant={"plus"} />
          </Box>
        </AspectRatio>
      </Link>
    </Box>
  );
}
