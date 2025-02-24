import { create } from "zustand";
import { Message, StoreState } from "./types.ts";

export const ID_INSTANCE_KEY = "idInstance";
export const API_TOKEN_KEY = "apiTokenInstance";

export const storageUtils = {
  saveToLocalStorage: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Ошибка при сохранении ${key}:`, error);
    }
  },

  loadFromLocalStorage: (key: string): string => {
    try {
      return localStorage.getItem(key) || "";
    } catch (error) {
      console.error(`Ошибка при загрузке ${key}:`, error);
      return "";
    }
  },

  clearLocalStorage: () => {
    try {
      localStorage.removeItem(ID_INSTANCE_KEY);
      localStorage.removeItem(API_TOKEN_KEY);
    } catch (error) {
      console.error("Ошибка при очистке localStorage:", error);
    }
  },
};

export const useStore = create<StoreState>((set) => ({
  apiTokenInstance: storageUtils.loadFromLocalStorage(API_TOKEN_KEY),
  idInstance: storageUtils.loadFromLocalStorage(ID_INSTANCE_KEY),
  phoneContacts: [],
  messages: {},

  setApiTokenInstance: (token) => {
    set({ apiTokenInstance: token });
  },

  setIdInstance: (id) => {
    set({ idInstance: id });
  },

  clearAuthData: () => {
    storageUtils.clearLocalStorage();
    set({ apiTokenInstance: "", idInstance: "" });
  },

  loadAuthDataFromLocalStorage: () => {
    const id = storageUtils.loadFromLocalStorage(ID_INSTANCE_KEY) || "";
    const token = storageUtils.loadFromLocalStorage(API_TOKEN_KEY) || "";
    set({ idInstance: id, apiTokenInstance: token });
  },

  loadMessages: (phone: string, messages: Message[]) =>
    set((state) => ({
      messages: { ...state.messages, [phone]: messages },
    })),

  addMessageToHistory: (phone: string, message: Message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [phone]: [...(state.messages[phone] || []), message],
      },
    })),

  clearMessages: () =>
    set((state) => ({
      ...state,
      messages: {},
      phoneContacts: [],
    })),
}));
