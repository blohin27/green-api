import { createFileRoute, redirect } from "@tanstack/react-router";
import HomePage from "../pages/home/HomePage.tsx";
import { useStore } from "../store";

export const Route = createFileRoute("/home")({
  beforeLoad: async () => {
    const { idInstance, apiTokenInstance } = useStore.getState();
    console.log("before /home", idInstance);
    if (!idInstance || !apiTokenInstance) {
      throw redirect({ to: "/login" });
    }
  },
  component: HomePage,
});
