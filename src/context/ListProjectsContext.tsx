import { createContext, useContext } from "react";

type ListProjectsContextType = {
  triggerRefreshList: () => void;
};

export const ListProjectsContext =
  createContext<ListProjectsContextType | null>(null);

export const useListProjectsContext = () => {
  const context = useContext(ListProjectsContext);
  if (!context) {
    throw new Error(
      "useListProjectsContext has to be used within <ListProjectsContext.Provider>"
    );
  }

  return context;
};
