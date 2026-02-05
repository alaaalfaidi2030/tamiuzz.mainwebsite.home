import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { baseURL, getHeaders } from "../Utilies/data";

// Create the context
export const SolutionsContext = createContext();

// Custom hook to use the solutions context
export const useSolutions = () => {
  const context = useContext(SolutionsContext);
  if (!context) {
    throw new Error("useSolutions must be used within a SolutionsProvider");
  }
  return context;
};

function SolutionsProvider({ children }) {
  const [solutions, setSolutions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  // Fetch all solutions from API
  const fetchSolutions = useCallback(async (forceRefresh = false) => {
    // Skip if already fetched and not forcing refresh
    if (hasFetched && !forceRefresh) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`${baseURL}/solutions`, {
        headers: getHeaders(),
      });

      if (data.success && data.data) {
        setSolutions(data.data);
      } else {
        setSolutions([]);
      }
      setHasFetched(true);
    } catch (err) {
      console.error("Error fetching solutions:", err);
      setError(err.message || "Failed to fetch solutions");
      setSolutions([]);
    } finally {
      setIsLoading(false);
    }
  }, [hasFetched]);

  // Get a single solution by path/id
  const getSolutionByPath = useCallback((path) => {
    return solutions.find(
      (solution) => solution.urlPath === path || solution.id === path
    );
  }, [solutions]);

  // Refresh solutions data
  const refreshSolutions = useCallback(() => {
    return fetchSolutions(true);
  }, [fetchSolutions]);

  // Fetch on mount
  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  const value = {
    solutions,
    isLoading,
    error,
    hasFetched,
    fetchSolutions,
    getSolutionByPath,
    refreshSolutions,
  };

  return (
    <SolutionsContext.Provider value={value}>
      {children}
    </SolutionsContext.Provider>
  );
}

export default SolutionsProvider;
