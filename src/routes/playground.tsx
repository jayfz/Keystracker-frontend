import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  HStack,
  Text,
  Box,
  VStack,
  SimpleGrid,
  Flex,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export default function Playground() {
  const imgURL = "http://localhost:8000/public/7/frame-1285.jpg";

  // const messageProps: ServerStatus = {
  //   status: "Enqueued",
  //   message: "Server will soon try to do what you need",
  // };

  // const messageProps: ServerStatus = {
  //   status: "Processing",
  //   message: "Server is doing some work",
  //   progress: 90,
  // };

  const messageProps: ServerStatus = {
    status: "Enqueued",
    message: "Server could do  the job",
  };

  return <ServerMessage {...messageProps} />;
}

type ServerStatus = Enqueued | Processing | Failed | Completed;

type Enqueued = {
  status: "Enqueued";
  message: string;
};

type Processing = {
  status: "Processing";
  message: string;
  progress: number;
};

type Failed = {
  status: "Failed";
  message: string;
};

type Completed = {
  status: "Completed";
  message: string;
};

export function ServerMessage(props: ServerStatus) {
  if (props.status === "Enqueued") {
    return (
      <HStack>
        <CircularProgress
          isIndeterminate={true}
          color={"blue.400"}
          thickness={"10px"}
          size="30px"
        />
        <Text>{props.message}</Text>
      </HStack>
    );
  }

  if (props.status === "Failed" || props.status === "Completed") {
    const color = props.status == "Failed" ? "red.400" : "green.400";
    const Icon = props.status == "Failed" ? CloseIcon : CheckIcon;

    return (
      <HStack>
        <Icon color={color} />
        <Text>{props.message}</Text>
      </HStack>
    );
  }

  return (
    <HStack>
      <CircularProgress
        value={props.progress}
        color={"orange.400"}
        thickness={"10px"}
        size="30px"
      >
        <CircularProgressLabel>{props.progress}%</CircularProgressLabel>
      </CircularProgress>
      <Text>{props.message}</Text>
    </HStack>
  );
}
