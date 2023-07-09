import { Link } from "react-router-dom";
import { RoundedActionButton } from "./RoundedActionButton";
import styles from "./styles/CreateProjectCard.module.css";

export function CreateProjectCard() {
  const onClickHandler = () => {
    //route to create Project
    console.log("routing to create project");
  };

  return (
    <Link
      to={"create"}
      className={styles.createProjectCard}
      onClick={onClickHandler}
    >
      <RoundedActionButton variant={"plus"} />
    </Link>
  );
}
