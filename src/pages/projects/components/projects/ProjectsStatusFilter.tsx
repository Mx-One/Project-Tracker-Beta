import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectsContext } from "../../context/useProjectsContext";

const ProjectStatusFilter: React.FC = React.memo(() => {
  const { state, dispatch } = useProjectsContext();

  /**
   * Handles the change event for the project status filter tabs.
   * Dispatches an action to update the project status in the global context.
   *
   * @param value - The selected project status as a string.
   */
  const handleTabChange = (value: string) => {
    dispatch({ type: "SET_STATUS", payload: value });
  };

  return (
    <div>
      <Tabs value={state.status} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="quoted">Quoted</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="finished">Finished</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
});

export default ProjectStatusFilter;
