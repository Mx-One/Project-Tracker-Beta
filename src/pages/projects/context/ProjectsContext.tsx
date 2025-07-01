import {
  createContext,
  useReducer,
  ReactNode,
  useMemo,
  useEffect,
  useState,
} from "react";
import { useListProjects } from "../hooks/list";
import { calculateProjectTotals } from "../utils/projectsTableHelpers";
import { ProjectRecord, SaleRecord } from "../../../types/types";
import { Spinner } from "@/components/ui/spinner";
import { useListSales } from "../components/stats/hooks/listSales";

type ProjectsContextType = {
  state: ProjectsState;
  dispatch: React.Dispatch<Action>;
  filteredProjects: ProjectRecord[];
  tableFooterValues: ReturnType<typeof calculateProjectTotals>;
  projects: ProjectRecord[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectRecord[]>>;
  salesData: SaleRecord[];
  setSalesData: React.Dispatch<React.SetStateAction<SaleRecord[]>>;
};

type ProjectsState = {
  status: string;
  pm: string;
  search: string;
};

type Action =
  | { type: "SET_STATUS"; payload: string }
  | { type: "SET_PM"; payload: string }
  | { type: "SET_SEARCH"; payload: string };

const initialState: ProjectsState = {
  status: "active",
  pm: "all",
  search: "",
};

function reducer(state: ProjectsState, action: Action): ProjectsState {
  switch (action.type) {
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_PM":
      return { ...state, pm: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    default:
      return state;
  }
}

// Create context
export const ProjectsContext = createContext<ProjectsContextType | null>(null);

// Provider
export const ProjectsTableContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { projectListData, isLoading } = useListProjects();
  const { salesListData } = useListSales();

  // Local state to hold projects and sales data to update them internally instead using db. For Demo version of the app.
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [salesData, setSalesData] = useState<SaleRecord[]>([]);

  // Initialize and update local projects and sales data
  useEffect(() => {
    if (projectListData.length) {
      setProjects(projectListData);
    }
    if (salesListData.length) {
      setSalesData(salesListData);
    }
  }, [projectListData, salesListData]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesStatus =
        state.status === "all"
          ? project.status !== "archived"
          : project.status === state.status;

      const matchesPm =
        state.pm === "all" || project.userProfile.name === state.pm;

      const search = state.search.trim().toLowerCase();

      const matchesSearch =
        search === "" ||
        project.project_address.toLowerCase().includes(search) ||
        project.client.toLowerCase().includes(search);

      return matchesStatus && matchesPm && matchesSearch;
    });
  }, [projects, state]);

  const tableFooterValues = useMemo(
    () => calculateProjectTotals(filteredProjects),
    [filteredProjects]
  );

  return (
    <ProjectsContext.Provider
      value={{
        state,
        dispatch,
        filteredProjects,
        tableFooterValues,
        projects, // Expose projects to allow access to the internal project list
        setProjects, // Expose setProjects to allow updates
        salesData, // Expose salesData to allow access to the sales data
        setSalesData, // Expose setSalesData to allow updates
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          {" "}
          <Spinner />{" "}
        </div>
      ) : (
        children
      )}
    </ProjectsContext.Provider>
  );
};
