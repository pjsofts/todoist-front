import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Todo from "../Todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/todos",
    element: <Todo />,
  },
]);
export default router;
