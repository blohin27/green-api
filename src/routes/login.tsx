import { createFileRoute, redirect } from "@tanstack/react-router";
import { Login } from "../pages/login";
import { useStore } from "../store";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const { idInstance, apiTokenInstance } = useStore.getState();
    if (!!idInstance && !!apiTokenInstance) {
      throw redirect({ to: "/home" });
    }
  },
  component: Login,
});
