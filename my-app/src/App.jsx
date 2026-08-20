import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import { About } from "./Pages/About";
import Board from "./Components/Board";

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          errorElement: (
            <div>
              <p>Page Not Found</p>
            </div>
          ),
          children: [
            { path: "/", element: <Home /> },
            {
              path: "about",
              element: <About />,
            },
            {
              path: "board",
              element: <Board />,
            },
          ],
        },
      ])}
    />
  );
}

export default App;
