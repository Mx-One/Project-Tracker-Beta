import { Plus } from "lucide-react";
import { ImageCell } from "@/components/ui/table";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useCreateProject } from "../../hooks/create";
import { useProjectsContext } from "../../context/useProjectsContext";

/**
 * A button component for creating a new project.
 * Utilizes user profile data to initiate a project creation process.
 *
 * - If the user profile is not available, the button will not render.
 * - On click, the button sets the project status to "quoted" and PM to "all",
 *   and triggers the creation of a new project with the user's ID.
 *
 * Returns an `ImageCell` component styled as a button with a plus icon.
 */

const CreateProjectButton = () => {
  const { userProfile } = useUserProfile();
  const { handleCreateProject } = useCreateProject();
  const { dispatch } = useProjectsContext();

  if (!userProfile?.user_id) return null;

  return (
    <ImageCell
      icon={Plus}
      buttonVariant="ghost"
      iconProps="text-green-600"
      handleClick={() => {
        dispatch({ type: "SET_STATUS", payload: "quoted" });
        dispatch({ type: "SET_PM", payload: "all" });
        handleCreateProject(userProfile.user_id);
      }}
    />
  );
};

export default CreateProjectButton;
