import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
import ChatBox from "./Components/ChatBoxComponent/ChatBox";
import HomePage from "./Components/Pages/HomePage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    children: [
      { path: "/home", element: <HomePage /> },
      {
        path: "/chatbox",
        element: <ChatBox />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={Router}></RouterProvider>;
}

export default App;
