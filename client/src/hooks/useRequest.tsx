import { AxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import { requestSSO } from "../api/Request";
import { RootState } from "../redux/store";
import { useNotifications } from "./useNotifications";

interface Props {
  url: string;
  title: string;
  body?:any
}

export const useRequest = () => {
  const user = useSelector((store: RootState) => {
    return store.auth;
  });

  const { addNotification } = useNotifications();

  async function getRequest<T = any>({ url, title }: Props) {
    const { token } = user;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let status;
    const req = await requestSSO.get<T>(url, config).catch((error) => {
      status = error.response.status;

      addNotification({
        title,
        message: error.response
          ? error.response.data
            ? error.response.data.message
            : "Error"
          : "Error",
        type: "danger",
      });
    });
    if (req) {
      return { data: req.data, status: 200 };
    }

    return { status };
  }



  
  async function postRequest<T = any>({ url, title, body ={} }: Props) {
    const { token } = user;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let status;
    const req = await requestSSO.post<T>(url, body, config).catch((error) => {
      status = error.response.status;

      addNotification({
        title,
        message: error.response
          ? error.response.data
            ? error.response.data.message
            : "Error"
          : "Error",
        type: "danger",
      });
    });
    if (req) {
      return { data: req.data, status: 200 };
    }

    return { status };
  }

  async function patchRequest<T = any>({ url, title, body ={} }: Props) {
    const { token } = user;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let status;
    const req = await requestSSO.patch<T>(url, body, config).catch((error) => {
      status = error.response.status;

      addNotification({
        title,
        message: error.response
          ? error.response.data
            ? error.response.data.message
            : "Error"
          : "Error",
        type: "danger",
      });
    });
    if (req) {
      return { data: req.data, status: 200 };
    }

    return { status };
  }


  return {
    getRequest,
    postRequest,
    patchRequest,
  };
};
