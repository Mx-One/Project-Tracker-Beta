import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjectsContext } from "../../context/useProjectsContext";
import { ProjectRecord } from "../../../../types/types";
import { useListProjects } from "../../hooks/list";

/**
 * Renders a card displaying the conversion rate of quoted projects to active projects.
 * The conversion rate is calculated based on the number of active projects relative
 * to the total number of projects associated with the current project manager or all
 * project managers if "all" is selected. The card is only rendered if the current
 * status is "quoted".
 *
 * The conversion rate is shown as a percentage along with the number of active projects
 * out of the total quoted projects.
 *
 * @returns A JSX element displaying the quote conversion rate or null if the status
 *          is not "quoted".
 */

const StatsCoversionRate = () => {
  const { state } = useProjectsContext();
  const { projectListData } = useListProjects();
  const { totalProjectsNumber, activeProjectsNumber } = projectListData.reduce(
    (
      acc: { totalProjectsNumber: number; activeProjectsNumber: number },
      project: ProjectRecord
    ) => {
      if (state.pm == project.userProfile.name || state.pm == "all") {
        acc.totalProjectsNumber += 1;
        acc.activeProjectsNumber += project.status === "active" ? 1 : 0;
      }
      return acc;
    },
    { totalProjectsNumber: 0, activeProjectsNumber: 0 }
  );

  const conversionRate =
    totalProjectsNumber > 0
      ? ((activeProjectsNumber * 100) / totalProjectsNumber).toFixed(0)
      : 0;

  if (state.status != "quoted") return null;

  return (
    <>
      <Card>
        <CardHeader className="flex items-center pb-4">
          <CardTitle>Quote Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center pb-4 text-4xl font-bold">
          {conversionRate}%
        </CardContent>
        <CardFooter className="flex-col text-sm">
          <div className="leading-none text-muted-foreground">
            {activeProjectsNumber} out of {totalProjectsNumber} quoted
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default StatsCoversionRate;
