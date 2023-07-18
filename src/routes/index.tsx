import { Outlet, NavLink as RouterLinK } from "react-router-dom";
import { Container, Heading, Text, Link, Badge, Flex } from "@chakra-ui/react";

export default function Root() {
  return (
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
      <Outlet />
      <Container as="footer" mt={12}>
        <Text align={"center"}>
          Harbor Bytes SAS. All rights reserved 2023.
        </Text>
      </Container>
    </Container>
  );
}
