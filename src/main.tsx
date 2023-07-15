import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { applicationRouter } from "./routes/routes.tsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChakraProvider } from "@chakra-ui/react";
import "normalize.css";
import "./index.css";

library.add(faPlus, faTrash);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={applicationRouter} />
    </ChakraProvider>
  </React.StrictMode>
);
