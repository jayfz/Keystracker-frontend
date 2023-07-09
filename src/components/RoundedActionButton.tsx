import styles from "./styles/RoundedActionButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type RoundedActionButtonProps = {
  onClick?: () => Promise<void>;
  variant: "trash" | "plus";
};

export function RoundedActionButton(props: RoundedActionButtonProps) {
  const onClickhandler = () => {
    if (props.onClick) props.onClick();
  };

  const hoverBehavior =
    props.variant == "trash" ? styles.rabDanger : styles.rabSuccess;
  return (
    <button
      onClick={onClickhandler}
      className={`${styles.roundedActionButton} ${hoverBehavior}`}
    >
      <FontAwesomeIcon icon={props.variant} />
    </button>
  );
}
