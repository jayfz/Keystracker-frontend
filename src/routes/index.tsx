import { Outlet, Link as RouterLinK } from "react-router-dom";
import {
  Container,
  Heading,
  Text,
  Link,
  List,
  ListItem,
  Badge,
} from "@chakra-ui/react";

export default function Root() {
  return (
    <Container maxW="container.xl" p={5}>
      <Heading bgGradient="linear(to-r,blue.400 , ,blue.900)" bgClip="text">
        Keystracker project powered by React
      </Heading>
      <nav>
        <List>
          <ListItem>
            <Link as={RouterLinK} to={`projects`}>
              <Badge p={2} my={1} colorScheme="blue">
                Projects
              </Badge>
            </Link>
          </ListItem>
          <ListItem>
            <Link as={RouterLinK} to={`unknown`}>
              <Badge p={2} my={1} colorScheme="blue">
                Unknown
              </Badge>
            </Link>
          </ListItem>
        </List>
      </nav>
      <Outlet />
      <footer>
        <Text>All rights reserved</Text>
      </footer>
    </Container>
  );
}
