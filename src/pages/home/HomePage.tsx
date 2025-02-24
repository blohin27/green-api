import { useState } from "react";
import { storageUtils, useStore } from "../../store";
import { useNavigate } from "@tanstack/react-router";
import { ChatHistory } from "./components/ChatHistory.tsx";
import { PhoneModal } from "./components/PhoneModal.tsx";
import { ChatContactCard } from "./components/ChartContactCard.tsx";

export default function HomePage() {
  const {
    idInstance,
    setIdInstance,
    setApiTokenInstance,
    apiTokenInstance,
    phoneContacts,
    clearMessages,
    messages,
  } = useStore();
  const [selectedPhone, setSelectedPhone] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const logout = async () => {
    storageUtils.clearLocalStorage();
    setApiTokenInstance("");
    setIdInstance("");
    clearMessages();
    await navigate({ to: "/login" });
  };

  return (
    <div
      className={
        "relative w-screen h-screen flex flex-col bg-[rgb(219,216,213)]"
      }
    >
      <div className={"h-[146px] bg-[rgb(74,164,133)]"}></div>
      <div className={"w-full h-full"}>
        <div className={" flex mx-[65px] h-[110%] -mt-[110px] "}>
          <div className={" w-[30%] h-full bg-white border-r"}>
            <div className={"flex justify-between"}>
              <div
                onClick={() => {
                  setIsOpen(true);
                }}
                className={
                  "text-center cursor-pointer p-2 m-3 w-fit h-fit bg-green-300  rounded"
                }
              >
                Создать чат
              </div>
              <div
                onClick={logout}
                className={
                  "text-center cursor-pointer p-2 m-3 w-fit h-fit bg-red-300  rounded"
                }
              >
                Выйти
              </div>
            </div>
            {phoneContacts.map((item) => {
              const lastMessage =
                messages[item] && messages[item].length > 0
                  ? messages[item][messages[item].length - 1]
                  : null;

              return (
                <ChatContactCard
                  key={item}
                  item={item}
                  selectedPhone={selectedPhone}
                  lastMessage={lastMessage}
                  onSelect={setSelectedPhone}
                />
              );
            })}
          </div>
          <div className={" w-[70%] h-full bg-white "}>
            {!!selectedPhone && (
              <ChatHistory
                selectedPhone={selectedPhone}
                idInstance={idInstance}
                apiTokenInstance={apiTokenInstance}
              />
            )}
          </div>
        </div>
      </div>
      <PhoneModal
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        onSubmit={(item) => {
          if (!phoneContacts.includes(item)) {
            phoneContacts.push(item);
          }
        }}
      />
    </div>
  );
}
