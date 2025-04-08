import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router";

import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard/dashboard";
import SignUp from "./components/signUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
