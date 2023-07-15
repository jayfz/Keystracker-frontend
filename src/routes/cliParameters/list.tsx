import { CLIParameters } from "@/models/CLIParameters";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { useFetcher } from "react-router-dom";
import styles from "./list.module.css";
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
    <article className={styles.ListCLIParameters}>
      <table>
        <tr>
          <th>Id</th>
          <th>Track Mode</th>
          <th>Start copy from</th>
          <th>Input File name</th>
          <th>Actions</th>
        </tr>
        {props.elements.map((item) => {
          return (
            <tr key={item.id}>
              <td>
                <Link to={`cli-parameters/${item.id}/edit`}>{item.id}</Link>
              </td>
              <td>{item.trackMode}</td>
              <td>{item.rawFrameCopyFromLine}</td>
              <td>{item.inputVideoFilename}</td>
              <td>
                <button onClick={onClickHandler} data-cliparameter-id={item.id}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </article>
  );
}
