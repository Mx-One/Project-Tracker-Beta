import React, { useState } from "react";
import { useProjectsContext } from "../../context/useProjectsContext";

const ProjectsSearch: React.FC = () => {
  const { dispatch } = useProjectsContext();
  const [search, setSearch] = useState("");

  /**
   * Handles the change event for the search input field.
   * Updates the local search state and dispatches an action
   * to update the search value in the global context.
   *
   * @param e - The change event from the input element.
   */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    dispatch({ type: "SET_SEARCH", payload: value });
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={handleChange}
      className="border px-3 py-1 rounded"
    />
  );
};

export default ProjectsSearch;
