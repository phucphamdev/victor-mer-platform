import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { notifyError } from '@/utils/toast';

// Track shown errors to prevent duplicates
const shownErrors = new Set<string>();
let errorTimeout: NodeJS.Timeout | null = null;

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses `isRejectedWithValue` for errors
  if (isRejectedWithValue(action)) {
    const status = action.payload?.status;
    const data = action.payload?.data as { message?: string } | undefined;
    
    // Only show error toast for non-auth errors (auth errors are handled by apiSlice)
    if (status && status !== 401 && status !== 403) {
      const errorMessage = data?.message || 'An error occurred';
      const errorKey = `${status}-${errorMessage}`;
      
      // Prevent duplicate error messages
      if (!shownErrors.has(errorKey)) {
        shownErrors.add(errorKey);
        notifyError(errorMessage);
        
        // Clear the error from the set after 3 seconds
        if (errorTimeout) {
          clearTimeout(errorTimeout);
        }
        errorTimeout = setTimeout(() => {
          shownErrors.clear();
        }, 3000);
      }
    }
  }

  return next(action);
};
