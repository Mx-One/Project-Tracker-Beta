import React, { useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useProjectsContext } from "../../context/useProjectsContext";
import { useListProjects } from "../../hooks/list";

const ProjectsPmFilter: React.FC = React.memo(() => {
  const { projectListData: projects } = useListProjects();
  const { state, dispatch } = useProjectsContext();

  const uniquePms = useMemo(() => {
    const pmSet = new Set<string>();
    for (const project of projects) {
      if (project.userProfile?.name) {
        pmSet.add(project.userProfile.name);
      }
    }
    return Array.from(pmSet).sort();
  }, [projects]);

  return (
    <Select
      value={state.pm}
      onValueChange={(pm) => dispatch({ type: "SET_PM", payload: pm })}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select PM" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All PMs</SelectItem>
        {uniquePms.map((pm) => (
          <SelectItem key={pm} value={pm}>
            {pm}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

export default ProjectsPmFilter;
