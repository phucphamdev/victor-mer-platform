import { useEffect, useState } from "react";

/**
 * Custom hook for handling API query states
 * Provides consistent error handling and loading states
 */
type UseApiQueryResult<T> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: any;
  isEmpty: boolean;
};

export function useApiQuery<T>(
  queryResult: {
    data?: { result?: T[]; success?: boolean };
    isLoading: boolean;
    isError: boolean;
    error?: any;
  }
): UseApiQueryResult<T[]> {
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (
      !queryResult.isLoading &&
      !queryResult.isError &&
      queryResult.data?.result
    ) {
      setIsEmpty(queryResult.data.result.length === 0);
    }
  }, [queryResult]);

  return {
    data: queryResult.data?.result || null,
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error,
    isEmpty,
  };
}
