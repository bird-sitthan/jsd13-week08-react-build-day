import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import { AddCardForm } from "./Components/AddCardForm";
import Layout from "./Pages/Layout";


function App() {
  const [count, setCount] = useState(0);

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
            { path: "about", element: <AddCardForm /> },
          ],
        },
      ])}
    />
  );
}

export default App;
