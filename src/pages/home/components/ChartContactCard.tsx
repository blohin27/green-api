import React from "react";

interface ChatContactCardProps {
  item: string;
  selectedPhone: string;
  lastMessage: {
    idMessage: string;
    senderId: string;
    textMessage?: string;
  } | null;
  onSelect: (phone: string) => void;
}

export const ChatContactCard: React.FC<ChatContactCardProps> = ({
  item,
  selectedPhone,
  lastMessage,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(item)}
      className={`flex items-center cursor-pointer p-3 transition rounded-lg ${
        selectedPhone === item ? "bg-green-100" : "hover:bg-gray-100"
      }`}
    >
      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white text-lg font-semibold">
        <span>👤</span>
      </div>

      <div className="ml-4 flex-1 border-b border-gray-200 pb-2">
        <div className="flex justify-between">
          <span className="font-medium text-gray-900">{item}</span>
        </div>
        {lastMessage ? (
          <div
            className={`text-[10px] truncate p-[2px] rounded-lg pr-2 ${
              lastMessage.senderId === "me"
                ? "bg-blue-100 text-right"
                : "bg-green-100 text-left"
            }`}
          >
            {lastMessage.textMessage || "Нет текста"}
          </div>
        ) : (
          <div className="text-[10px] text-gray-500 truncate">
            Нет сообщений
          </div>
        )}
      </div>
    </div>
  );
};
