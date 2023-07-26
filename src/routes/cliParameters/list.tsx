import { CLIParameters } from "@/models/CLIParameters";
import { Link as RouterLink } from "react-router-dom";
import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Box,
  Button,
  HStack,
} from "@chakra-ui/react";
type ListCLIParametersProps = {
  elements: CLIParameters[];
  onElementRemove: (id: number) => void;
};

export default function ListCLIParameters(props: ListCLIParametersProps) {
  return (
    <Box as="article" my={8}>
      <Table variant={"simple"}>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Track Mode</Th>
            <Th>Start copy from</Th>
            <Th>Input File name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.elements.map((item) => {
            return (
              <Tr key={item.id}>
                <Td>
                  <RouterLink to={`cli-parameters/${item.id}/edit`}>
                    {item.id}
                  </RouterLink>
                </Td>
                <Td>{item.trackMode}</Td>
                <Td>{item.rawFrameCopyFromLine}</Td>
                <Td>{item.inputVideoFilename}</Td>
                <Td>
                  <HStack>
                    <Button
                      as={RouterLink}
                      to={`cli-parameters/${item.id}/edit`}
                      colorScheme="orange"
                      // onClick={() => editElement.scrollIntoView();}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => props.onElementRemove(item.id)}
                      colorScheme="red"
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
