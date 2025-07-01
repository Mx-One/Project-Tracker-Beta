import { useProjectsContext } from "../context/useProjectsContext";

export const useDeleteProject = () => {
  const { setProjects } = useProjectsContext();

  const handleDeleteProject = (id: number, onSuccess?: () => void) => {
    setProjects((prevProjects) => {
      const updated = prevProjects.filter((p) => p.id !== id);
      return updated;
    });

    if (onSuccess) onSuccess(); // Close modal or trigger toast
  };

  return { handleDeleteProject, isLoading: false };
};
