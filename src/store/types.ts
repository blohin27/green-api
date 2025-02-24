export interface Message {
  idMessage: string;
  type: string;
  timestamp: number;
  textMessage?: string;
  senderId: string;
}

export interface StoreState {
  apiTokenInstance: string;
  idInstance: string;
  setApiTokenInstance: (token: string) => void;
  setIdInstance: (id: string) => void;
  clearAuthData: () => void;
  loadMessages: (phone: string, messages: Message[]) => void;
  addMessageToHistory: (phone: string, message: Message) => void;
  clearMessages: () => void;
  loadAuthDataFromLocalStorage: () => void;
  phoneContacts: string[];
  messages: Record<string, Message[]>;
}
