import {
  AspectRatio,
  Box,
  CloseButton,
  Container,
  Flex,
  Progress,
  Text,
} from "@chakra-ui/react";

export default function Playground() {
  return (
    <Box>
      <CloseButton colorScheme="green" />
      <Progress size="xs" isIndeterminate colorScheme="blue" />
      <Container maxW="container.xl" bg="blue.200" centerContent>
        <AspectRatio ratio={16 / 9} bg={"purple.300"} w={"600px"}>
          <Box
            maxW={"200px"}
            maxH={"200px"}
            bg={"yellow.300"}
            alignItems={"flex-end"}
            justifyContent={"flex-start"}
            sx={{ justifyContent: "flex-start", alignItems: "flex-end" }}
            // style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
          >
            <Text bg={"red.200"}>Hey darling!</Text>

            <div className="father">
              father
              <div className="son">son</div>
            </div>
          </Box>
        </AspectRatio>
      </Container>
    </Box>
  );
}
