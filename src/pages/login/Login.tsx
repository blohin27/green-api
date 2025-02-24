import {
  API_TOKEN_KEY,
  ID_INSTANCE_KEY,
  storageUtils,
  useStore,
} from "../../store";
import { useNavigate } from "@tanstack/react-router";

export const Login = () => {
  const { idInstance, setIdInstance, apiTokenInstance, setApiTokenInstance } =
    useStore();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!!idInstance && !!apiTokenInstance) {
      storageUtils.saveToLocalStorage(API_TOKEN_KEY, apiTokenInstance);
      storageUtils.saveToLocalStorage(ID_INSTANCE_KEY, idInstance);
    }
    navigate({ to: "/home" });
  };

  return (
    <div className={"h-screen w-screen flex bg-gray-100 p-3 "}>
      <div className="  flex m-auto  ">
        <div className="bg-white shadow-lg rounded-2xl p-8 ">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            🔒 Авторизация в чате
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">ID Instance</label>
              <input
                type="text"
                value={idInstance}
                onChange={(e) => setIdInstance(e.target.value)}
                placeholder="Введите idInstance"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">
                API Token Instance
              </label>
              <input
                type="password"
                value={apiTokenInstance}
                onChange={(e) => setApiTokenInstance(e.target.value)}
                placeholder="Введите apiTokenInstance"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
