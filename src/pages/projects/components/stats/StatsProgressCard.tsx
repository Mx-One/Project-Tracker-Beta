import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { calculateProjectTotals } from "../../utils/projectsTableHelpers";
import { useProjectsContext } from "../../context/useProjectsContext";

/**
 * Renders a card component displaying the progress of active projects
 * using a radial bar chart. The progress is calculated based on the
 * total progress of the filtered projects and is displayed as a
 * percentage. The chart is only rendered for projects with an "active"
 * status.
 *
 * The card includes a header with the title "Progress", a content
 * section with a radial bar chart, and a footer indicating that the
 * progress shown is for active projects.
 *
 * The radial bar chart updates dynamically based on the project's
 * progress and recalculates the end angle for the chart's arc whenever
 * the `totalProgress` changes.
 *
 * @returns A JSX element representing the progress card or null if the
 *          status is not "active".
 */

const StatsProgressCard = () => {
  const [chartData, setChartData] = useState([
    { browser: "chrome", progress: 0, fill: "var(--color-safari)" },
  ]);
  const [chartEndAngle, setChartEndAngle] = useState(0);

  const { filteredProjects, state } = useProjectsContext();
  const { totalProgress } = calculateProjectTotals(filteredProjects);

  const chartConfig = {
    progress: {
      label: "Progress",
    },
    safari: {
      label: "chrome",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    setChartData([
      {
        browser: "chrome",
        progress: totalProgress,
        fill: "var(--color-safari)",
      },
    ]);

    const endAngle = (totalProgress / 100) * 360;
    setChartEndAngle(endAngle);
  }, [totalProgress]);

  // Only show progress card for active projects
  if (state.status !== "active") return null;

  return (
    <>
      <Card>
        <CardHeader className="items-center pb-0">
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[200px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={90 + chartEndAngle}
              innerRadius={60}
              outerRadius={92}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[66, 55]}
              />
              <RadialBar dataKey="progress" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {chartData[0].progress.toLocaleString() + "%"}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          ></tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Showing progress of active projects
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default StatsProgressCard;
