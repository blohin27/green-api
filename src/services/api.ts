import axios from "axios";
import { useStore } from "../store";

const API_URL = "https://1103.api.green-api.com";

export enum ApiMethod {
  SEND_MESSAGE = "sendMessage",
  RECEIVE_NOTIFICATION = "receiveNotification",
  DELETE_NOTIFICATION = "deleteNotification",
}

export const getReceiveNotification = async () => {
  return await axios.get(apiUrl(ApiMethod.RECEIVE_NOTIFICATION));
};

export const getDeleteNotification = async (receiptId?: string) => {
  return await axios.delete(apiUrl(ApiMethod.DELETE_NOTIFICATION, receiptId));
};

export const postSendMessage = async (chatId: string, message: string) => {
  return await axios.post(apiUrl(ApiMethod.SEND_MESSAGE), {
    chatId,
    message: message.trim(),
  });
};

export const apiUrl = (method: ApiMethod, receiptId?: string): string => {
  const { idInstance, apiTokenInstance } = useStore.getState();
  switch (method) {
    case ApiMethod.DELETE_NOTIFICATION:
      if (receiptId) {
        return `${API_URL}/waInstance${idInstance}/${method}/${apiTokenInstance}/${receiptId}`;
      }
      throw new Error("receiptId is required for deleteNotification method");
    case ApiMethod.RECEIVE_NOTIFICATION:
      return `${API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=2`;
    case ApiMethod.SEND_MESSAGE:
    default:
      return `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
  }
};
