import styles from "./styles/RoundedActionButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";
type RoundedActionButtonProps = {
  onClick?: MouseEventHandler;
  variant: "trash" | "plus";
};

export function RoundedActionButton(props: RoundedActionButtonProps) {
  const hoverBehavior =
    props.variant == "trash" ? styles.rabDanger : styles.rabSuccess;
  return (
    <button
      onClick={props.onClick}
      className={`${styles.roundedActionButton} ${hoverBehavior}`}
    >
      <FontAwesomeIcon icon={props.variant} />
    </button>
  );
}
