import {
  DateCell,
  ImageCell,
  ProgressCell,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import CreateProjectButton from "../components/projects/CreateProjectButton";
import { X } from "lucide-react";
import {
  calculateOutstandingAmount,
  calculateProgressPercentage,
} from "./projectsTableHelpers";
import { TableColumnProps, TableFooterProps } from "@/types/types";

/**
 * Returns a record of JSX elements representing the columns of a project table.
 * The keys of the record correspond to the column names, and the values are the
 * JSX elements to be rendered in each column.
 *
 * @param project - ProjectRecord
 * @param idx - index of the project in the table
 * @param handleValueChange - function to be called when a value in the table
 *   changes
 * @param openDialog - function to be called when the X button in the actions
 *   column is clicked
 * @returns Record<string, React.ReactNode>
 */
const getTableColumnDef = ({
  project,
  idx,
  handleValueChange,
  openDialog,
}: TableColumnProps): Record<string, React.ReactNode> => {
  return {
    id: (
      <TableCell
        key="id"
        className="text-center"
        value={(idx + 1).toString()}
      />
    ),
    date_quoted: (
      <DateCell
        key="date_quoted"
        value={project.date_quoted}
        handleValueChange={(newValue) =>
          handleValueChange(project.id, "date_quoted", newValue)
        }
      />
    ),
    date_started: (
      <DateCell
        key="date_started"
        value={project.date_started}
        handleValueChange={(newValue) =>
          handleValueChange(project.id, "date_started", newValue)
        }
      />
    ),
    date_finished: (
      <DateCell
        key="date_finished"
        value={project.date_finished}
        handleValueChange={(newValue) =>
          handleValueChange(project.id, "date_finished", newValue)
        }
      />
    ),
    project_address: (
      <TableCell
        key="project_address"
        className="text-center font-medium"
        editable
        value={project.project_address}
        onValueChange={(newValue) =>
          handleValueChange(project.id, "project_address", newValue.toString())
        }
      />
    ),
    client: (
      <TableCell
        key="client"
        className="text-center"
        editable
        value={project.client}
        onValueChange={(newValue) =>
          handleValueChange(project.id, "client", newValue.toString())
        }
      />
    ),
    contract_amount: (
      <TableCell
        key="contract_amount"
        className="text-center"
        editable
        cad
        value={project.contract_amount}
        onValueChange={(newValue) =>
          handleValueChange(project.id, "contract_amount", newValue.toString())
        }
      />
    ),
    paid: (
      <TableCell
        key="paid"
        className="text-center"
        editable
        cad
        value={project.paid}
        onValueChange={(newValue) =>
          handleValueChange(project.id, "paid", newValue.toString())
        }
      />
    ),
    outstanding: (
      <TableCell
        key="outstanding"
        className="text-center"
        cad
        value={calculateOutstandingAmount(
          project.contract_amount,
          project.paid
        )}
      />
    ),
    progress: (
      <ProgressCell
        key="progress"
        className="lg:min-w-[140px] justify-center items-center"
        value={calculateProgressPercentage(
          project.contract_amount,
          project.paid
        )}
      />
    ),
    pm: (
      <TableCell
        key="pm"
        className="text-center"
        value={project.userProfile.name}
      />
    ),
    actions: (
      <ImageCell
        key="actions"
        icon={X}
        buttonVariant={"ghost"}
        iconProps="opacity-20"
        handleClick={() => openDialog(project)}
      />
    ),
  };
};

/**
 * Returns a Record of TableHead and TableCell components, which are used to
 * construct the footer of the projects table. The returned components
 * are keyed by the column key, and the value is the corresponding TableHead
 * or TableCell component.
 *
 * @param {TableFooterProps} props The props object containing the total
 *   contract value, total paid value, total outstanding value, and total progress
 *   value.
 *
 * @returns {Record<string, React.ReactNode>} A Record of TableHead and TableCell
 *   components.
 */
const getTableFooterDef = (
  props: TableFooterProps
): Record<string, React.ReactNode> => {
  return {
    id: (
      <TableHead key="id" className="text-center">
        Total
      </TableHead>
    ),

    date_quoted: (
      <TableHead key="date_quoted" className="text-center"></TableHead>
    ),
    date_started: (
      <TableHead key="date_started" className="text-center"></TableHead>
    ),
    date_finished: (
      <TableHead key="date_finished" className="text-center"></TableHead>
    ),
    project_address: (
      <TableHead key="project_address" className="text-center"></TableHead>
    ),

    client: <TableHead key="client" className="text-center"></TableHead>,

    contract_amount: (
      <TableCell
        key="contract_amount"
        className="text-center"
        cad
        value={props.totalContract}
      />
    ),

    paid: (
      <TableCell
        key="paid"
        className="text-center"
        cad
        value={props.totalPaid}
      />
    ),

    outstanding: (
      <TableCell
        key="outstanding"
        className="text-center py-2"
        cad
        value={props.totalOutstanding}
      />
    ),

    progress: (
      <ProgressCell
        key="progress"
        className="lg:min-w-[140px]"
        value={props.totalProgress} // Ensure the value stays within 0-100
      />
    ),

    pm: <TableHead key="user" className="text-center py-2"></TableHead>,

    actions: <CreateProjectButton key="actions" />,
  };
};

export { getTableColumnDef, getTableFooterDef };
