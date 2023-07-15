import { CLIParameters } from "@/models/CLIParameters";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { useFetcher } from "react-router-dom";
import styles from "./list.module.css";
import { Table, Tbody, Th, Thead, Tr, Td } from "@chakra-ui/react";
type ListCLIParametersProps = {
  elements: CLIParameters[];
};

export default function ListCLIParameters(props: ListCLIParametersProps) {
  const fetcher = useFetcher();

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    const cliParamterId = event.currentTarget.getAttribute(
      "data-cliparameter-id"
    );
    const options = { encType: "application/json", method: "DELETE" } as const;
    fetcher.submit({ id: cliParamterId }, options);
  };

  return (
    <article>
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
                  <Link to={`cli-parameters/${item.id}/edit`}>{item.id}</Link>
                </Td>
                <Td>{item.trackMode}</Td>
                <Td>{item.rawFrameCopyFromLine}</Td>
                <Td>{item.inputVideoFilename}</Td>
                <Td>
                  <button
                    onClick={onClickHandler}
                    data-cliparameter-id={item.id}
                  >
                    Delete
                  </button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </article>
  );
}
