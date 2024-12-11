import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home";
import { Create } from "./page/Create";
import { Update } from "./page/Update";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Profile } from "./page/Profil";

const page = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={page} />
    </Provider>
  );
}

export default App;
