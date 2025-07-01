import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjectsContext } from "../../context/useProjectsContext";

/**
 * Renders a card displaying the count of projects based on their status.
 * The count is determined by filtering projects from the context to match
 * the current status or 'all' if no specific status is selected.
 *
 * The card includes a header with the project status in title case and
 * a content section displaying the number of projects in a bold, large font.
 *
 * @returns A JSX element representing the projects count card.
 */

const StatsProjectsCountCard = () => {
  const { filteredProjects } = useProjectsContext();
  const { state } = useProjectsContext();

  const projectsCount = filteredProjects.filter(
    (p) => p.status == state.status || state.status == "all"
  ).length;

  return (
    <>
      <Card>
        <CardHeader className="flex items-center">
          <CardTitle>
            {state.status == "all"
              ? "All"
              : state.status.charAt(0).toUpperCase() +
                state.status.slice(1)}{" "}
            Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center pb-6 text-4xl font-bold">
          {projectsCount}
        </CardContent>
      </Card>
    </>
  );
};

export default StatsProjectsCountCard;
