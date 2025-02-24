import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
});

function NotFoundPage() {
  const navigate = useNavigate();
  useEffect(() => {
    new Promise(() => {
      setTimeout(() => {
        navigate({ to: "/" });
      }, 1000);
    });
  }, [navigate]);
  return (
    <div className=" w-screen h-screen flex flex-col items-center justify-center  bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Страница не найдена
      </h1>
    </div>
  );
}
