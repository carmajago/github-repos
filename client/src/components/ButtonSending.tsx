import { Button } from "react-bootstrap";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  label: string;
  sending: boolean;
  className?:string;
}

export const ButtonSending = ({ label, sending, className }: Props) => {
  return (
    <Button type="submit" disabled={sending} className={className ||''}>
      {label}{" "}
      {sending && <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>}
    </Button>
  );
};
