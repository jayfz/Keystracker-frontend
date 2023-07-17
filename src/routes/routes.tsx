import { createBrowserRouter, Navigate } from "react-router-dom";

import Root from ".";
import ProjectsPage, {
  loader as projectsLoader,
  action as deleteProjectAction,
} from "./projects/index";

import CreateProjectPage, {
  action as createProjectAction,
} from "./projects/create"; // has an action, not a provider

import EditProjectPage, {
  loader as EditProjectPageLoader,
  action as EditProjectPageAction,
} from "./projects/edit";
import Playground from "./playground";

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
      },
      {
        path: "/projects/:projectId/delete",
        action: deleteProjectAction,
      },

      {
        path: "/projects/create",
        element: <CreateProjectPage />,
        action: createProjectAction,
      },
      {
        path: "/projects/:projectId/edit",
        element: <EditProjectPage />,
        loader: EditProjectPageLoader,
        action: EditProjectPageAction,
        children: [
          {
            path: "cli-parameters/create",
          },
          {
            path: "cli-parameters/:parameterId/edit",
          },
        ],
      },
      {
        path: "/playground",
        element: <Playground />,
      },
    ],
  },
]);
