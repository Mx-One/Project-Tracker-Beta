import { useProjectsContext } from "../context/useProjectsContext";
import { ProjectRecord } from "@/types/types";

/**
 * Creates a new project locally (no DB).
 */
export const useCreateProject = () => {
  const { projects, setProjects } = useProjectsContext();

  const handleCreateProject = (user_id: string) => {
    const newProject: ProjectRecord = {
      id: projects.length + 1,
      project_address: "New Project",
      client: "n/a",
      contract_amount: 0,
      paid: 0,
      status: "quoted",
      date_quoted: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      date_started: null,
      date_finished: null,
      user_id_fk: user_id,
      userProfile: {
        name: "Dana Wright",
      },
    };

    setProjects((prev) => [...prev, newProject]);
  };

  return { handleCreateProject, isLoading: false };
};
