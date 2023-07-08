import styles from "./styles/RoundedActionButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type RoundedActionButtonProps = {
  onClick?: () => Promise<void>;
};

export function RoundedActionButton(props: RoundedActionButtonProps) {
  const onClickhandler = () => {
    if (props.onClick) props.onClick();
  };
  return (
    <button onClick={onClickhandler} className={styles.roundedActionButton}>
      <FontAwesomeIcon icon="trash" />
    </button>
  );
}
