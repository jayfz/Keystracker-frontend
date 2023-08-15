import {
  Outlet,
  NavLink as RouterLinK,
  useFetchers,
  useNavigation,
  useRevalidator,
} from "react-router-dom";
import {
  Container,
  Heading,
  Text,
  Link,
  Badge,
  Flex,
  Progress,
  Box,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export default function Root() {
  const websocketRef = useRef<WebSocket | null>(null);

  const [serverMessage, setServerMessage] = useState("fully operational");

  const fetchers = useFetchers();
  const navigation = useNavigation();
  const eventInProgress =
    fetchers.some((f) => f.state !== "idle") || navigation.state !== "idle";

  const revalidator = useRevalidator();

  console.log(
    "current state of websocket",
    websocketRef.current?.readyState ?? "unknown"
  );
  // console.log("current state of dateref", dateRef.current.toISOString());

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_ENDPOINT_URL);
    const settingServerMessage = (message: MessageEvent<string>) => {
      setServerMessage(message.data);
      if (message.data.includes("100")) {
        revalidator.revalidate();
      }
    };
    socket.addEventListener("message", settingServerMessage);
    websocketRef.current = socket;

    return () => {
      if (socket.readyState === socket.CONNECTING) {
        socket.addEventListener("open", () => socket.close());
        return;
      }

      socket.close();
    };
  }, []);
  return (
    <>
      <Progress
        opacity={eventInProgress ? "1" : "0"}
        position={"fixed"}
        width={"full"}
        zIndex={100}
        transition={"ease-in-out"}
        isIndeterminate
        size="xs"
        colorScheme="blue"
      />

      <Container maxW="container.xl" p={5}>
        <Heading
          bgGradient="linear(to-r,blue.400 , ,blue.900)"
          bgClip="text"
          mb={4}
        >
          Keystracker project powered by React
        </Heading>
        <nav>
          <Flex gap={1} sx={{ "& .active": { color: "blue.400" } }}>
            <Link as={RouterLinK} to={`projects`}>
              <Badge p={2} my={1} color={"inherit"}>
                Projects
              </Badge>
            </Link>
            <Link as={RouterLinK} to={`playground`}>
              <Badge p={2} my={1} color={"inherit"}>
                playground
              </Badge>
            </Link>
            <Link as={RouterLinK} to={`unknown`}>
              <Badge p={2} my={1} color={"inherit"}>
                Unknown
              </Badge>
            </Link>
          </Flex>
        </nav>
        <Box>
          <Text mb={8}>Server status: {serverMessage}</Text>
        </Box>
        <Outlet />
        <Container as="footer" mt={12}>
          <Text align={"center"}>
            Harbor Bytes SAS. All rights reserved 2023.
          </Text>
        </Container>
      </Container>
    </>
  );
}
