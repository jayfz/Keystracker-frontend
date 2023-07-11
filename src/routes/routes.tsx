import { createBrowserRouter, Navigate } from "react-router-dom";

import Root from ".";
import ProjectsPage, { loader as projectsLoader } from "./projects/index";
import CreateProjectPage from "./projects/create"; // has an action, not a provider

export const applicationRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Navigate to="projects" replace={true} /> },
      {
        path: "projects",
        element: <ProjectsPage />,
        loader: projectsLoader,
      },
      {
        path: "projects/create",
        element: <CreateProjectPage />,
      },
    ],
  },
]);
