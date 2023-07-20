import { IconButton, CloseButton } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { AddIcon } from "@chakra-ui/icons";
type RoundedActionButtonProps = {
  onClick?: MouseEventHandler;
  variant: "trash" | "plus";
};

export function RoundedActionButton(props: RoundedActionButtonProps) {
  return props.variant === "trash" ? (
    <CloseButton
      bg={"gray.300"}
      borderRadius={"full"}
      m={3}
      p={3}
      alignSelf={"flex-start"}
      size={"sm"}
      onClick={props.onClick}
      _hover={{
        transform: "scale(1.1,1.1)",
        bg: "red.400",
        color: "white",
      }}
    />
  ) : (
    <IconButton
      aria-label="create project"
      icon={<AddIcon />}
      borderRadius={"full"}
      colorScheme="green"
      _hover={{
        transform: "scale(1.05,1.05)",
      }}
    />
  );
}
