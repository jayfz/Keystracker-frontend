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
import {
  CreateCLIParametersForm,
  action as createCLIParametersAction,
} from "./cliParameters/create";
import {
  EditLIParametersForm,
  action as editCLiParametersAction,
} from "./cliParameters/edit";

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
        path: "/projects/:projectId",
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
            element: <CreateCLIParametersForm />,
            action: createCLIParametersAction,
          },
          {
            path: "cli-parameters/:parameterId/edit",
            element: <EditLIParametersForm />,
            action: editCLiParametersAction,
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
