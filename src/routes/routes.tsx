import { createBrowserRouter, Navigate } from "react-router-dom";

import Root from ".";
import ProjectsPage, {
  loader as projectsLoader,
  action as projectsActions,
} from "./projects/index";
import CreateProjectPage, {
  action as createProjectAction,
} from "./projects/create"; // has an action, not a provider

export const applicationRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Navigate to="/projects" replace={true} /> },
      {
        path: "/projects/",
        element: <ProjectsPage />,
        loader: projectsLoader,
        action: createProjectAction,
      },
      {
        path: "/projects/delete/:projectId",
        action: projectsActions,
      },

      {
        path: "/projects/create",
        element: <CreateProjectPage />,
      },
    ],
  },
]);
