import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router";

import LoginPage from "./pages/login";
import ChatbotPage from "./pages/chatbot";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <ChatbotPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
