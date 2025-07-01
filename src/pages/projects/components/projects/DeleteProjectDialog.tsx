import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { ProjectRecord } from "../../../../types/types";
import { useDeleteProject } from "../../hooks/delete";

/**
 * @description A dialog that asks the user to confirm deletion of a project
 *
 * @param {ProjectRecord} project - The project to be deleted
 * @param {() => void} onClose - The callback to be called when the dialog is closed
 */
const DeleteDialog = ({
  project,
  onClose,
}: {
  project: ProjectRecord;
  onClose: () => void;
}) => {
  const { handleDeleteProject } = useDeleteProject();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await handleDeleteProject(project.id, onClose);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white p-6 rounded-md w-1/5">
        <DialogHeader>
          <DialogTitle className="text-center lg:text-xl mt-4">
            Delete Project
          </DialogTitle>
          <DialogDescription className="text-center lg:text-md pt-3">
            Do you want to delete the project:{" "}
            <strong className="block lg:text-lg">
              {project.project_address}?
            </strong>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-4 space-x-4">
          {isDeleting ? (
            <Button size="sm" disabled>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
