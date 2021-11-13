
import { store } from "react-notifications-component";

interface Props {
  title: string;
  message: string;
  type: "success" | "danger" | "info" | "default" | "warning";
}

export const useNotifications = () => {
  const addNotification = ({ title, message, type }: Props) => {
    store.addNotification({
      title,
      message:message ||"Error",
      type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };
  return { addNotification };
};
