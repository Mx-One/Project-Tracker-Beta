import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumericFormat } from "react-number-format";
import { calculateProjectTotals } from "../../utils/projectsTableHelpers";
import { useProjectsContext } from "../../context/useProjectsContext";

/**
 * Renders a card displaying the total or outstanding amount of the projects
 * based on the selected status in the projects filter.
 *
 * If the status is "all", "quoted", or "finished", the title of the card is
 * "Total Amount", and the value displayed is the total contract amount of
 * all projects.
 *
 * If the status is not one of the above, the title of the card is
 * "Outstanding Amount", and the value displayed is the total outstanding
 * amount of all projects.
 *
 * @returns A JSX element representing the total or outstanding amount card.
 */
const StatsTotalAmountCard = () => {
  const { filteredProjects, state } = useProjectsContext();

  const totalAmount = calculateProjectTotals(filteredProjects);

  const getTitle = () => {
    if (
      state.status == "all" ||
      state.status == "quoted" ||
      state.status == "finished"
    ) {
      return "Total Amount";
    } else {
      return "Outstanding Amount";
    }
  };

  const getAmount = () => {
    if (
      state.status == "all" ||
      state.status == "quoted" ||
      state.status == "finished"
    ) {
      return totalAmount.totalContract.slice(0, -3);
    } else {
      return totalAmount.totalOutstanding.slice(0, -3);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex items-center pb-4">
          <CardTitle>{getTitle()}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center pb-8 text-4xl font-bold">
          <NumericFormat
            value={getAmount()}
            displayType="text"
            thousandSeparator
            prefix="$"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default StatsTotalAmountCard;
