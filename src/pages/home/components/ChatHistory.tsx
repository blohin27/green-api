import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../../store";
import {
  getDeleteNotification,
  getReceiveNotification,
  postSendMessage,
} from "../../../services";
import { extractPhoneNumber } from "../../../utils";

interface ChatHistoryProps {
  selectedPhone: string;
  idInstance: string;
  apiTokenInstance: string;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ selectedPhone }) => {
  const { messages, addMessageToHistory } = useStore();
  const [message, setMessage] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const response = await getReceiveNotification();

      if (response.data?.receiptId && response.data?.body) {
        const { body, receiptId } = response.data;

        if (body.typeWebhook === "incomingMessageReceived") {
          const newMessage = {
            idMessage: body.idMessage,
            type: body.messageData.typeMessage,
            timestamp: body.timestamp,
            textMessage: body.messageData?.textMessageData?.textMessage,
            senderId: body.senderData.sender,
          };
          addMessageToHistory(
            `${extractPhoneNumber(body.senderData.chatId)}`,
            newMessage,
          );
        }

        await getDeleteNotification(receiptId);
      }
    } catch (error) {
      console.error("Ошибка при получении сообщений:", error);
    }
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const sendMessage = async (): Promise<void> => {
    if (!message.trim()) return;
    try {
      const newMessage = {
        idMessage: Date.now().toString(),
        type: "text",
        timestamp: Date.now() / 1000,
        textMessage: message.trim(),
        senderId: "me",
      };
      await postSendMessage(`${selectedPhone}@c.us`, message);
      addMessageToHistory(selectedPhone, newMessage);
      setMessage("");
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchWithDelay = async () => {
      while (isMounted) {
        await fetchMessages();
        await new Promise((res) => setTimeout(res, 2000));
      }
    };
    scrollToBottom();
    fetchWithDelay();
    return () => {
      isMounted = false;
    };
  }, [selectedPhone]);

  useEffect(() => {
    scrollToBottom();
  }, [messages[selectedPhone]]);
  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col h-full">
      <div className="flex-grow flex flex-col justify-between">
        <div className="text-xl font-semibold mb-4 border-b">
          {selectedPhone}
        </div>
        <ul className="space-y-2 overflow-y-auto flex-grow max-h-[740px] scrollbar-hide">
          {(messages[selectedPhone] || []).map((msg, index) => (
            <li
              key={msg?.idMessage + msg.textMessage + index}
              className={`p-3 rounded-lg ${
                msg?.senderId.startsWith(selectedPhone)
                  ? "bg-green-100 text-left"
                  : "bg-blue-100 text-right"
              }`}
            >
              <p>{msg.textMessage || "Нет текста"}</p>
              <span className="text-xs text-gray-500">
                {new Date(msg.timestamp * 1000).toLocaleString()}
              </span>
            </li>
          ))}
          <div ref={bottomRef} />
        </ul>
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Введите сообщение..."
          className="flex-grow p-2 border rounded-lg mr-2"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Отправить
        </button>
      </div>
    </div>
  );
};
